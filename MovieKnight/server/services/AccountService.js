import { dbContext } from "../db/DbContext"

// Private Methods

/**
 * Creates account if one does not exist
 * @param {any} account
 * @param {any} user
 */
async function createAccountIfNeeded(account, user) {
	if (!account) {
		user._id = user.id
		account = await dbContext.Account.create({
			...user,
			subs: [user.sub],
		})
	}
	return account
}

/**
 * Adds sub to account if not already on account
 * @param {any} account
 * @param {any} user
 */
async function mergeSubsIfNeeded(account, user) {
	if (!account.subs.includes(user.sub)) {
		// @ts-ignore
		account.subs.push(user.sub)
		await account.save()
	}
}
/**
 * Restricts changes to the body of the account object
 * @param {any} body
 */
function sanitizeBody(body) {
	const writable = {
		name: body.name,
		picture: body.picture,
	}
	return writable
}

class AccountService {
	async favMovie(movieId, userId) {
		let movie = await dbContext.AccountMovies.findOne({ _id: movieId, accountId: userId })
		if (!movie) {
			throw new Error("Invalid Id")
		}
		movie.isFavorite = !movie.isFavorite
		await movie.save()
		return await movie.populate("movie")
	}
	async removeMovie(movieId, userId) {
		let movie = await dbContext.AccountMovies.findOneAndDelete({ _id: movieId, accountId: userId })
		if (!movie) {
			throw new Error("Invalid Id")
		}

		return "successfully removed"
	}
	async addMovie(body) {
		let movie = await getOrCreateMovie(body)
		let newMovie = await dbContext.AccountMovies.create({ movieId: movie._id, accountId: body.accountId })
		return await newMovie.populate("movie")
	}
	async getMoviesByUserId(userId) {
		return await dbContext.AccountMovies.find({ accountId: userId }).populate("movie")
	}
	/**
	 * Returns a user account from the Auth0 user object
	 *
	 * Creates user if none exists
	 *
	 * Adds sub of Auth0 account to account if not currently on account
	 * @param {any} user
	 */
	async getAccount(user) {
		let account = await dbContext.Account.findOne({
			_id: user.id,
		})
		account = await createAccountIfNeeded(account, user)
		await mergeSubsIfNeeded(account, user)
		return account
	}

	/**
	 * Updates account with the request body, will only allow changes to editable fields
	 *  @param {any} user Auth0 user object
	 *  @param {any} body Updates to apply to user object
	 */
	async updateAccount(user, body) {
		const update = sanitizeBody(body)
		const account = await dbContext.Account.findOneAndUpdate({ _id: user.id }, { $set: update }, { runValidators: true, setDefaultsOnInsert: true, new: true })
		return account
	}
}
export const accountService = new AccountService()

async function getOrCreateMovie(body) {
	let movie = await dbContext.Movies.findOne({ mDId: body.mDId })
	if (!movie) {
		movie = await dbContext.Movies.create(body)
	}
	return movie
}
