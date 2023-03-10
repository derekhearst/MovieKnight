import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"
import { accountService } from "./AccountService"


class EventsService {
	async makeEvent(eventData) {
		const res = await api.post(`api/groups/${eventData.groupId}/events`, eventData)
		AppState.activeGroupEvents.push(res.data)
		logger.log(res.data)
	}
	async getEventsByGroupId(id) {
		const res = await api.get(`api/groups/${id}/events`)
		AppState.activeGroupEvents = res.data
		logger.log(res.data)
	}
	async getEventById(id) {
		const res = await api.get(`api/events/${id}`)
		AppState.activeEvent = res.data
		logger.log("event set to activeEvent", AppState.activeEvent)
	}
	setEventActive(id) {
		AppState.activeEventId = id
		logger.log(id)
	}
	async addMovieToEvent(eventId, movieData) {
		const res = await api.post(`api/events/${eventId}/movies`, movieData)
		AppState.activeEventMovies.push(res.data)
		AppState.activeEventMovies = AppState.activeEventMovies
	}
	async getMoviesByEventId(id) {
		const res = await api.get(`api/events/${id}/movies`)
		AppState.activeEventMovies = res.data
	}
	async getItemsByEventId(id) {
		const res = await api.get(`api/events/${id}/items`)
		AppState.activeEventItems = res.data
	}

	async addMemberToEvent(id, accountId) {
		const res = await api.post(`api/events/${id}/members`)
		AppState.activeEventMembers.push(res.data)
		AppState.activeEventMembers = AppState.activeEventMembers
		AppState.activeEvent.capacity--
		accountService.getMyEvents()
	}
	async removeMemberFromEvent(id, accountId) {
		const me = AppState.activeEventMembers.find(m => m.accountId == accountId)
		const res = await api.delete(`api/events/${id}/members/${me._id}`)
		AppState.activeEventMembers.filter(m => m.accountId != accountId)
		AppState.activeEventMembers = AppState.activeEventMembers
		AppState.activeEvent.capacity++
		accountService.getMyEvents()
	}

	async getMembersByEventId(id) {
		const res = await api.get(`api/events/${id}/members`)
		AppState.activeEventMembers = res.data
	}
	async postCommentToEvent(id, commentData) {
		const res = await api.post(`api/events/${id}/comments`, commentData)
		// AppState.activeEventComments.unshift(res.data)
		AppState.activeEventComments = AppState.activeEventComments
	}
	async getCommentsByEventId(id) {
		const res = await api.get(`api/events/${id}/comments`)
		AppState.activeEventComments = res.data.reverse()
	}

	async addItemToEvent(eventId, itemData) {
		const item = { item: itemData }
		const res = await api.post(`api/events/${eventId}/items`, item)
		AppState.activeEventItems.push(res.data)
		AppState.activeEventItems = AppState.activeEventItems
	}

	async removeItemFromEvent(eventId, itemId) {
		const res = await api.delete(`api/events/${eventId}/items/${itemId}`)
		AppState.activeEventItems = AppState.activeEventItems.filter(i => i._id != itemId)
		AppState.activeEventItems = AppState.activeEventItems
	}

	async removeMovieFromEvent(eventId, movieId) {
		const res = await api.delete(`api/events/${eventId}/movies/${movieId}`)
		AppState.activeEventMovies = AppState.activeEventMovies.filter(m => m._id != movieId)
		AppState.activeEventMovies = AppState.activeEventMovies
	}
}

export const eventsService = new EventsService()
