<template>
   <section class="row">
    <div>{{ event }}</div>
    <div>{{ movie }}</div>
   </section>
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

</style>