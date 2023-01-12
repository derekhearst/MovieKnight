import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class AccountService {
	async getAccount() {
		try {
			const res = await api.get("/account")
			AppState.account = res.data
		} catch (err) {
			logger.error("HAVE YOU STARTED YOUR SERVER YET???", err)
		}
	}
	async getMyEvents() {
		const res = await api.get(`/account/events`)
		AppState.myEvents = res.data
		logger.log("[my events]", AppState.myEvents)
	}
	async getMyGroups() {
		const res = await api.get(`/account/groups`)
		AppState.myGroups = res.data
		logger.log("[my groups]", AppState.myGroups)
	}
	async addMovieToMyList(body){
		logger.log('adding this movie',body)
		const res = await api.post(`account/movies`, body)
		// AppState.myMovies.push(res.data)
	}
	async getMyMovies(){
		const res = await api.get('account/movies')
		AppState.myMovies = res.data
		logger.log('[myMovies]',AppState.myMovies)
	}
	async editAccount(body){
		const res = await api.put(`account`, body)
		AppState.account = res.data
		logger.log(res.data)
	}
}

export const accountService = new AccountService()
