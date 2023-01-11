import { reactive } from "vue"

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
	user: {},
	/** @type {import('./models/Account.js').Account} */
	account: {},
	myGroups: [],
	myEvents: [],
	myMovies: [],
	/** @type {import('./models/Movie.js').Movie[]} */
	movies: [],
	activeMovie: {},

	activeGroup: {},
	activeGroupMovies: [],
	activeGroupMembers: [],
	activeGroupComments: [],
	activeGroupEvents: [],

	activeEvent: {},
	activeEventMovies: [],
	activeEventMembers: [],
	activeEventComments: [],
	activeEventItems: [],
})
