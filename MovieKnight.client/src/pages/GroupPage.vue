<template>
  <div class="groupPage">
    <div class="groupInfo">
      <button v-if="isMember" @click="joinGroup" class="joinLeaveButton">
        Join Guild
      </button>
      <button v-else @click="leaveGroup" class="joinLeaveButton">
        Leave Guild
      </button>
      <img :src="group?.coverImg" class="groupPicture" />


      <h1 class="infoBadge">Guild Info</h1>
      <p class="groupDesc">{{ group?.description }}</p>

    </div>


    <div class="middleSection">
      <h1 class="title">{{ group?.title }}</h1>

      <section class="moviesSection">
        <h4 class="infoBadge">Guild Movies</h4>

        <div class="movies">
          <MovieCard :movie="m.movie" v-for="m in groupMovies" />
        </div>
      </section>

      <section class="commentsSection">

        <h4 class="infoBadge">Guild Chat</h4>
        <div class="commentBorder">


          <div class="comments">
            <CommentCard :comment="c" v-for="c in comments" />
          </div>

          <form @submit.prevent="postComment">
            <div class="commentForm">
              <input v-model="editable.body" class="" type="text" placeholder="comment here...">
              <button class=""><i class="mdi mdi-script-text"></i></button>
            </div>
          </form>
        </div>
      </section>
    </div>

    <section class="eventSection">
      <h1 class="infoBadge">Guild Events</h1>
      <button class="joinLeaveButton" data-bs-toggle="offcanvas" data-bs-target="#event">
        New Guild Event
      </button>
      <div class="banner">

        <div class="events" v-if="groupEvents">
          <EventCard :event="e" v-for="e in groupEvents" />
        </div>
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
let groupMembers = computed(()=> AppState.activeGroupMembers)
let group = computed(() => AppState.activeGroup)
let groupMovies = computed(() => AppState.activeGroupMovies)
let comments = computed(() => AppState.activeGroupComments)
let groupEvents = computed(() => AppState.activeGroupEvents)
let isMember = ref(false)

onMounted(() => {
  getGroup()
  getGroupMovies()
  getGroupComments()
  getGroupEvents()
  getGroupMembers()
})
async function getGroup() {
  try {
    await groupsService.getGroupById(route.params.id)
  } catch (error) {
    Pop.error(error)
    logger.log(error)
  }
}
async function getGroupEvents() {
  try {
    await eventsService.getEventsByGroupId(route.params.id)
  } catch (error) {
    Pop.error(error)
    logger.log(error)
  }
}
async function getGroupComments() {
  try {
    await groupsService.getCommentsByGroupId(route.params.id)
  } catch (error) {
    Pop.error(error)
    logger.log(error)
  }
}
async function getGroupMovies() {
  try {
    await groupsService.getMoviesByGroupId(route.params.id)
  } catch (error) {
    Pop.error(error)
    logger.log(error)
  }
}
async function getGroupMembers() {
  try {
    await groupsService.getGroupMembersByGroupId(route.params.id)
    if (AppState.activeGroupMembers.find(m => m.id == AppState.account.id)) {
      isMember.value = true
    }
  } catch (error) {
    Pop.error(error)
    logger.log(error)
  }
}
async function joinGroup() {
  try {
    await groupsService.addMyselfToGroup(route.params.id)
    isMember.value = true
  } catch (error) {
    Pop.error(error)
    logger.log(error)
  }
}
async function leaveGroup() {
  try {
    await groupsService.removeMyselfFromGroup(route.params.id)
    isMember.value = false
  } catch (error) {
    Pop.error(error)
    logger.log(error)
  }

}
async function postComment() {
  try {
    await groupsService.postGroupComment(route.params.id, editable.value)
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
  max-width: 100vw;
  overflow-x: hidden;
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
  width: 300px;
  height: 300px;
  object-fit: cover;
  object-position: center;
  margin-bottom: 1rem;
  border: 2px solid goldenrod;
}

.infoBadge {
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
  max-width: 20rem;

  // text-shadow: 0 0 10px black;
}

.middleSection {
  display: flex;
  flex-direction: column;
  flex: 1 1 50vw;
  max-width: 60vw;

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

.joinLeaveButton {
  background-image: url("../assets/img/goodbutton-removebg-preview.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% 100%;
  color: black;
  background-color: transparent;
  border: none;
  font-size: 2rem;
  font-weight: bold;
  font-family: 'MedievalSharp', cursive;
  padding: 1rem;
  margin-top: -1rem;
  margin-bottom: 1rem;

}

.moviesSection {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 3rem;
}

.movies {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  overflow-y: auto;
  max-height: 30rem;
  backdrop-filter: blur(10px);
  border: 1px solid goldenrod;
  padding: .5rem;
  justify-content: center;
}

.commentBorder {
  border: 1px solid goldenrod;
  padding: .5rem;
  backdrop-filter: blur(10px);

}

.comments {
  display: flex;
  flex-direction: column-reverse;
  gap: 1rem;
  padding: .25rem;
  max-height: 30rem;
  overflow-y: auto;

}

.commentForm {
  display: flex;
  margin-top: 2rem;
  align-items: center;

  input {
    flex: 1 0 10rem;
    margin-right: 1rem;
    border: 3px solid goldenrod;
    font-size: 1.5rem;
    padding: .5rem;
    background-color: rgba(0, 0, 0, 0.623);
    color: white;
  }

  button {
    border: none;
    background-color: transparent;
    color: goldenrod;
    font-size: 3rem;
  }
}

.eventSection {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  max-width: 30vw;
}

.events {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 30rem;
}

.banner {
  background-image: url("../assets/img/bannerflaggood-removebg-preview.png");
  background-size: 100%;
  background-repeat: no-repeat;
  text-align: center;
  min-height: 10rem;
  padding-top: 3rem;
  padding-bottom: 3rem;
  padding-left: 5rem;
  padding-right: 5rem;
}
</style>