import { dbContext } from "../db/DbContext.js"
import { BadRequest } from "../utils/Errors.js"

class MoviesService {
	async removeMovieFromGroup(groupId, movieId, userId) {
		// Checking to make sure the user is a member of the group
		let members = await dbContext.GroupMembers.find({ groupId: groupId })
		if (!members.find(m => m.accountId == userId)) {
			throw new BadRequest("You are not a member of this group")
		}

		let movie = await dbContext.GroupMovies.findOne({ groupId: groupId, movieId: movieId })

		if (!movie) {
			throw new BadRequest("No Movie Found")
		}
		await dbContext.GroupMovies.findByIdAndDelete(movieId)
		return "Successfully Removed"
	}
	async addMovieToGroup(groupId, body, userId) {
		// Checking to make sure the user is a member of the group
		let members = await dbContext.GroupMembers.find({ groupId: groupId })
		if (!members.find(m => m.accountId == userId)) {
			throw new BadRequest("You are not a member of this group")
		}

		let movie = await dbContext.GroupMovies.create({ groupId: groupId, movieId: body.movieId })
		await movie.populate("movie")
		return movie
	}
	async getMoviesByGroupId(groupId) {
		return await dbContext.GroupMovies.find({ groupId: groupId }).populate("movie")
	}
}
export const moviesService = new MoviesService()
