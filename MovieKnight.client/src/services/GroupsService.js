import { AppState } from "../AppState.js"
// import { Group } from "../models/Group.js"
import { logger } from "../utils/Logger.js"
import Pop from "../utils/Pop.js"
import { api } from "./AxiosService.js"
import { eventsService } from "../services/EventsService.js"

class GroupsService {
	async createGroup(body) {
		const res = await api.post("api/groups", body)
		this.getMyGroups()
	}
	async getMyGroups() {
		const res = await api.get("account/groups")
		let allGroups = res.data
		AppState.myGroups = allGroups.filter(g => g.group.archived == true)

		logger.log("Getting my groups", AppState.myGroups)
	}
	async getGroupById(id) {
		const res = await api.get("api/groups/" + id)
		AppState.activeGroup = res.data
		logger.log("Getting group", res.data)
	}
	async addMovieToGroup(groupId, movieData) {
		delete movieData.id
		const res = await api.post(`api/groups/${groupId}/movies`, movieData)
		AppState.activeGroupMovies.push(res.data)
		AppState.activeGroupMovies = AppState.activeGroupMovies
		logger.log("Adding movie to group")
	}
	async getMoviesByGroupId(id) {
		const res = await api.get(`api/groups/${id}/movies`)
		AppState.activeGroupMovies = res.data
		logger.log("Getting group movies", res.data)
	}
	async postGroupComment(id, body) {
		const res = await api.post(`api/groups/${id}/comments`, body)
		// AppState.activeGroupComments.unshift(res.data)
		AppState.activeGroupComments = AppState.activeGroupComments
		logger.log("Posting group comment")
	}
	async getCommentsByGroupId(id) {
		const res = await api.get(`api/groups/${id}/comments`)
		AppState.activeGroupComments = res.data.reverse()
		logger.log("Getting group comments", res.data)
	}
	async addMyselfToGroup(id) {
		const res = await api.post(`api/groups/${id}/members`)
		AppState.activeGroupMembers.push(res.data)
		AppState.activeGroupMembers = AppState.activeGroupMembers
		logger.log("Adding myself to group")
	}
	async removeMyselfFromGroup(id) {
		let me = AppState.activeGroupMembers.find(m => m.accountId == AppState.account.id)
		const res = await api.delete(`api/groups/${id}/members/${me.id}`)
		AppState.activeGroupMembers = AppState.activeGroupMembers.filter(m => m.id != me.id)
		logger.log("Removing myself from group")
	}

	async getGroupByGroupId(id) {
		const res = await api.get(`api/groups/${id}`)
		AppState.activeGroup = res.data
		logger.log("Getting group", res.data)
	}

	async getGroupMembersByGroupId(id) {
		const res = await api.get(`api/groups/${id}/members`)
		AppState.activeGroupMembers = res.data
		logger.log("Getting group members", res.data)
	}

	async searchGroups(search) {
		const res = await api.get("api/groups", { params: search })
		AppState.searchGroups = res.data
		logger.log("Getting groups", res.data)
	}
	async archiveGroup(id) {
		const res = await api.delete(`api/groups/${id}`)
		AppState.myGroups = AppState.myGroups.filter(g => g.id != id)
		AppState.myEvents = AppState.myEvents.filter(e => e.groupId != id)
	}
}

export const groupsService = new GroupsService()
