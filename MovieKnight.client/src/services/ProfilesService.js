import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class ProfilesService{
  async getProfile(id){
    const res = await api.get(`api/profiles/${id}`)
    AppState.activeProfile = res.data
    logger.log('Active Profile', AppState.activeProfile)
  }
  async getProfileMovies(id){
    const res = await api.get(`api/profiles/${id}/movies`)
    AppState.profileMovies = res.data
    logger.log('getting profile movies',AppState.profileMovies)
  }
}

export const profilesService = new ProfilesService()