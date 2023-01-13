import { socketService } from "../services/SocketService.js";



export class GroupsHandler{

  static EnterGroup(groupId){
    socketService.emit('ENTER_GROUP', groupId)
  }
  static LeaveGroup(groupId){
    socketService.emit('LEAVE_GROUP', groupId)
  }
}