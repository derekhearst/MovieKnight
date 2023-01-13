<template>
  <div class="page">
    <h1 class="scrollTitle">{{ profile.name }}</h1>
    <img :src="profile.picture" />

    <div class="badge">Favorite Movies</div>
    <div class="movies">
      <MovieCard :movie="movie.movie" v-for="movie in profileMovies" />
    </div>
  </div>
</template>

<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { useRoute } from "vue-router";
import Pop from "../utils/Pop.js";
import { logger } from "../utils/Logger.js";
import { profilesService } from '../services/ProfilesService.js'
import MovieCard from '../components/MovieCard.vue';
export default {
  setup() {
    const route = useRoute();
    onMounted(() => {
      getProfile();
      getProfileMovies();
    });
    async function getProfile() {
      try {
        await profilesService.getProfile(route.params.id);
      }
      catch (error) {
        Pop.error(error);
        logger.log(error);
      }
    }
    async function getProfileMovies() {
      try {
        await profilesService.getProfileMovies(route.params.id);
      }
      catch (error) {
        Pop.error(error);
        logger.log(error);
      }
    }
    return {
      profile: computed(() => AppState.activeProfile),
      profileMovies: computed(() => AppState.profileMovies),
      route,
    };
  },
  components: { MovieCard }
};
</script>


<style lang="scss" scoped>
.page {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url("../assets/img/stone-texture-background.jpg");
  background-color: rgba(0, 0, 0, 0.848);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-blend-mode: color;

}

.badge {
  margin-bottom: 1rem;
}

.scrollTitle {
  font-size: 4rem;
  width: 90%;
  padding-left: 2rem;
  padding-right: 2rem;
}

img {
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 50%;
  margin: 1rem;
  border: 2px solid goldenrod;
}

.movies {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 1rem;
}
</style>