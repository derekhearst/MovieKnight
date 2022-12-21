import { Schema } from "mongoose"

export const EventMemberSchema = new Schema(
	{
		accountId: { type: Schema.Types.ObjectId, required: true, ref: "Account" },
		eventId: { type: Schema.Types.ObjectId, required: true, ref: "Event" },
	},
	{ timestamps: true, toJSON: { virtuals: true } }
)

EventMemberSchema.virtual("account", {
	localField: "accountId",
	ref: "Account",
	foreignField: "_id",
	justOne: true,
})

EventMemberSchema.virtual("event", {
	localField: "eventId",
	ref: "Event",
	foreignField: "_id",
	justOne: true,
})
