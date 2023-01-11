<template>
  <div class="groupPage">
    <div class="groupInfo">
      <img :src="group?.coverImg" class="groupPicture" />

      <h1 class="guildInfo">Guild Info</h1>
      <p class="groupDesc">{{ group?.description }}</p>

    </div>


    <div class="middleSection">
      <h1 class="title">{{ group?.title }}</h1>
      <button v-if="isMember">
        Join Guild
      </button>


      <section class="commentsSection">

        <div class="comments">
          <CommentCard :comment="c" v-for="c in comments" />
        </div>

        <form @submit.prevent="postComment">
          <div class="d-flex">
            <input v-model="editable.body" class="form-control" type="text" placeholder="comment here...">
            <button class="btn btn-dark"><i class="mdi mdi-send fs-3"></i></button>
          </div>
        </form>
      </section>

      <section class="moviesSection">
        <div class="movies">
          <MovieCard :movie="m.movie" v-for="m in groupMovies" />
        </div>
      </section>

    </div>

    <section class="eventSection">
      <h1>Guild Events</h1>
      <button data-bs-toggle="offcanvas" data-bs-target="#event">
        <i class="mdi mdi-shield"></i>
        <strong>New Guild Event</strong>
        <i class="mdi mdi-shield"></i>
      </button>

      <div class="events" v-if="groupEvents">
        <EventCard :event="e" v-for="e in groupEvents" />
      </div>
    </section>


  </div>
</template>


<script setup>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref } from 'vue';
import { useRoute } from "vue-router";
import Pop from "../utils/Pop.js";
import { logger } from "../utils/Logger.js";
import { groupsService } from "../services/GroupsService.js";
import CommentCard from "../components/CommentCard.vue";
import EventCard from "../components/EventCard.vue";
import { eventsService } from "../services/EventsService.js";
import MovieCard from "../components/MovieCard.vue";

const editable = ref({})
const route = useRoute()
let groupEvents = computed(() => AppState.activeGroupEvents)
let comments = computed(() => AppState.activeComments)
let group = computed(() => AppState.activeGroup)
let groupMovies = computed(() => AppState.groupMovies)
let isMember = ref(false)

onMounted(() => {
  getGroupById()
  getMoviesByGroupId()
  getCommentsByGroupId()
  getEventsByGroupId()

})
async function getGroupById() {
  try {
    await groupsService.getGroupById(route.params.id)
  } catch (error) {
    Pop.error(error)
    logger.log(error)
  }
}
async function getEventsByGroupId() {
  try {
    await eventsService.getEventsByGroupId(route.params.id)
  } catch (error) {
    Pop.error(error)
    logger.log(error)
  }
}
async function getCommentsByGroupId() {
  try {
    await groupsService.getCommentsByGroupId(route.params.id)
  } catch (error) {
    Pop.error(error)
    logger.log(error)
  }
}
async function getMoviesByGroupId() {
  try {
    await groupsService.getMoviesByGroupId(route.params.id)
  } catch (error) {
    Pop.error(error)
    logger.log(error)
  }
}
async function getGroupMembers() {
  try {
    await groupsService.getGroupMembers(route.params.id)
  } catch (error) {
    Pop.error(error)
    logger.log(error)
  }
}


async function addMyselfToGroup() {
  try {
    await groupsService.addMyselfToGroup(route.params.id)
  } catch (error) {
    Pop.error(error)
    logger.log(error)
  }
}
async function postComment() {
  try {
    await groupsService.postComment(route.params.id, editable.value)
    editable.value = {}
  } catch (error) {
    Pop.error(error)
    logger.log(error)
  }
}


</script>


<style lang="scss" scoped>
.groupPage {
  position: relative;
  min-height: 100vh;
  display: flex;
  padding: 2rem;
  align-items: flex-start;
  gap: 1rem;
  flex-wrap: wrap;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-color: rgba(0, 0, 0, 0.812);
  background-blend-mode: overlay;
  background-image: url("https://cdnb.artstation.com/p/assets/images/images/014/833/597/large/jeon-hyun-ho-26.jpg?1545797700");
}

.groupInfo {
  display: flex;
  flex-direction: column;

  // border: 2px solid goldenrod;
  box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.5);
  background-color: rgba(0, 0, 0, 0.5);

}

.groupPicture {
  width: 400px;
  height: 400px;
  object-fit: cover;
  object-position: center;
  margin-bottom: 1rem;
  border: 2px solid goldenrod;
}

.guildInfo {
  text-align: center;
  background-image: url("../assets/img/buttondots-removebg-preview.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 20rem;
  height: 6rem;
  font-weight: bold;
  color: black;
  font-family: 'MedievalSharp', cursive;
  align-self: center;
}

.groupDesc {
  padding: 1rem;
  font-size: 1.5rem;
  font-weight: normal;
  color: white;
  padding-left: 3.5rem;
  padding-right: 3.5rem;
  background-image: url("../assets/img/bannerflaggood-removebg-preview.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  min-height: 20rem;

  // text-shadow: 0 0 10px black;
}

.middleSection {
  display: flex;
  flex-direction: column;

  flex: 1 0 auto;
}

.title {
  background-image: url("../assets/img/scrollsmall-removebg-preview.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% 100%;
  color: black;
  font-weight: bold;
  font-size: 5rem;
  padding-left: 4rem;
  padding-right: 4rem;
  padding-top: 0rem;
  padding-bottom: 3rem;
  font-family: 'MedievalSharp', cursive;
  margin-top: -2rem;

  text-align: center;
}

.joinButtons {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.shieldButton {
  background-image: url("../assets/img/sheildbutton.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% 100%;
  font-size: 2.7rem;
  height: 5rem;
  width: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: .8rem;
  color: black;

}

.movies {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}
</style>