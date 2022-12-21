import { Schema } from "mongoose"

export const MovieSchema = new Schema(
	{
		title: { type: String, required: true },
		coverImg: { type: String, required: true },
		description: { type: String, required: true },
		rating: { type: Number, required: true },
		mdId: { type: String, required: true },
	},
	{ timestamps: true, toJSON: { virtuals: true } }
)
