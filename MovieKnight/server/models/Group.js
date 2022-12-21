import { Schema } from "mongoose"

export const GroupSchema = new Schema(
	{
		title: { type: String, required: true },
		description: { type: String, required: true },
		creatorId: { type: Schema.Types.ObjectId, required: true },
		coverImg: { type: String, required: true },
		visibility: { type: Boolean, required: true },
		archived: { type: Boolean, required: true },
	},
	{ timestamps: true, toJSON: { virtuals: true } }
)

GroupSchema.virtual("creator", {
	localField: "creatorId",
	ref: "Account",
	foreignField: "_id",
	justOne: true,
})
