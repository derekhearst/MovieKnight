import { dbContext } from "../db/DbContext.js"
import { BadRequest, UnAuthorized } from "../utils/Errors.js"

class EventsService {
	async removeComment(commentId, userId) {
		let comment = await dbContext.EventComments.findById(commentId)
		if (!comment) {
			throw new BadRequest("No comment found")
		}
		let event = await dbContext.Events.findById(comment.eventId)
		if (!event) {
			throw new BadRequest("No event found")
		}
		let group = await dbContext.Groups.findById(event.groupId)
		if (!group) {
			throw new BadRequest("No group found")
		}
		if (comment.creatorId != userId || group.creatorId != userId || event.creatorId != userId) {
			throw new UnAuthorized("You cannot remove this comment")
		}
		await comment.delete()
		return "Successfully Removed"
	}

	async addComment(eventId, body) {
		let event = await dbContext.Events.findById(eventId)
		if (!event) {
			throw new BadRequest("No event found")
		}
		let eventMembers = await dbContext.EventMembers.find({ eventId: eventId })
		if (!eventMembers.find(m => m.accountId == body.creatorId)) {
			throw new BadRequest("You are not a member of this event")
		}
		let group = await dbContext.GroupMembers.find({ groupId: event.groupId })
		if (!group.find(m => m.accountId == body.creatorId)) {
			throw new BadRequest("You are not a member of this group")
		}
		return await dbContext.EventComments.create(...body, eventId)
	}
	async getComments(eventId) {
		return await dbContext.EventComments.find({ eventId: eventId }).populate("account", "name picture")
	}
	async removeMember(memberId, userId) {
		let member = await dbContext.EventMembers.findById(memberId)
		if (!member) {
			throw new BadRequest("No member found")
		}
		let event = await dbContext.Events.findById(member.eventId)
		if (!event) {
			throw new BadRequest("No event found")
		}
		let group = await dbContext.Groups.findById(event.groupId)
		if (!group) {
			throw new BadRequest("No group found")
		}
		if (group.creatorId != userId || event.creatorId != userId || member.accountId != userId) {
			throw new UnAuthorized("You are not the creator of this group.")
		}
		await member.delete()
		return "Successfully Removed"
	}
	async addMember(eventId, body) {
		let event = await dbContext.Events.findById(eventId)
		if (!event) {
			throw new BadRequest("No event found")
		}
		let group = await dbContext.GroupMembers.find({ groupId: event.groupId })
		if (!group.find(m => m.accountId == body.creatorId)) {
			throw new BadRequest("You are not a member of this group")
		}
		return await dbContext.EventMembers.create({ ...body, eventId: eventId })
	}

	async getMembers(eventId) {
		return await dbContext.EventMembers.find({ eventId: eventId }).populate("account", "name picture")
	}

	async removeItem(itemId, userId) {
		let item = await dbContext.EventItems.findById(itemId)
		if (!item) {
			throw new BadRequest("No item found")
		}
		let event = await dbContext.Events.findById(item.eventId)
		if (!event) {
			throw new BadRequest("Event doesn't exist anymore")
		}

		if (event.canceled) {
			throw new BadRequest("This event has been canceled")
		}

		let group = await dbContext.Groups.findById(event.groupId)
		if (!group) {
			throw new BadRequest("Group doesn't exist anymore")
		}

		if (group.creatorId != userId || event.creatorId != userId || item.creatorId != userId) {
			throw new UnAuthorized("You do not have permissions to remove this item.")
		}

		await dbContext.EventItems.findByIdAndDelete(itemId)
		return "Successfully Removed"
	}
	async addItem(eventId, body) {
		return await dbContext.EventItems.create({ ...body, eventId: eventId })
	}
	async getItems(eventId) {
		return await dbContext.EventItems.find({ eventId: eventId })
	}

	async cancelEventById(groupId, eventId, userId) {
		let event = await dbContext.Events.findById(eventId)
		if (!event) {
			throw new BadRequest("No event found")
		}
		if (event.canceled) {
			throw new BadRequest("This event has already been canceled")
		}
		let group = await dbContext.Groups.findById(event.groupId)
		if (!group) {
			throw new BadRequest("Group doesn't exist anymore")
		}

		if (event.creatorId != userId || group.creatorId != userId) {
			throw new UnAuthorized("You are not the creator of this event.")
		}
		return await dbContext.Events.findByIdAndUpdate(eventId, { canceled: true })
	}
	async editEventById(groupId, eventId, body) {
		let event = await dbContext.Events.findById(eventId).populate("group", "creatorId")
		if (!event) {
			throw new BadRequest("No event found")
		}
		if (event.canceled) {
			throw new BadRequest("You can't edit a canceled event")
		}
		let group = await dbContext.Groups.findById(event.groupId)
		if (!group) {
			throw new BadRequest("Group doesn't exist anymore")
		}

		if (event.creatorId != body.creatorId || group.creatorId != body.creatorId) {
			throw new UnAuthorized("You are not the creator of this event.")
		}
		body.canceled = false
		return await dbContext.Events.findByIdAndUpdate(eventId, body)
	}
	async addEventByGroupId(groupId, body) {
		let groupMembers = await dbContext.GroupMembers.find({ accountId: body.creatorId, groupId: groupId })
		if (!groupMembers.find(m => m.accountId == body.creatorId)) {
			throw new UnAuthorized("You are not a member of this group")
		}
		body.canceled = false
		let event = await dbContext.Events.create(body)
		return event
	}
	async getEventsByGroupId(groupId) {
		return await dbContext.Events.find({ groupId: groupId })
	}
	async getEventsByUserId(id) {
		return await dbContext.EventMembers.find({ accountId: id })
	}

	async getById(id) {
		return await dbContext.Events.findById(id)
	}
}
export const eventsService = new EventsService()
