import { dbContext } from "../db/DbContext.js"
import { BadRequest } from "../utils/Errors.js"

class MoviesService {
	async getMemberMovies(groupId) {
		let members = await dbContext.GroupMembers.find({ groupId: groupId })
		let movies = []
		for (let i = 0; i < members.length; i++) {
			let memberMovies = await dbContext.AccountMovies.find({ accountId: members[i].accountId })
			movies = movies.concat(memberMovies)
		}
		return movies
	}
	async removeGroupMovie(groupId, movieId, userId) {
		// Checking to make sure the user is a member of the group
		let members = await dbContext.GroupMembers.find({ groupId: groupId })
		if (!members.find(m => m.accountId == userId)) {
			throw new BadRequest("You are not a member of this group")
		}

		let movie = await dbContext.GroupMovies.findOne({ groupId: groupId, _id: movieId })

		if (!movie) {
			throw new BadRequest("No Movie Found")
		}
		await dbContext.GroupMovies.findByIdAndDelete(movieId)
		return "Successfully Removed"
	}
	async addGroupMovie(groupId, body, userId) {
		// Checking to make sure the user is a member of the group
		let members = await dbContext.GroupMembers.find({ groupId: groupId })
		if (!members.find(m => m.accountId == userId)) {
			throw new BadRequest("You are not a member of this group")
		}

		let newMovie = await getOrCreateMovie(body)

		let movie = await dbContext.GroupMovies.create({ groupId: groupId, movieId: newMovie._id })
		await movie.populate("movie")
		return movie
	}
	async getGroupMovies(groupId) {
		return await dbContext.GroupMovies.find({ groupId: groupId }).populate("movie")
	}

	async removeEventMovie(movieId, userId) {
		let movie = await dbContext.EventMovies.findById(movieId)
		if (!movie) {
			throw new BadRequest("No movie found")
		}
		let eventMembers = await dbContext.EventMembers.find({ eventId: movie.eventId })
		if (!eventMembers.find(m => m.accountId == userId)) {
			throw new BadRequest("You are not a member of this event")
		}
		await movie.delete()
		return "Successfully Removed Movie"
	}
	async addEventMovie(eventId, body) {
		let eventMembers = await dbContext.EventMembers.find({ eventId: eventId })
		if (!eventMembers.find(m => m.accountId == body.creatorId)) {
			throw new BadRequest("You are not a member of this event")
		}
		let newMovie = await getOrCreateMovie(body)
		let newnewMovie = await dbContext.EventMovies.create({ movieId: newMovie.id, eventId: eventId })
		await newnewMovie.populate("movie")
		return newnewMovie
	}
	async getEventMovies(eventId, userId) {
		let event = await dbContext.Events.findById(eventId)
		if (!event) {
			throw new BadRequest("No event found")
		}
		let groupMembers = await dbContext.GroupMembers.find({ groupId: event.groupId })
		if (!groupMembers.find(m => m.accountId == userId)) {
			throw new BadRequest("You are not a member of this group")
		}
		return await dbContext.EventMovies.find({ eventId: eventId }).populate("movie")
	}
}
export const moviesService = new MoviesService()

async function getOrCreateMovie(body) {
	let movie = await dbContext.Movies.findOne({ mDId: body.mDId })
	if (!movie) {
		movie = await dbContext.Movies.create(body)
	}
	return movie
}
