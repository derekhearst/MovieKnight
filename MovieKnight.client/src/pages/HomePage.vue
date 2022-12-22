<template>
  <div class="container-fluid">
    <section class="row justify-content-evenly mt-3">
      <!-- SECTION movies -->
      <div class="col-8 p-1">
        <section class="row justify-content-evenly p-1">
          <!-- TODO v-for over this col-3 -->
          <div class="col-3 p-3" v-for="m in movies">
            <MovieCard :movie="m"/>
          </div>
        </section>
      </div>
      <!-- SECTION groups and events -->
      <div class="col-3 border-style">
        <!-- SECTION groups -->
        <section class="row justify-content-center">
          <div class="col-10 d-flex justify-content-between">
            <h1 class="fw-bold">My Groups</h1>
            <!-- TODO offcanvas form -->
            <button class="btn maroon fw-bold fs-4"  type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">Make Group</button>
          </div>
          <div class="col-11">
            <div class="d-flex justify-content-start bg-black my-4 rounded elevation-7">
              <img class="img-style" src="https://thiscatdoesnotexist.com" alt="">
              <div class="ps-3">
                <h4>Title</h4>
                <p>description</p>
              </div>
            </div>
          </div>
        </section>
        <!-- SECTION events -->
        <section class="row">
          <div class="col-10"></div>
        </section>
      </div>
    </section>
  </div>
</template>

<script>
import { AppState } from "../AppState.js";
import { computed, reactive, onMounted, ref } from 'vue';
import Pop from "../utils/Pop.js";
import { logger } from "../utils/Logger.js";
import { moviesService } from "../services/MoviesService.js";
import MovieCard from "../components/MovieCard.vue";
import { groupsService } from "../services/GroupsService.js";
import { useRouter } from "vue-router";


export default {
    setup() {
      const editable = ref({})
      const router = useRouter()
        onMounted(() => {
            getMovies();
        });
        async function getMovies() {
            try {
                await moviesService.getMovies();
            }
            catch (error) {
                Pop.error(error);
                logger.log(error);
            }
        }
        return {
            movies: computed(() => AppState.movies),
            async createGroup(){
              try {
                await groupsService.createGroup(editable.value)
                router.push({name: 'Group', params: {id: group.id}})
              } catch (error) {
                Pop.error(error)
                logger.log(error)
              }
            }
        };
    }
}
</script>

<style scoped lang="scss">
.maroon{
  background-color: #fbcf33;
  color: #8f1515;
}
.border-style{
  // border-color:#fbcf33;
  border-left: 2px solid #fbcf33;
}
.img-style{
  height: 20vh;
  width: 40%;
  object-fit: cover;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}
.elevation-7{
  box-shadow: 3px 3px 3px #fbd033a2;
}
</style>
