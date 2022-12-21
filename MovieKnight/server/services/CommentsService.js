import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class CommentsService {
	async getCommentsByUserId(id) {
		let groupComments = await dbContext.GroupComments.find({ creatorId: id })
		let eventComments = await dbContext.EventComments.find({ creatorId: id })
		return { groupComments, eventComments }
	}

	async removeCommentByGroupId(groupId, commentId, userId) {
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
	async addCommentByGroupId(groupId, body) {
		let comment = await dbContext.GroupComments.create({ ...body, groupId: groupId })
		await comment.populate("account", "name picture")
		return comment
	}
	async getCommentsByGroupId(groupId) {
		return await dbContext.GroupComments.find({ groupId: groupId }).populate("account", "name picture")
	}
}
export const commentsService = new CommentsService()
