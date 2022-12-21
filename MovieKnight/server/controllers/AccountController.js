import { Auth0Provider } from "@bcwdev/auth0provider"
import { accountService } from "../services/AccountService"
import BaseController from "../utils/BaseController"
import { eventsService } from "../services/EventsService"
import { groupsService } from "../services/GroupsService"
import { commentsService } from "../services/CommentsService"

export class AccountController extends BaseController {
	constructor() {
		super("account")
		this.router
			.use(Auth0Provider.getAuthorizedUserInfo) //
			.get("", this.getUserAccount) //
			.get("/events", this.getMyEvents)
			.get("/groups", this.getMyGroups)
			.get("/comments", this.getMyComments)
			.get("/movies", this.getMyMovies)
			.post("/movies", this.addMovie)
			.delete("/movies/:movieId", this.removeMovie)
	}

	async getUserAccount(req, res, next) {
		try {
			const account = await accountService.getAccount(req.userInfo)
			res.send(account)
		} catch (error) {
			next(error)
		}
	}

	// async getMyEvents(req, res, next) {
	// 	try {
	// 		eventsService.getEventsByUserId(req.userInfo.id)
	// 	} catch (error) {
	// 		next(error)
	// 	}
	// }

	async getMyGroups(req, res, next) {
		try {
			let groups = await groupsService.getGroupsByUserId(req.userInfo.id)
			res.send(groups)
		} catch (error) {
			next(error)
		}
	}

	async getMyComments(req, res, next) {
		try {
			let comment = await commentsService.getCommentsByUserId(req.userInfo.id)
			res.send(comment)
		} catch (error) {
			next(error)
		}
	}

	async getMyEvents(req, res, next) {
		try {
			const events = await eventsService.getEventsByUserId(req.userInfo.id)
			res.send(events)
		} catch (error) {
			next(error)
		}
	}
	async getMyMovies(req, res, next) {
		try {
			const movies = await accountService.getMoviesByUserId(req.userInfo.id)
			res.send(movies)
		} catch (error) {
			next(error)
		}
	}
	async addMovie(req, res, next) {
		try {
			req.body.creatorId = req.userInfo.id
			const movie = await accountService.addMovie(req.body)
			res.send(movie)
		} catch (error) {
			next(error)
		}
	}
	async removeMovie(req, res, next) {
		try {
			const movie = await accountService.removeMovie(req.params.movieId, req.userInfo.id)
			res.send(movie)
		} catch (error) {
			next(error)
		}
	}
}
