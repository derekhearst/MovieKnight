<template>
  <div class="component">
{{ profile }}
{{ profileMovies }}
  </div>
</template>

<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { useRoute } from "vue-router";
import Pop from "../utils/Pop.js";
import { logger } from "../utils/Logger.js";
import {profilesService} from '../services/ProfilesService.js'
export default {
  setup(){
    const route = useRoute()
    onMounted(()=> {
      getProfile()
      getProfileMovies()
    })
    async function getProfile(){
      try {
        await profilesService.getProfile(route.params.id)
      } catch (error) {
        Pop.error(error)
        logger.log(error)
      }
    }
    async function getProfileMovies(){
      try {
        await profilesService.getProfileMovies(route.params.id)
      } catch (error) {
        Pop.error(error)
        logger.log(error)
      }
    }
  return {
    profile: computed(()=> AppState.activeProfile),
    profileMovies: computed(()=> AppState.profileMovies),
    route,

  }
  }
};
</script>


<style lang="scss" scoped>

</style>