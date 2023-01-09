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
    logger.log(res.data)
  }
}

export const eventsService = new EventsService()