import { SocketHandler } from "../utils/SocketHandler.js";



export class GroupsHandler extends SocketHandler{

    /**
   * @param {import("socket.io").Server} io
   * @param {import("socket.io").Socket} socket
   */
    constructor(io, socket) {
      super(io, socket, true)
      this
        .on('ENTER_GROUP', this.enterGroup)
        .on('LEAVE_GROUPS', this.leaveGroup)
        .on('SEND_MESSAGE', this.sendMessage)
    }
  sendMessage(payload) {
    this.io.emit('SENDING_MESSAGE', payload)
  }
  leaveGroup(groupId) {
    this.socket.leave(groupId)
  }
  
    enterGroup(groupId){
      this.socket.join(groupId)
    }
  }
