import { AppState } from "../AppState.js"
import Pop from '../utils/Pop'
import { SocketHandler } from '../utils/SocketHandler'

class SocketService extends SocketHandler {
  constructor() {
    super()
    this
      .on('error', this.onError)
      .on('COMMENT_ADDED', this.addComment)
  }

  onError(e) {
    Pop.toast(e.message, 'error')
  }
  addComment(comment){
    AppState.activeEventComments.push(comment)
  }
}

export const socketService = new SocketService()
