import { Schema } from "mongoose"

export const EventSchema = new Schema(
	{
		title: { type: String, required: true },
		description: { type: String, required: true },
		creatorId: { type: Schema.Types.ObjectId, required: true, ref: "Account" },
		coverImg: { type: String, required: true },
		groupId: { type: Schema.Types.ObjectId, required: true, ref: "Group" },
		capacity: { type: Number, required: true },
		location: { type: String, required: true },
		startTime: { type: Date, required: true },
		canceled: { type: Boolean, required: true },
		recurring: { type: Boolean, required: true },
		recurringPeriod: { type: String, required: true, enum: ["daily", "weekly", "monthly"] },
		items: { type: [String], default: [] },
	},
	{ timestamps: true, toJSON: { virtuals: true } }
)

EventSchema.virtual("creator", {
	localField: "creatorId",
	ref: "Account",
	foreignField: "_id",
	justOne: true,
})

EventSchema.virtual("group", {
	localField: "groupId",
	ref: "Group",
	foreignField: "_id",
	justOne: true,
})
