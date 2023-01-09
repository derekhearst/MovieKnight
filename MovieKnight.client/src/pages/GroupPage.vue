<template>
  <div class="container-fluid bg-style pt-5">
    <section class="row justify-content-evenly py-3 bg-smokey">
      <!-- SECTION left side -->
      <div class="col-3">
        <img class="img-style rounded" :src="group.coverImg">
        <div class="bg-dark my-2 rounded p-2">
          <h2>Description:</h2>
          <h4>{{ group.description }}</h4>
        </div>
      </div>
      <!-- SECTION Center-->
      <div class="col-5">
        <div class="d-flex justify-content-between bg-dark elevation-3 p-4">
          <div>
            <h1 class="text-white">{{ group.title }}</h1>
          </div>
          <div>
            <i class="mdi mdi-movie-plus fs-2 text-white selectable px-3"></i>
          </div>
        </div>
        <div class="border my-3 rounded text-end">
          <!-- TODO this is where we will draw comments -->
          <form>
            <div class="d-flex">
              <input class="form-control" type="text">
              <button class="btn btn-dark"><i class="mdi mdi-send fs-3"></i></button>
            </div>
          </form>
        </div>
      </div>
      <!-- SECTION rIght side-->
      <div class="col-3 bg-darkish p-3">
        <div class="bg-light p-2">
          <h1>Guild Events</h1>
          <button class="btn"><i class="mdi mdi-shield"><strong>New Guild Event</strong></i><i
              class="mdi mdi-shield"></i></button>
        </div>
      </div>
    </section>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { useRoute } from "vue-router";
import Pop from "../utils/Pop.js";
import { logger } from "../utils/Logger.js";
import { groupsService } from "../services/GroupsService.js";
export default {
  setup() {
    const route = useRoute()
    onMounted(() => {
      getGroupById()
      getMoviesByGroupId()
    })
    async function getGroupById() {
      try {
        await groupsService.getGroupById(route.params.id)
      } catch (error) {
        Pop.error(error)
        logger.log(error)
      }
    }
    async function getMoviesByGroupId(){
      try {
        await groupsService.getMoviesByGroupId(route.params.id)
      } catch (error) {
        Pop.error(error)
        logger.log(error)
      }
    }
  return {
    group: computed(()=> AppState.activeGroup),
    groupMovies: computed(()=> AppState.groupMovies)
  }
  }
};
</script>


<style lang="scss" scoped>
.bg-style {
  background-image: url('https://images.unsplash.com/photo-1618193319734-478296be37ad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvamVjdG9yfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60');
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

.img-style {
  // min-height: 35vh;
  object-fit: contain;
  width: 100%;
}

.bg-darkish {
  background-color: #1e1e1ea9;
}
</style>