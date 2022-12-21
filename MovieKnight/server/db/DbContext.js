import mongoose from "mongoose"
import { AccountSchema } from "../models/Account"
import { AccountMovieSchema } from "../models/AccountMovie.js"
import { EventSchema } from "../models/Event.js"
import { EventCommentSchema } from "../models/EventComment.js"
import { EventMemberSchema } from "../models/EventMember.js"
import { EventMovieSchema } from "../models/EventMovie.js"
import { EventItemSchema } from "../models/EventItem.js"
import { GroupSchema } from "../models/Group.js"
import { GroupCommentSchema } from "../models/GroupComment.js"
import { GroupMemberSchema } from "../models/GroupMember.js"
import { GroupMovieSchema } from "../models/GroupMovie.js"
import { MovieSchema } from "../models/Movie.js"

class DbContext {
	Account = mongoose.model("Account", AccountSchema)
	AccountMovies = mongoose.model("AccountMovie", AccountMovieSchema)

	Groups = mongoose.model("Group", GroupSchema)
	GroupMembers = mongoose.model("GroupMember", GroupMemberSchema)
	GroupMovies = mongoose.model("GroupMovie", GroupMovieSchema)
	GroupComments = mongoose.model("GroupComment", GroupCommentSchema)

	Events = mongoose.model("Event", EventSchema)
	EventMembers = mongoose.model("EventMember", EventMemberSchema)
	EventComments = mongoose.model("EventComment", EventCommentSchema)
	EventMovies = mongoose.model("EventMovie", EventMovieSchema)
	EventItems = mongoose.model("EventItem", EventItemSchema)

	Movies = mongoose.model("Movie", MovieSchema)
}

export const dbContext = new DbContext()
