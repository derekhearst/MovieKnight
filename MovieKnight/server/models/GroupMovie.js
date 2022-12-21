import { Schema } from "mongoose"

export const GroupMovieSchema = new Schema(
	{
		groupId: { type: Schema.Types.ObjectId, required: true, ref: "Group" },
		movieId: { type: Schema.Types.ObjectId, required: true, ref: "Movie" },
	},
	{ timestamps: true, toJSON: { virtuals: true } }
)

GroupMovieSchema.virtual("group", {
	localField: "groupId",
	ref: "Group",
	foreignField: "_id",
	justOne: true,
})

GroupMovieSchema.virtual("movie", {
	localField: "movieId",
	ref: "Movie",
	foreignField: "_id",
	justOne: true,
})
