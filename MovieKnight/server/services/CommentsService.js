import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden, UnAuthorized } from "../utils/Errors.js"

class CommentsService {
	async getCommentsByUserId(id) {
		let groupComments = await dbContext.GroupComments.find({ creatorId: id })
		let eventComments = await dbContext.EventComments.find({ creatorId: id })
		return { groupComments, eventComments }
	}

	async removeGroupComment(groupId, commentId, userId) {
		let comment = await dbContext.GroupComments.findOne({ _id: commentId })
		if (!comment) {
			throw new BadRequest("That comment doesn't exist")
		}
		let group = await dbContext.Groups.findById(groupId)
		if (!group) {
			throw new BadRequest("This group doesn't exist")
		}

		if (comment.creatorId != userId || group.creatorId != userId) {
			throw new Forbidden("You cannot remove this comment.")
		}
		await dbContext.GroupComments.findByIdAndDelete(commentId)
		return "Successfully Removed"
	}
	async addGroupComment(groupId, body) {
		let comment = await dbContext.GroupComments.create({ ...body, groupId: groupId })
		await comment.populate("creator", "name picture")
		return comment
	}
	async getGroupComments(groupId) {
		return await dbContext.GroupComments.find({ groupId: groupId }).populate("creator", "name picture")
	}

	async removeEventComment(commentId, userId) {
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

	async addEventComment(eventId, body) {
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
		let newComment = await dbContext.EventComments.create({ ...body, eventId })
		return await newComment.populate("creator", "name picture")
	}
	async getEventComments(eventId, userId) {
		let event = await dbContext.Events.findById(eventId)
		if (!event) {
			throw new BadRequest("No event found")
		}
		let groupMembers = await dbContext.GroupMembers.find({ groupId: event.groupId })
		if (!groupMembers.find(m => m.accountId == userId)) {
			throw new BadRequest("You are not a member of this group")
		}
		return await dbContext.EventComments.find({ eventId: eventId }).populate("creator", "name picture")
	}
}
export const commentsService = new CommentsService()
