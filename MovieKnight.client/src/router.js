import { createRouter, createWebHashHistory } from 'vue-router'
import { authGuard, authSettled } from '@bcwdev/auth0provider-client'

function loadPage(page) {
	return () => import(`./pages/${page}.vue`)
}

const routes = [
	{
		path: '/',
		name: 'Home',
		component: loadPage('HomePage'),
	},
	{
		path: '/account',
		name: 'Account',
		component: loadPage('AccountPage'),
		beforeEnter: authGuard,
	},
	{
		path: '/group/:id',
		name: 'Group',
		component: loadPage('GroupPage'),
		beforeEnter: authGuard,
	},
	{
		path: '/event/:id',
		name: 'Event',
		component: loadPage('EventPage'),
		beforeEnter: authGuard,
	},
	{
		path: '/search/',
		name: 'Search',
		component: loadPage('SearchPage'),
		beforeEnter: authSettled,
	},
	{
		path: '/movieDetails/:id',
		name: 'MovieDetails',
		component: loadPage('MovieDetailsPage'),
		beforeEnter: authSettled,
	},
	{
		path: '/profile/:id',
		name: 'Profile',
		component: loadPage('ProfilePage'),
		beforeEnter: authGuard,
	},
	{
		path: '/about/',
		name: 'About',
		component: loadPage('AboutPage'),
	},
]

export const router = createRouter({
	linkActiveClass: 'router-link-active',
	linkExactActiveClass: 'router-link-exact-active',
	history: createWebHashHistory(),
	routes,
})
