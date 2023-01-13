import { socketService } from "../services/SocketService.js";



export class EventsHandler{

  static EnterEvent(eventId){
    socketService.emit('ENTER_EVENT', eventId)
  }
  static LeaveEvent(eventId){
    socketService.emit('LEAVE_EVENT', eventId)
  }
}