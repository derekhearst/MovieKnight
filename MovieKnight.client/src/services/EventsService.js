import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"



class EventsService{
  async makeEvent(eventData){
    const res = await api.post(`api/groups/${eventData.groupId}/events`, eventData)
    AppState.activeGroupEvents.push(res.data)
    logger.log(res.data)
  }
  async getEventsByGroupId(id){
    const res = await api.get(`api/groups/${id}/events`)
    AppState.activeGroupEvents = res.data
    logger.log(res.data)
  }
  async getEventById(id){
    const res = await api.get(`api/events/${id}`)
    AppState.activeEvent = res.data
    logger.log('event set to activeEvent',AppState.activeEvent)
  }
  setEventActive(id){
    AppState.activeEventId = id
    logger.log(id)
  }
  async addMovieToEvent(eventId, movieData){
    const res = await api.post(`api/events/${eventId}/movies`, movieData)
    logger.log(res.data)
  }
 async getMoviesByEventId(id){
  const res = await api.get(`api/events/${id}/movies`)
  AppState.activeEventMovie = res.data
  logger.log('movie for this event',AppState.activeEventMovie)
 }
 async addMyselfToEvent(id){
  const res = await api.post(`api/events/${id}/members`)
  AppState.activeEventMembers.push(res.data)
  AppState.activeEventMembers = AppState.activeEventMembers
  AppState.activeEvent.capacity -=1

  logger.log(res.data)
 }
 async removeMyselfFromEvent(id, accountId){
  const me = AppState.activeEventMembers.find(m => m.accountId == accountId)
  const res = await api.delete(`api/events/${id}/members/${me.id}`)
  AppState.activeEventMembers.filter(m=> m.accountId !== accountId)
  AppState.activeEventMembers = AppState.activeEventMembers
  logger.log(res.data)
 }
 async getMembersByEventId(id){
  const res = await api.get(`api/events/${id}/members`)
  AppState.activeEventMembers = res.data
  logger.log('getting members by eventId', res.data)
 }
 async postCommentToEvent(id, commentData){
  const res = await api.post(`api/events/${id}/comments`, commentData)
  AppState.activeComments.push(res.data)
 }
 async getCommentsByEventId(id){
  const res = await api.get(`api/events/${id}/comments`)
  AppState.activeComments = res.data
 }
}

export const eventsService = new EventsService()