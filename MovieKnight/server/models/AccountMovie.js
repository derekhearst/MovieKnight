import { Schema } from "mongoose"

export const AccountMovieSchema = new Schema(
	{
		accountId: { type: Schema.Types.ObjectId, required: true, ref: "Account" },
		movieId: { type: Schema.Types.ObjectId, required: true, ref: "Movie" },
		isFavorite: { type: Boolean, default: false },
	},
	{ timestamps: true, toJSON: { virtuals: true } }
)
AccountMovieSchema.virtual("account", {
	localField: "accountId",
	ref: "Account",
	foreignField: "_id",
	justOne: true,
})

AccountMovieSchema.virtual("movie", {
	localField: "movieId",
	ref: "Movie",
	foreignField: "_id",
	justOne: true,
})
