import { AppState } from "../AppState.js"
// import { Group } from "../models/Group.js"
import { logger } from "../utils/Logger.js"
import Pop from "../utils/Pop.js"
import { api } from "./AxiosService.js"

class GroupsService {
	async createGroup(body) {
		const res = await api.post("api/groups", body)
		AppState.myGroups.push(res.data)
		return res.data
	}
	async getMyGroups() {
		const res = await api.get("account/groups")
		AppState.myGroups = res.data
		logger.log(AppState.myGroups)
	}
	async getGroupById(id) {
		const res = await api.get("api/groups/" + id)
		AppState.activeGroup = res.data
	}
	async addMovieToGroup(groupId, movieData) {
		delete movieData.id
		const res = await api.post(`api/groups/${groupId}/movies`, movieData)
		logger.log(res.data)
	}
	async getMoviesByGroupId(id) {
		const res = await api.get(`api/groups/${id}/movies`)
		AppState.activeGroupMovies = res.data
		logger.log("getting movies", res.data)
	}
	async postGroupComment(id, body) {
		const res = await api.post(`api/groups/${id}/comments`, body)
		AppState.activeGroupComments.unshift(res.data)
		AppState.activeGroupComments = AppState.activeGroupComments
		logger.log(AppState.activeComments)
	}
	async getCommentsByGroupId(id) {
		const res = await api.get(`api/groups/${id}/comments`)
		AppState.activeGroupComments = res.data.reverse()
		logger.log(res.data)
	}
	async addMyselfToGroup(id) {
		const res = await api.post(`api/groups/${id}/members`)
		AppState.activeGroupMembers.push(res.data)
		AppState.activeGroupMembers = AppState.activeGroupMembers
		logger.log(res.data)
	}
	async removeMyselfFromGroup(id) {
		let me = AppState.activeGroupMembers.find(m => m.accountId == AppState.account.id)
		logger.log(me.id)
		const res = await api.delete(`api/groups/${id}/members/${me.id}`)
		AppState.activeGroupMembers = AppState.activeGroupMembers.filter(m => m.id != me.id)

		logger.log(res.data)
	}

	async getGroupByGroupId(id) {
		const res = await api.get(`api/groups/${id}`)
		AppState.activeGroup = res.data
		logger.log("getting group with groupId", res.data)
	}

	async getGroupMembersByGroupId(id) {
		const res = await api.get(`api/groups/${id}/members`)
		AppState.activeGroupMembers = res.data
		logger.log("getting group members", res.data)
	}

	async searchGroups(search) {
		const res = await api.get("api/groups", { params: search })
		AppState.movies = []
		AppState.groups = res.data
		AppState.groups.filter(g => g.title == search)
		logger.log("search groups", AppState.groups)
	}
}

export const groupsService = new GroupsService()
