import BaseController from "../utils/BaseController.js"
import { Auth0Provider } from "@bcwdev/auth0provider"
import { eventsService } from "../services/EventsService.js"
import { moviesService } from "../services/MoviesService.js"
import { commentsService } from "../services/CommentsService.js"
import { socketProvider } from "../SocketProvider.js"
export class EventsController extends BaseController {
	constructor() {
		super("api/events")
		this.router
			.use(Auth0Provider.getAuthorizedUserInfo) //
			.get("/:id", this.getEventById) //
			.get("/:id/items", this.getItems) //
			.get("/:id/members", this.getMembers) //
			.get("/:id/movies", this.getMovies) //
			.get("/:id/comments", this.getComments) //
			.post("/:id/items", this.addItem) //
			.post("/:id/movies", this.addMovie) //
			.post("/:id/members", this.addMember) //
			.post("/:id/comments", this.addComment) //
			.delete("/:id/items/:itemId", this.removeItem) //
			.delete("/:id/movies/:movieId", this.removeMovie) //
			.delete("/:id/members/:memberId", this.removeMember) //
			.delete("/:id/comments/:commentId", this.removeComment) //
	}

	async getEventById(req, res, next) {
		try {
			const event = await eventsService.getEventById(req.params.id, req.userInfo.id)
			res.send(event)
		} catch (error) {
			next(error)
		}
	}
	async getItems(req, res, next) {
		try {
			const items = await eventsService.getItems(req.params.id, req.userInfo.id)
			res.send(items)
		} catch (error) {
			next(error)
		}
	}
	async getMovies(req, res, next) {
		try {
			const movies = await moviesService.getEventMovies(req.params.id, req.userInfo.id)
			res.send(movies)
		} catch (error) {
			next(error)
		}
	}
	async getMembers(req, res, next) {
		try {
			const members = await eventsService.getMembers(req.params.id, req.userInfo.id)
			res.send(members)
		} catch (error) {
			next(error)
		}
	}
	async getComments(req, res, next) {
		try {
			const comments = await commentsService.getEventComments(req.params.id, req.userInfo.id)
			res.send(comments)
		} catch (error) {
			next(error)
		}
	}

	async addItem(req, res, next) {
		try {
			req.body.creatorId = req.userInfo.id
			const item = await eventsService.addItem(req.params.id, req.body)
			res.send(item)
		} catch (error) {
			next(error)
		}
	}
	async addMovie(req, res, next) {
		try {
			req.body.creatorId = req.userInfo.id
			const movie = await moviesService.addEventMovie(req.params.id, req.body)
			res.send(movie)
		} catch (error) {
			next(error)
		}
	}
	async addMember(req, res, next) {
		try {
			req.body.accountId = req.userInfo.id
			const member = await eventsService.addMember(req.params.id, req.body)
			res.send(member)
		} catch (error) {
			next(error)
		}
	}
	async addComment(req, res, next) {
		try {
			req.body.creatorId = req.userInfo.id
			const comment = await commentsService.addEventComment(req.params.id, req.body)
			socketProvider.messageRoom(req.params.id, 'COMMENT_ADDED', comment)
			res.send(comment)
		} catch (error) {
			next(error)
		}
	}

	async removeItem(req, res, next) {
		try {
			const item = await eventsService.removeItem(req.params.itemId, req.userInfo.id)
			res.send(item)
		} catch (error) {
			next(error)
		}
	}
	async removeMovie(req, res, next) {
		try {
			const movie = await moviesService.removeEventMovie(req.params.movieId, req.userInfo.id)
			res.send(movie)
		} catch (error) {
			next(error)
		}
	}
	async removeMember(req, res, next) {
		try {
			const member = await eventsService.removeMember(req.params.memberId, req.userInfo.id)
			res.send(member)
		} catch (error) {
			next(error)
		}
	}
	async removeComment(req, res, next) {
		try {
			const comment = await commentsService.removeEventComment(req.params.commentId, req.userInfo.id)
			res.send(comment)
		} catch (error) {
			next(error)
		}
	}
}
