<template>
  <div class="col-10">

    <router-link :to="{name: 'Event', params: {id: event.id}}">
      <div class="d-flex justify-content-between bg-black text-white my-4 rounded elevation-7">
        <img class="img-style" :src="event.coverImg" alt="">
        <div class="pt-3 px-2">
          <h4>{{event.title}}</h4>
          <p>{{event.description.slice(0,200)}}</p>
        </div>
      </div>
    </router-link>
  </div>
  <div class="col-2">

    <button class="btn bg-warning" data-bs-toggle="modal" data-bs-target="#addmovietoevent" type="button"><i class="mdi mdi-plus text-danger fs-4 fw-bold" @click="setEventActive()"></i></button>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { Group } from "../models/Group.js";
import { eventsService } from "../services/EventsService.js";
import Pop from "../utils/Pop.js";
import { logger } from "../utils/Logger.js";
// import { group } from "console";
export default {
  props: {event:{type: Object, required: true}},
  setup(props){
    
  return {
    props,
    groupMovies: computed(()=> AppState.groupMovies),
    setEventActive(){
    try {
     eventsService.setEventActive(props.event.id)
    } catch (error) {
      Pop.error(error)
      logger.log(error)
    }
    }
  }
  }
};
</script>


<style lang="scss" scoped>
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