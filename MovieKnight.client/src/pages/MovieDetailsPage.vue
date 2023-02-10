<template>
	<div class="detailsPage">
		<img :src="movie.posterImg" alt="" class="posterImage" />
		<div class="detailsBody">
			<div class="header">
				<h1>
					{{ movie.title }}
				</h1>
				<div class="headerButtons" v-if="AppState.account?.id">
					<button class="button" data-bs-toggle="modal" data-bs-target="#movieModal">Add to guild</button>

					<button @click="addMovieToMyList" class="button">Save Movie</button>
				</div>
			</div>
			<div class="ratings">
				<div v-if="movie.rating >= 90">
					<h3>
						Rating: <i class="mdi mdi-star text-warning"></i>
						<i class="mdi mdi-star text-warning"></i>
						<i class="mdi mdi-star text-warning"></i>
						<i class="mdi mdi-star text-warning"></i>
						<i class="mdi mdi-star text-warning"></i>
					</h3>
				</div>
				<div v-if="movie.rating >= 80 && movie.rating < 90">
					<h3>
						Rating: <i class="mdi mdi-star text-warning"></i>
						<i class="mdi mdi-star text-warning"></i>
						<i class="mdi mdi-star text-warning"></i>
						<i class="mdi mdi-star text-warning"></i>
						<i class="mdi mdi-star-outline text-warning"></i>
					</h3>
				</div>
				<div v-if="movie.rating >= 60 && movie.rating < 80">
					<h3>
						Rating: <i class="mdi mdi-star text-warning"></i>
						<i class="mdi mdi-star text-warning"></i>
						<i class="mdi mdi-star text-warning"></i>
						<i class="mdi mdi-star-outline text-warning"></i>
						<i class="mdi mdi-star-outline text-warning"></i>
					</h3>
				</div>
				<div v-if="movie.rating >= 40 && movie.rating < 60">
					<h3>
						Rating: <i class="mdi mdi-star text-warning"></i>
						<i class="mdi mdi-star text-warning"></i>
						<i class="mdi mdi-star-outline text-warning"></i>
						<i class="mdi mdi-star-outline text-warning"></i>
						<i class="mdi mdi-star-outline text-warning"></i>
					</h3>
				</div>
				<div v-if="movie.rating >= 20 && movie.rating < 40">
					<h3>
						Rating: <i class="mdi mdi-star text-warning"></i>
						<i class="mdi mdi-star-outline text-warning"></i>
						<i class="mdi mdi-star-outline text-warning"></i>
						<i class="mdi mdi-star-outline text-warning"></i>
						<i class="mdi mdi-star-outline text-warning"></i>
					</h3>
				</div>
			</div>

			<h3 class="desc">{{ movie.description }}</h3>
		</div>
	</div>
</template>

<script setup>
import { AppState } from '../AppState'
import { computed, reactive, onMounted } from 'vue'
import Pop from '../utils/Pop.js'
import { logger } from '../utils/Logger.js'
import { moviesService } from '../services/MoviesService.js'
import { useRoute } from 'vue-router'
import { accountService } from '../services/AccountService.js'

let movie = computed(() => AppState.activeMovie)

const route = useRoute()
onMounted(async () => {
	await getMovieById()
})
async function getMovieById() {
	try {
		await moviesService.getMovieById(route.params.id)
	} catch (error) {
		Pop.error(error)
		logger.log(error)
	}
}

async function addMovieToMyList() {
	try {
		logger.log(movie.value, 'aahh')
		await accountService.addMovieToMyList(movie.value)
		Pop.success(`${movie.value.title} has been added to your movie list`)
	} catch (error) {
		Pop.error(error)
		logger.log(error)
	}
}
</script>

<style lang="scss" scoped>
.detailsPage {
	display: flex;
	min-height: 100vh;
	box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.707);
	background-image: url('https://wallpaperaccess.com/full/4477464.jpg');
	background-color: rgba(0, 0, 0, 0.668);
	background-blend-mode: color;
	background-repeat: no-repeat;
	background-size: 100% 100%;
	padding: 1rem;
	padding-left: 3rem;
	padding-right: 3rem;
	color: white;
}

.detailsBody {
	margin-left: 1rem;
	margin-top: 1rem;
}

.posterImage {
	padding: 1rem;
	height: 80vh;
	width: auto;
}

.desc {
	margin-top: 6rem;
	font-weight: 400;
	line-height: 2.3rem;
	background-image: url('../assets/img/goodbanner-removebg-preview.png');
	background-size: 100% 100%;
	background-repeat: no-repeat;
	background-position: center;
	padding-top: 12rem;
	padding-bottom: 4rem;
	padding-left: 15rem;
	padding-right: 15rem;
	color: black;
}

.header {
	display: flex;
	gap: 1rem;
	align-items: center;
	font-family: 'MedievalSharp', cursive;
	color: WHITE;
	justify-content: space-between;
}

.headerButtons {
	display: flex;
	gap: 1rem;
	align-items: center;
	flex-wrap: wrap;
	justify-content: center;
}

@media (max-width: 1440px) {
	.detailsPage {
		flex-wrap: wrap;
		background-repeat: repeat;
		background-size: 200%;
	}

	.ratings {
		padding-left: 5rem;
	}

	.desc {
		background-image: none;
		background-color: rgba(0, 0, 0, 0.811);
		backdrop-filter: blur(10px);
		color: white;
		padding: 1rem;
	}

	.header {
		flex-direction: column;
		align-items: center;
	}

	.posterImage {
		margin: auto;
	}
}
</style>
