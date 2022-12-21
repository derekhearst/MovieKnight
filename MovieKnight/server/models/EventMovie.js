import { Schema } from "mongoose"

export const EventMovieSchema = new Schema(
	{
		eventId: { type: Schema.Types.ObjectId, required: true, ref: "Event" },
		movieId: { type: Schema.Types.ObjectId, required: true, ref: "Movie" },
	},
	{ timestamps: true, toJSON: { virtuals: true } }
)

EventMovieSchema.virtual("event", {
	localField: "eventId",
	ref: "Event",
	foreignField: "_id",
	justOne: true,
})

EventMovieSchema.virtual("movie", {
	localField: "movieId",
	ref: "Movie",
	foreignField: "_id",
	justOne: true,
})
