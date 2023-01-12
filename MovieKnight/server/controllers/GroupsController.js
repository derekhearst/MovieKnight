import { groupsService } from "../services/GroupsService.js"
import BaseController from "../utils/BaseController.js"
import { Auth0Provider } from "@bcwdev/auth0provider"
import { moviesService } from "../services/MoviesService.js"
import { commentsService } from "../services/CommentsService.js"
import { eventsService } from "../services/EventsService.js"
import { query } from "express"
export class GroupsController extends BaseController {
	constructor() {
		super("api/groups")
		this.router //
			.get("", this.getAll)
			.get("/:id", this.getById) //
			.get("/:id/members", this.getMembers) //
			.get("/:id/movies", this.getMovies) //
			.get("/:id/comments", this.getComments) //
			.get("/:id/events", this.getEvents) //")
			.get("/:id/membermovies", this.getMemberMovies) //
			.use(Auth0Provider.getAuthorizedUserInfo) //

			.post("", this.createGroup) //
			.put("/:id", this.editGroup) //
			.delete("/:id", this.deleteGroup) //

			.post("/:id/members", this.addMember) //
			.delete("/:id/members/:groupMemberId", this.removeMember) //

			.post("/:id/movies", this.addMovie) //
			.delete("/:id/movies/:movieId", this.removeMovie) //

			.post("/:id/comments", this.addComment) //
			.delete("/:id/comments/:commentId", this.removeComment) //

			.post("/:id/events", this.addEvent) //
			.put("/:id/events/:eventId", this.editEvent) //
			.delete("/:id/events/:eventId", this.removeEvent) //
	}
	async getAll(req, res, next) {
		try {
			const query = req.query
			const groups = await groupsService.getAll(query)
			return res.send(groups)
		} catch (error) {
			next(error)
		}
	}

	async getById(req, res, next) {
		try {
			const group = await groupsService.getById(req.params.id)
			res.send(group)
		} catch (error) {
			next(error)
		}
	}
	async createGroup(req, res, next) {
		try {
			req.body.creatorId = req.userInfo.id
			const group = await groupsService.create(req.body)
			res.send(group)
		} catch (error) {
			next(error)
		}
	}
	async editGroup(req, res, next) {
		try {
			req.body.creatorId = req.userInfo.id
			const group = await groupsService.edit(req.params.id, req.body)
			res.send(group)
		} catch (error) {
			next(error)
		}
	}
	async deleteGroup(req, res, next) {
		try {
			const group = await groupsService.delete(req.params.id, req.userInfo.id)
			res.send(group)
		} catch (error) {
			next(error)
		}
	}
	async getMembers(req, res, next) {
		try {
			const members = await groupsService.getMembers(req.params.id)
			res.send(members)
		} catch (error) {
			next(error)
		}
	}
	async addMember(req, res, next) {
		try {
			const member = await groupsService.addMember(req.params.id, req.userInfo.id)
			res.send(member)
		} catch (error) {
			next(error)
		}
	}
	async removeMember(req, res, next) {
		try {
			const member = await groupsService.removeMember(req.params.id, req.params.groupMemberId, req.userInfo.id)
			res.send(member)
		} catch (error) {
			next(error)
		}
	}
	async getMovies(req, res, next) {
		try {
			const movies = await moviesService.getGroupMovies(req.params.id)
			res.send(movies)
		} catch (error) {
			next(error)
		}
	}
	async addMovie(req, res, next) {
		try {
			const movie = await moviesService.addGroupMovie(req.params.id, req.body, req.userInfo.id)
			res.send(movie)
		} catch (error) {
			next(error)
		}
	}
	async removeMovie(req, res, next) {
		try {
			const movie = await moviesService.removeGroupMovie(req.params.id, req.params.movieId, req.userInfo.id)
			res.send(movie)
		} catch (error) {
			next(error)
		}
	}
	async getComments(req, res, next) {
		try {
			const comments = await commentsService.getGroupComments(req.params.id)
			res.send(comments)
		} catch (error) {
			next(error)
		}
	}
	async addComment(req, res, next) {
		try {
			req.body.creatorId = req.userInfo.id
			const comment = await commentsService.addGroupComment(req.params.id, req.body)
			res.send(comment)
		} catch (error) {
			next(error)
		}
	}
	async removeComment(req, res, next) {
		try {
			const comment = await commentsService.removeGroupComment(req.params.id, req.params.commentId, req.userInfo.id)
			res.send(comment)
		} catch (error) {
			next(error)
		}
	}

	async getEvents(req, res, next) {
		try {
			const events = await eventsService.getEventsByGroupId(req.params.id, req.query.canceled)
			res.send(events)
		} catch (error) {
			next(error)
		}
	}

	async addEvent(req, res, next) {
		try {
			req.body.creatorId = req.userInfo.id
			req.body.groupId = req.params.id
			const event = await eventsService.addEventByGroupId(req.params.id, req.body)
			res.send(event)
		} catch (error) {
			next(error)
		}
	}

	async editEvent(req, res, next) {
		try {
			req.body.creatorId = req.userInfo.id
			req.body.groupId = req.params.id
			const event = await eventsService.editEventById(req.params.id, req.params.eventId, req.body)
			res.send(event)
		} catch (error) {
			next(error)
		}
	}

	async removeEvent(req, res, next) {
		try {
			const event = await eventsService.cancelEventById(req.params.id, req.params.eventId, req.userInfo.id)
			res.send(event)
		} catch (error) {
			next(error)
		}
	}

	async getMemberMovies(req, res, next) {
		try {
			const movies = await moviesService.getMemberMovies(req.params.id)
			res.send(movies)
		} catch (error) {
			next(error)
		}
	}
}
