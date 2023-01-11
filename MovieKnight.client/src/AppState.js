import { reactive } from "vue"

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
<<<<<<< HEAD
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
=======
  user: {},
  /** @type {import('./models/Account.js').Account} */
  account: {},
  /** @type {import('./models/Movie.js').Movie[]} */
  movies: [],
  /** @type {import('./models/Movie.js').Movie[]} */
  searchMovies: [],
  /** @type {import('./models/Movie.js').Movie[]} */
  activeMovie: {},
  // /** @type {import('./models/Group.js').Group[]} */
  myGroups: [],
  activeGroup: null,
  groupMovies: [],
  activeComments: [],
  activeGroupEvents: [],
  activeEventId: {},
  activeEvent: null,
  activeEventMovie: [],
  activeEventMembers: [],
  myEvents: [],
  groups: [],
>>>>>>> c461e7c9af15ff8e08b4756e4f27f34d6f08a5e4
})
