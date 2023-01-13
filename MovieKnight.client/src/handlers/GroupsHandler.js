import { socketService } from "../services/SocketService.js";



export class GroupsHandler{

  static EnterGroup(groupId){
   setTimeout(()=>{
    socketService.emit('ENTER_GROUP', groupId)
   },500) 
  }
  static LeaveGroup(groupId){
    socketService.emit('LEAVE_GROUP', groupId)
  }
}