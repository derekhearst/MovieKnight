import { AppState } from "../AppState.js"
// import { Group } from "../models/Group.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class GroupsService{
 async createGroup(body){
  const res = await api.post('api/groups', body)
  AppState.myGroups.push(res.data)
  return res.data
 }
 async getMyGroups(){
  const res = await api.get('account/groups')
 AppState.myGroups = res.data
 logger.log(AppState.myGroups)
 }
 async getGroupById(id){
  const res = await api.get('api/groups/' + id)
  logger.log('got by id',res.data)
 }
}

export const groupsService = new GroupsService()