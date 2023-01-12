import { BadRequest } from "@bcwdev/auth0provider/lib/Errors.js"
import { dbContext } from "../db/DbContext.js"

// IMPORTANT profiles should not be updated or modified in any way here. Use the AccountService

class ProfileService {
//  async getMoviesByProfileId(id) {
// 	const movies = await dbContext.AccountMovies.findById(id)
// 	if(!movies) {throw new BadRequest('no movies at this id', id)}
// 	return movies
//   }
	/**
	 * Returns a user profile from its id
	 * @param {string} id
	 */
	async getProfileById(id) {
		const profile = await dbContext.Account.findById(id)
		if (!profile) {
			throw new Error("Invalid Id")
		}
		const profileMovies = await dbContext.AccountMovies.find({ accountId: id })
		profile.movies = profileMovies
		return profile
	}

	/**
	 * Returns a list user profiles from a query search of name likeness
	 * limits to first 20 without offset
	 * @param {string} name
	 */
	async findProfiles(name = "", offset = 0) {
		const filter = new RegExp(name, "ig")
		return await dbContext.Account.aggregate([
			{
				$match: { name: filter },
			},
		])
			.collation({ locale: "en_US", strength: 1 })
			.skip(Number(offset))
			.limit(20)
			.exec()
	}
}

export const profileService = new ProfileService()
