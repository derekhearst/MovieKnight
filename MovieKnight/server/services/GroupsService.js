import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { logger } from "../utils/Logger.js"

class GroupsService {
	async getAll(query) {
		logger.log(query)
		const groups = await dbContext.Groups.find({ title: query.search, visibility: true, archived: false })

		return groups
	}
	async getGroupsByUserId(id) {
		return await dbContext.GroupMembers.find({ accountId: id }).populate("group")
	}

	async removeMember(groupId, groupMemberId, userId) {
		let groupMember = await dbContext.GroupMembers.findById(groupMemberId).populate("group")
		if (!groupMember) {
			throw new BadRequest("No Member Found")
		}
		let group = await dbContext.Groups.findById(groupId)
		if (!group) {
			throw new BadRequest("No Group Found")
		}

		if (groupMember.accountId != userId || group.creatorId != userId) {
			throw new Forbidden("You cannot remove this member.")
		}
		await dbContext.GroupMembers.findByIdAndDelete(groupMemberId)
		return "Successfully Removed"
	}
	async addMember(groupId, memberId) {
		let group = await dbContext.Groups.findById(groupId)
		if (!group) {
			throw new BadRequest("No Group Found")
		}
		let members = await dbContext.GroupMembers.find({ groupId: groupId })
		let member = members.find(m => m.accountId == memberId)
		if (member) {
			throw new BadRequest("Member already in group")
		}

		return await (await dbContext.GroupMembers.create({ groupId: groupId, accountId: memberId })).populate("account")
	}
	async getMembers(groupId) {
		let group = await dbContext.Groups.findById(groupId)
		if (!group) {
			throw new BadRequest("No Group Found")
		}
		return await dbContext.GroupMembers.find({ groupId: groupId }).populate("account")
	}
	async delete(groupId, userID) {
		let group = await dbContext.Groups.findById(groupId)
		if (!group) {
			throw new BadRequest("No Group Found")
		}
		if (group.creatorId != userID) {
			throw new Forbidden("You are not the creator of this group.")
		}

		let events = await dbContext.Events.find({ groupId: groupId })
		events.forEach(async e => {
			let eventComments = await dbContext.EventComments.find({ eventId: e._id })
			eventComments.forEach(async c => {
				await dbContext.EventComments.findByIdAndDelete(c._id)
			})

			let eventMovies = await dbContext.EventMovies.find({ eventId: e._id })
			eventMovies.forEach(async m => {
				await dbContext.EventMovies.findByIdAndDelete(m._id)
			})

			let eventMembers = await dbContext.EventMembers.find({ eventId: e._id })
			eventMembers.forEach(async m => {
				await dbContext.EventMembers.findByIdAndDelete(m._id)
			})
			await dbContext.Events.findByIdAndDelete(e._id)
		})

		let members = await dbContext.GroupMembers.find({ groupId: groupId })
		members.forEach(async m => {
			await dbContext.GroupMembers.findByIdAndDelete(m._id)
		})

		let comments = await dbContext.GroupComments.find({ groupId: groupId })
		comments.forEach(async c => {
			await dbContext.GroupComments.findByIdAndDelete(c._id)
		})

		let movies = await dbContext.GroupMovies.find({ groupId: groupId })
		movies.forEach(async m => {
			await dbContext.GroupMovies.findByIdAndDelete(m._id)
		})

		await dbContext.Groups.findByIdAndDelete(groupId)
		return "Successfully Deleted"
	}

	async edit(id, body) {
		const foundGroup = await dbContext.Groups.findById(id)
		if (!foundGroup) {
			throw new BadRequest("No Group Found")
		}
		if (foundGroup.creatorId != body.creatorId) {
			throw new Forbidden("You are not the creator of this group.")
		}
		body.creatorId = foundGroup.creatorId
		await foundGroup.update(body)
		return await dbContext.Groups.findById(id)
	}
	async create(body) {
		let group = await dbContext.Groups.create(body)
		await group.populate("creator")
		await this.addMember(group._id, group.creatorId)
		return group
	}
	async getById(id) {
		const group = await dbContext.Groups.findById(id)
		if (!group) {
			throw new BadRequest("No Group Found")
		}
		return group
	}
}
export const groupsService = new GroupsService()
