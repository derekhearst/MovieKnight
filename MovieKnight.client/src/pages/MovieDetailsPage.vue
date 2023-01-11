<template>
  <div class="detailsPage">
    <img :src="movie.posterImg" alt="" class="posterImage">
    <div class="detailsBody">
      <div class="header">
        <h1>
          {{ movie.title }}
        </h1>
        <div class="d-flex gap-4">

          <button class="goodButton" data-bs-toggle="modal" data-bs-target="#movieModal">Add to guild</button>
          <!-- TODO fix the button below me -->
          <button @click="addMovieToMyList" class="goodButton">Save Movie</button>
        </div>
      </div>
      <div class="ratings">
        <div v-if="movie.rating >= 90">
          <h3>Rating: <i class="mdi mdi-star text-warning"></i>
            <i class="mdi mdi-star text-warning"></i>
            <i class="mdi mdi-star text-warning"></i>
            <i class="mdi mdi-star text-warning"></i>
            <i class="mdi mdi-star text-warning"></i>
          </h3>
        </div>
        <div v-if="movie.rating >= 80 && movie.rating < 90">
          <h3>Rating: <i class=" mdi mdi-star text-warning"></i>
            <i class="mdi mdi-star text-warning"></i>
            <i class="mdi mdi-star text-warning"></i>
            <i class="mdi mdi-star text-warning"></i>
            <i class="mdi mdi-star-outline text-warning"></i>
          </h3>
        </div>
        <div v-if="movie.rating >= 60 && movie.rating < 80">
          <h3>Rating: <i class="mdi mdi-star text-warning"></i>
            <i class="mdi mdi-star text-warning"></i>
            <i class="mdi mdi-star text-warning"></i>
            <i class="mdi mdi-star-outline text-warning"></i>
            <i class="mdi mdi-star-outline text-warning"></i>
          </h3>
        </div>
        <div v-if="movie.rating >= 40 && movie.rating < 60">
          <h3>Rating: <i class="mdi mdi-star text-warning"></i>
            <i class="mdi mdi-star text-warning"></i>
            <i class="mdi mdi-star-outline text-warning"></i>
            <i class="mdi mdi-star-outline text-warning"></i>
            <i class="mdi mdi-star-outline text-warning"></i>
          </h3>
        </div>
        <div v-if="movie.rating >= 20 && movie.rating < 40">
          <h3>Rating: <i class="mdi mdi-star text-warning"></i>
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


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import Pop from "../utils/Pop.js";
import { logger } from "../utils/Logger.js";
import { moviesService } from "../services/MoviesService.js";
import { useRoute } from "vue-router";
import { accountService } from "../services/AccountService.js";
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
      async addMovieToMyList(){
        try {
          // logger.log('active movie',this.movie)
          await  accountService.addMovieToMyList(route.params.id)
        } catch (error) {
          Pop.error(error)
          logger.log(error)
        }
      },
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
.detailsPage {
  display: flex;
  min-height: 100vh;

  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.707);
  background-image: url("https://wallpaperaccess.com/full/4477464.jpg");
  background-color: rgba(0, 0, 0, 0.668);
  background-blend-mode: color;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  padding: 1rem;
  padding-left: 3rem;
  padding-right: 3rem;

}

.detailsBody {
  margin-left: 1rem;
  margin-top: 1rem;
}

.posterImage {
  padding: 1rem;
}

.desc {
  margin-top: 6rem;
  font-weight: 400;
  line-height: 2.3rem;
  background-image: url("../assets/img/goodbanner-removebg-preview.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
  padding-top: 9rem;
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

  justify-content: space-between;
}

.goodButton {
  background-image: url("../assets/img/goodbutton-removebg-preview.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
  text-align: center;
  height: 5rem;
  width: 17rem;
  border: none;
  color: black;
  font-size: 2rem;
  font-weight: bold;
  background-color: transparent;
  margin-top: -.15rem;
  font-family: 'MedievalSharp', cursive;
}
</style>