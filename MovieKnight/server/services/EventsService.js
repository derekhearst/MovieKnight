import { dbContext } from "../db/DbContext.js"
import { BadRequest, UnAuthorized } from "../utils/Errors.js"

class EventsService {
	
	async getEventById(eventId, userId) {
		let event = await dbContext.Events.findById(eventId)
		if (!event) {
			throw new BadRequest("No event found")
		}
		let groupMembers = await dbContext.GroupMembers.find({ groupId: event.groupId })
		if (!groupMembers.find(m => m.accountId == userId)) {
			throw new BadRequest("You are not a member of this group")
		}
		return event
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
		// if (group.creatorId != userId || event.creatorId != userId || member.accountId != userId) {
		// 	throw new UnAuthorized("You are not the creator of this group.")
		// }
		// @ts-ignore
		event.capacity += 1
		await event.save()
		await member.delete()
		return "Successfully Removed"
	}
	async addMember(eventId, body) {
		let event = await dbContext.Events.findById(eventId)
		if (!event) {
			throw new BadRequest("No event found")
		}
		let group = await dbContext.GroupMembers.find({ groupId: event.groupId })
		if (!group.find(m => m.accountId == body.accountId)) {
			throw new BadRequest("You are not a member of this group")
		}
		let eventMembers = await dbContext.EventMembers.find({ eventId: eventId })
		if (eventMembers.find(m => m.accountId == body.accountId)) {
			throw new BadRequest("This member is already in this event")
		}

		// @ts-ignore
		event.capacity -= 1
		await event.save()

		let newMember = await dbContext.EventMembers.create({ ...body, eventId: eventId })
		return await newMember.populate("account", "name picture")
	}

	async getMembers(eventId, userId) {
		let event = await dbContext.Events.findById(eventId)
		if (!event) {
			throw new BadRequest("No event found")
		}
		let groupMembers = await dbContext.GroupMembers.find({ groupId: event.groupId })
		if (!groupMembers.find(m => m.accountId == userId)) {
			throw new BadRequest(`You are not a member of this group id ${event.groupId}`)
		}
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
		let event = await dbContext.Events.findById(eventId)
		if (!event) {
			throw new BadRequest("No event found")
		}
		if (event.canceled) {
			throw new BadRequest("This event has been canceled")
		}
		let eventMembers = await dbContext.EventMembers.find({ eventId: eventId })
		if (!eventMembers.find(m => m.accountId == body.creatorId)) {
			throw new BadRequest("You are not a member of this event")
		}

		let groupMembers = await dbContext.GroupMembers.find({ groupId: event.groupId })
		if (!groupMembers.find(m => m.accountId == body.creatorId)) {
			throw new BadRequest("You are not a member of this group")
		}

		let item = await dbContext.EventItems.create({ ...body, eventId: eventId })
		return await item.populate("creator", "name picture")
	}
	async getItems(eventId, userId) {
		let event = await dbContext.Events.findById(eventId)
		if (!event) {
			throw new BadRequest("No event found")
		}
		let groupMembers = await dbContext.GroupMembers.find({ groupId: event.groupId })
		if (!groupMembers.find(m => m.accountId == userId)) {
			throw new BadRequest("You are not a member of this group")
		}
		return await dbContext.EventItems.find({ eventId: eventId }).populate("creator", "name picture")
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
		return await dbContext.Events.findByIdAndUpdate(eventId, { canceled: true }, { new: true })
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
		return await dbContext.Events.findByIdAndUpdate(eventId, body, { new: true })
	}
	async addEventByGroupId(groupId, body) {
		let groupMembers = await dbContext.GroupMembers.find({ accountId: body.creatorId, groupId: groupId })
		if (!groupMembers.find(m => m.accountId == body.creatorId)) {
			throw new UnAuthorized("You are not a member of this group")
		}

		body.canceled = false
		let event = await dbContext.Events.create(body)
		await dbContext.EventMembers.create({ accountId: body.creatorId, eventId: event._id })

		return event
	}
	async getEventsByGroupId(groupId, canceled) {
		if (canceled) {
			return await dbContext.Events.find({ groupId: groupId, canceled: canceled })
		}
		return await dbContext.Events.find({ groupId: groupId })
	}
	async getEventsByUserId(id) {
		return await dbContext.EventMembers.find({ accountId: id }).populate("event")
	}

	async getById(id) {
		return await dbContext.Events.findById(id)
	}
}
export const eventsService = new EventsService()
