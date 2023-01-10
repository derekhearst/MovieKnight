<template>
   <div class="container-fluid bg-style pt-5">
    <section class="row justify-content-evenly py-3 bg-smokey">
      <!-- SECTION left side -->
      <div class="col-3">
        {{ movie[0].posterImg }}
        <img :src="movie.coverImg" alt="">
      </div>
      <!-- SECTION center side -->
      <div class="col-5"></div>
      <!-- SECTION right side -->
      <div class="col-3"></div>
    </section>
   </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import Pop from "../utils/Pop.js";
import { logger } from "../utils/Logger.js";
import { eventsService } from "../services/EventsService.js";
import { useRoute } from "vue-router";
import { groupsService } from "../services/GroupsService.js";
export default {
  setup(){
    const route = useRoute()
    onMounted(()=>{
      getEventById()
      getMoviesByEventId()
      getGroupByGroupId()
    })
    async function getEventById(){
      try {
        await eventsService.getEventById(route.params.id)
        
      } catch (error) {
        Pop.error(error)
        logger.log(error)
      }
    }
    async function getMoviesByEventId(){
      try {
        await eventsService.getMoviesByEventId(route.params.id)
      } catch (error) {
        Pop.error(error)
        logger.log(error)
      }
    }
    async function getGroupByGroupId(){
      try {
        const id = AppState.activeEvent.groupId
        await groupsService.getGroupByGroupId(id)
      } catch (error) {
        Pop.error(error)
        logger.log(error)
      }
    }
  return {
    event: computed(()=> AppState.activeEvent),
    movie: computed(()=> AppState.activeEventMovie),
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