import { AppState } from "../AppState.js"
import Pop from '../utils/Pop'
import { SocketHandler } from '../utils/SocketHandler'

class SocketService extends SocketHandler {
  constructor() {
    super()
    this
      .on('error', this.onError)
      .on('GROUP_COMMENT_ADDED', this.addGroupComment)
      .on('COMMENT_ADDED', this.addEventComment)
  }

  onError(e) {
    Pop.toast(e.message, 'error')
  }
  addEventComment(comment){
    // let found = AppState.activeEventComments.find(c => c.id == comment.id)
    // if (!found) {
      AppState.activeEventComments.unshift(comment)
    }
  
  addGroupComment(comment){
    // let found = AppState.activeEventComments.find(c => c.id == comment.id)
    // if (!found) {
      AppState.activeGroupComments.unshift(comment)
    }
  }


export const socketService = new SocketService()
