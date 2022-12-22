<template>
 <div class="container-fluid bg-style pt-5">
  <section class="row justify-content-evenly bg-smokey py-3">
    <!-- SECTION left side -->
    <div class="col-3">
        <img :src="group.coverImg" >
        <div>
          <h4>{{ group.description }}</h4>
        </div>
    </div>
    <!-- SECTION Center-->
    <div class="col-4 bg-dark card elevation-3">
      <div class="d-flex justify-content-between">
        <div>
          <h1 class="text-white">{{ group.title }}</h1>
        </div>
        <div>

          <i class="mdi mdi-movie-plus fs-3 text-black selectable px-3"></i>
        </div>
      </div>
    </div>
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
    group: computed(()=> AppState.activeGroup)
  }
  }
};
</script>


<style lang="scss" scoped>
.bg-style{
background-image: url('https://images.unsplash.com/32/Mc8kW4x9Q3aRR3RkP5Im_IMG_4417.jpg?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGJhY2tncm91bmQlMjBpbWFnZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60');
  background-position: center;
  background-size: cover;
  height: 100%;
  min-height: 92vh;
}
.bg-smokey{
  background-color: rgba(146, 146, 146, 0.418);
}
.maroon{
  background-color: #fbcf33;
  color: #8f1515;
}
</style>