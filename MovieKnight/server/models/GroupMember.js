import { Schema } from "mongoose"

export const GroupMemberSchema = new Schema(
	{
		accountId: { type: Schema.Types.ObjectId, required: true, ref: "Account" },
		groupId: { type: Schema.Types.ObjectId, required: true, ref: "Group" },
	},
	{ timestamps: true, toJSON: { virtuals: true } }
)

GroupMemberSchema.virtual("account", {
	localField: "accountId",
	ref: "Account",
	foreignField: "_id",
	justOne: true,
})

GroupMemberSchema.virtual("group", {
	localField: "groupId",
	ref: "Group",
	foreignField: "_id",
	justOne: true,
})
