<template>
  <div class="bg-style">
    <div class="container-fluid p-5 align-content-center">
      <section class="row justify-content-evenly bg-smokey py-4">
        <div class="col-12 col-md-3 d-flex align-items-center">
          <img class="rounded elevation-5" :src="movie.posterImg" alt="">
        </div>
        <div class="col-12 col-md-7 p-2 mt-2">
          <section class="row justify-content-end">
            <div class="col-12 col-md-3 d-flex justify-content-between">
              <!-- TODO onclick below me -->
              <button class="btn maroon fw-bold fs-5 mx-2" data-bs-toggle="modal" data-bs-target="#movieModal"
                type="button">Add to guild</button>
              <button class="btn maroon fw-bold fs-5 mx-2">Make Event</button>
            </div>
          </section>
          <section class="row">
            <div class="col-12 col-md-9 p-2 mt-3 bg-dark card elevation-3">
              <h1 class="text-danger"><u>
                  {{ movie.title }}
                </u></h1>
              <h2 class="mt-5">Movie Overview:</h2>
              <h3>{{ movie.description }}</h3>
            </div>
          </section>
          <section class="row">
            <div v-if="movie.rating >= 90" class="col-12 col-md-9 p-2 mt-3 bg-dark card elevation-3">
              <h3>Rating: <i class="mdi mdi-star text-warning"></i>
                <i class="mdi mdi-star text-warning"></i>
                <i class="mdi mdi-star text-warning"></i>
                <i class="mdi mdi-star text-warning"></i>
                <i class="mdi mdi-star text-warning"></i>
              </h3>
            </div>
            <div v-if="movie.rating >= 80 && movie.rating < 90"
              class="col-12 col-md-9 p-2 mt-3 bg-dark card elevation-3">
              <h3>Rating: <i class="mdi mdi-star text-warning"></i>
                <i class="mdi mdi-star text-warning"></i>
                <i class="mdi mdi-star text-warning"></i>
                <i class="mdi mdi-star text-warning"></i>
                <i class="mdi mdi-star-outline text-warning"></i>
              </h3>
            </div>
            <div v-if="movie.rating >= 60 && movie.rating < 80"
              class="col-12 col-md-9 p-2 mt-3 bg-dark card elevation-3">
              <h3>Rating: <i class="mdi mdi-star text-warning"></i>
                <i class="mdi mdi-star text-warning"></i>
                <i class="mdi mdi-star text-warning"></i>
                <i class="mdi mdi-star-outline text-warning"></i>
                <i class="mdi mdi-star-outline text-warning"></i>
              </h3>
            </div>
            <div v-if="movie.rating >= 40 && movie.rating < 60"
              class="col-12 col-md-9 p-2 mt-3 bg-dark card elevation-3">
              <h3>Rating: <i class="mdi mdi-star text-warning"></i>
                <i class="mdi mdi-star text-warning"></i>
                <i class="mdi mdi-star-outline text-warning"></i>
                <i class="mdi mdi-star-outline text-warning"></i>
                <i class="mdi mdi-star-outline text-warning"></i>
              </h3>
            </div>
            <div v-if="movie.rating >= 20 && movie.rating < 40"
              class="col-12 col-md-9 p-2 mt-3 bg-dark card elevation-3">
              <h3>Rating: <i class="mdi mdi-star text-warning"></i>
                <i class="mdi mdi-star-outline text-warning"></i>
                <i class="mdi mdi-star-outline text-warning"></i>
                <i class="mdi mdi-star-outline text-warning"></i>
                <i class="mdi mdi-star-outline text-warning"></i>
              </h3>
            </div>
          </section>
        </div>
      </section>
    </div>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import Pop from "../utils/Pop.js";
import { logger } from "../utils/Logger.js";
import { moviesService } from "../services/MoviesService.js";
import { useRoute } from "vue-router";
export default {
  setup() {
    const route = useRoute()
    onMounted(() => {
      getMovieById()
      // getStreams()
    })
    async function getMovieById() {
      try {
        const id = route.params.id
        await moviesService.getMovieById(id)
      } catch (error) {
        Pop.error(error)
        logger.log(error)
      }
    }
    // async function getStreams(){
    //   try {
    //     const id = route.params.id
    //     await moviesService.getStreams(id)
    //   } catch (error) {
    //     Pop.error(error)
    //     logger.log(error)
    //   }
    // }
    return {
      async addMovieToGroup() { },
      movie: computed(() => AppState.activeMovie),
      // TODO finish function
      // FIXME button must choose guild before posting
      // async postMovieToGroup(){
      //   try {
      //     await moviesService.postMovieToGroup()
      //   } catch (error) {
      //     Pop.error(error)
      //     logger.log(error)
      //   }
      // }
    }
  }
};
</script>


<style lang="scss" scoped>
.bg-style {
  background-image: url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80');
  background-position: center;
  background-size: cover;
  height: 100%;
  min-height: 92vh;
}

.bg-smokey {
  background-color: rgba(146, 146, 146, 0.418);
}

.maroon {
  background-color: #fbcf33;
  color: #8f1515;
}



// "warning": #fbcf33,
// "danger": #8f1515,
</style>