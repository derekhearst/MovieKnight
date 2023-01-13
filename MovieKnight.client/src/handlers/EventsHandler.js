import { socketService } from "../services/SocketService.js";



export class EventsHandler{

  static EnterEvent(eventId){
    setTimeout(()=>{
      socketService.emit('ENTER_EVENT', eventId)
    },500)
  }
  static LeaveEvent(eventId){
    socketService.emit('LEAVE_EVENT', eventId)
  }
}