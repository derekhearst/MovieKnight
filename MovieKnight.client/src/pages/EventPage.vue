<template>
  <div class="container-fluid bg-style pt-5">
    <section class="row justify-content-evenly py-3 bg-smokey">
      <!-- SECTION left side -->
      <div class="col-3">
        <img :src="event?.coverImg" alt="">
        <div v-if="group" class="rounded w-75 text-center">
          <router-link :to="{ name: 'Group', params: { id: group.id } }">
            <div class="d-flex justify-content-start bg-black text-white my-4 rounded elevation-7">
              <img class="img-style" :src="group.coverImg" alt="">
              <div class="pt-3 px-2">
                <h4>{{ group.title }}</h4>
                <p>{{ group.description.slice(0, 200) }}</p>
              </div>
            </div>
          </router-link>
        </div>
      </div>
      <!-- SECTION center side -->
      <div class="col-5">
        <div class="d-flex justify-content-between bg-dark elevation-3 p-4">
          <div>
            <h1 class="text-white">{{ event?.title }}</h1>
          </div>
          <div v-if="isMember">
            <i @click="removeMyselfFromEvent" class="mdi mdi-account-minus fs-2 text-white selectable px-3"></i>
          </div>
          <div v-else>
            <i @click="addMyselfToEvent" class="mdi mdi-account-plus fs-2 text-white selectable px-3"></i>

          </div>
        </div>
        <div class="bg-dark elevation-3 p-4 my-2">
          <h1>Description: {{ event?.description }}</h1>
          <h1>Location: {{ event?.location }}</h1>
          <h1>Date: {{ event?.startTime }}</h1>
          <h1>Capacity: {{ event?.capacity }}</h1>
          <h1 v-if="event?.items">Items: {{ event?.items }}</h1>
        </div>
      </div>
      <!-- SECTION right side -->
      <div class="col-3"></div>
    </section>
  </div>
</template>


<script setup>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, watchEffect, ref } from 'vue';
import Pop from "../utils/Pop.js";
import { logger } from "../utils/Logger.js";
import { eventsService } from "../services/EventsService.js";
import { useRoute } from "vue-router";
import { groupsService } from "../services/GroupsService.js";
import GroupCard from "../components/GroupCard.vue";

const route = useRoute()
onMounted(() => {
  getEventById()
  getMoviesByEventId()
})
watchEffect(()=> {
  AppState.activeEventMembers
AppState.activeEvent})

const isMember = ref(true)


async function getEventById() {
  try {
    await eventsService.getEventById(route.params.id)
    getGroupByGroupId()
    getMembersByEventId()

  } catch (error) {
    Pop.error(error)
    logger.log(error)
  }
}
async function getMembersByEventId() {
  try {
    await eventsService.getMembersByEventId(route.params.id)
    if(AppState.activeEventMembers.find(m=>m.accountId == account.id)){
      isMember.value = true
    }
    else{isMember.value=false}
  } catch (error) {
    Pop.error(error)
    logger.log(error)
  }
}
async function getMoviesByEventId() {
  try {
    await eventsService.getMoviesByEventId(route.params.id)
  } catch (error) {
    Pop.error(error)
    logger.log(error)
  }
}
async function getGroupByGroupId() {
  try {
    const id = AppState.activeEvent.groupId
    await groupsService.getGroupByGroupId(id)
  } catch (error) {
    Pop.error(error)
    logger.log(error)
  }
}


async function removeMyselfFromEvent() {
  try {
    await eventsService.removeMyselfFromEvent(route.params.id, AppState.account.id)
    isMember.value = false
  } catch (error) {
    Pop.error(error)
    logger.log(error)
  }
}


let event = computed(() => AppState.activeEvent)
let account = computed(() => AppState.account)
let movie = computed(() => AppState.activeEventMovie)
let group = computed(() => AppState.activeGroup)
let members = computed(() => AppState.activeEventMembers)
async function addMyselfToEvent() {
  try {
    await eventsService.addMyselfToEvent(route.params.id)
    isMember.value = true
  } catch (error) {
    Pop.error(error)
    logger.log(error)
  }
}

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

.img-style {
  height: 20vh;
  width: 40%;
  object-fit: cover;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}
</style>