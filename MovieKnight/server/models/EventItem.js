import { Schema } from "mongoose"

export const EventItemSchema = new Schema(
	{
		item: { type: String, required: true },
		creatorId: { type: Schema.Types.ObjectId, required: true, ref: "Account" },
		eventId: { type: Schema.Types.ObjectId, required: true, ref: "Event" },
	},
	{ timestamps: true, toJSON: { virtuals: true } }
)

EventItemSchema.virtual("creator", {
	localField: "creatorId",
	ref: "Account",
	foreignField: "_id",
	justOne: true,
})

EventItemSchema.virtual("event", {
	localField: "eventId",
	ref: "Event",
	foreignField: "_id",
	justOne: true,
})
