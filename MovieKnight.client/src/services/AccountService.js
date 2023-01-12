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
		logger.log("Getting my events", AppState.myEvents)
	}
	async getMyGroups() {
		const res = await api.get(`/account/groups`)
		AppState.myGroups = res.data
		logger.log("Getting my groups", AppState.myGroups)
	}
	async addMovieToMyList(body) {
		const res = await api.post(`account/movies`, body)
		logger.log("Favouring this movie", body)
	}
	async getMyMovies() {
		const res = await api.get("account/movies")
		AppState.myMovies = res.data
		logger.log("Getting my movies", AppState.myMovies)
	}
	async editAccount(body) {
		const res = await api.put(`account`, body)
		AppState.account = res.data
		logger.log("Editing account", body)
	}
}

export const accountService = new AccountService()
