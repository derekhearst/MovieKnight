<template>
 <div class="container">
  <h1>Hi</h1>
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
  setup(){
    const route = useRoute()
    onMounted(()=>{
      getMovieById()
    })
    async function getMovieById(){
      try {
        const id = route.params.id
        await moviesService.getMovieById(id)
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