<template>
  <div class="component">


  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import Pop from "../utils/Pop.js";
import { logger } from "../utils/Logger.js";
import { eventsService } from "../services/EventsService.js";
import { useRoute } from "vue-router";
export default {
  setup(){
    const route = useRoute()
    onMounted(()=>{
      getEventById()
    })
    async function getEventById(){
      try {
        await eventsService.getEventById(route.params.id)
      } catch (error) {
        Pop.error(error)
        logger.log(error)
      }
    }
  return {  }
  }
};
</script>


<style lang="scss" scoped>

</style>