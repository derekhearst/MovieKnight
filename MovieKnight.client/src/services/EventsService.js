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
}

export const eventsService = new EventsService()