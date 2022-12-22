<template>
 <div class="container">
  <section class="row">
    <!-- SECTION left side -->
    <div class="col-3"></div>
    <!-- SECTION Center-->
    <div class="col-5"></div>
    <!-- SECTION rIght side-->
    <div class="col-3"></div>
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
  setup(){
    const route = useRoute()
    onMounted(()=>{
      getGroupById()
    })
    async function getGroupById(){
      try {

        await groupsService.getGroupById(route.params.id)
      } catch (error) {
        Pop.error(error)
        logger.log(error)
      }
    }
  return {
    activeGroup: computed(()=> AppState.activeGroup)
  }
  }
};
</script>


<style lang="scss" scoped>

</style>