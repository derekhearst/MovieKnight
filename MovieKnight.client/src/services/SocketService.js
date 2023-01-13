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
    // let found = AppState.activeEventComments.find(c => c.id == comment.id)
    // if (!found) {
      AppState.activeEventComments.unshift(comment)
    }
  }


export const socketService = new SocketService()
