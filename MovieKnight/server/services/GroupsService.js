import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { logger } from "../utils/Logger.js"
import { eventsService } from "./EventsService.js"

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

		if (groupMember.accountId != userId) {
			throw new Forbidden(`You are not allowed to remove this member ${userId}, ${groupMember.accountId}, ${group.creatorId}`)
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
		let events = await dbContext.Events.find({groupId: group.id})
		for(let event of events){
		 await	event.delete()
		}
		await dbContext.Groups.findByIdAndUpdate(groupId, { archived: true })
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
		delete body.creatorId
		delete body._id
		delete body.archived

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
