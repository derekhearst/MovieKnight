import { Schema } from "mongoose"

export const GroupCommentSchema = new Schema(
	{
		creatorId: { type: Schema.Types.ObjectId, required: true, ref: "Account" },
		groupId: { type: Schema.Types.ObjectId, required: true, ref: "Group" },
		body: { type: String, required: true },
	},
	{ timestamps: true, toJSON: { virtuals: true } }
)

GroupCommentSchema.virtual("creator", {
	localField: "creatorId",
	ref: "Account",
	foreignField: "_id",
	justOne: true,
})

GroupCommentSchema.virtual("group", {
	localField: "groupId",
	ref: "Group",
	foreignField: "_id",
	justOne: true,
})
