import { SocketHandler } from "../utils/SocketHandler.js";



export class EventsHandler extends SocketHandler{

    /**
   * @param {import("socket.io").Server} io
   * @param {import("socket.io").Socket} socket
   */
    constructor(io, socket) {
      super(io, socket, true)
      this
        .on('ENTER_EVENT', this.enterEvent)
        .on('LEAVE_EVENT', this.leaveEvent)
        .on('SEND_MESSAGE', this.sendMessage)
    }
  sendMessage(payload) {
    this.io.emit('SENDING_MESSAGE', payload)
  }
  leaveEvent(eventId) {
    this.socket.leave(eventId)
  }
  
    enterEvent(eventId){
      this.socket.join(eventId)
    }
  }
