<template>
  <div class="eventPage">
    <section class="leftSection">
      <img :src="event?.coverImg" alt="" class="eventImage" />

      <button v-if="!isMember" class="niceButton" @click="joinEvent">Join Event </button>
      <button v-else class="niceButton" @click="leaveEvent">Leave Event</button>

      <div class="eventDetails">
        <p>Description: {{ event?.description }}</p>
        <p>Location: {{ event?.location }}</p>
        <p>Date: {{ event?.startTime }}</p>
        <p>Capacity: {{ event?.capacity }}</p>
        <p v-if="event?.items">Items: {{ event?.items }}</p>
      </div>

      <div class="membersSection">
        <h1 class="infoBadge">Members</h1>
        <div class="members banner">
          <img v-for="member in members" :src="member?.account?.picture" alt="NO Picture" class="memberPicture" />
        </div>

      </div>
    </section>

    <div class="middleSection">
      <h1 class="title">{{ event?.title }}</h1>
      <div class="moviesHeader">
        <h1 class="infoBadge">Movies</h1>
        <select v-model="newMovie" name="addMovieSelect">
          <option v-for="movie in groupMovies" :value="movie.movie.title">{{ movie.movie.title }}</option>
        </select>
        <button @click="addMovie" class="niceButton">Add Movie</button>
      </div>
      <div class="movies">
        <MovieCard :movie="m.movie" v-for="m in movies" />
      </div>
    </div>

    <div class="rightSection">
      <section class="commentsSection">
        <h1 class="infoBadge">Comments</h1>
        <div class="commentBorder">

          <div class="comments">
            <CommentCard :comment="c" v-for="c in comments" />
          </div>
          <form @submit.prevent="postComment" class="commentForm">
            <input v-model="comment.body" class="form-control" type="text" placeholder="comment here...">
            <button class="btn btn-dark"><i class="mdi mdi-script-text"></i></button>
          </form>
        </div>

      </section>

      <section class="itemsSection">
        <h1 class="infoBadge">Items</h1>
        <div class="items">
          <!-- <ItemCard :item="i" v-for="i in items" /> -->
        </div>
      </section>
    </div>
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
const comment = ref({})
onMounted(async () => {
  await getEvent()
  await getMovies()
  await getComments()
  await getMembers()
  await getGroup()
  await getItems()
  await getGroupMovies()
})

const newMovie = ref('')
const isMember = ref(false)
let account = computed(() => AppState.account)
let event = computed(() => AppState.activeEvent)
let movies = computed(() => AppState.activeEventMovies)
let groupMovies = computed(() => AppState.activeGroupMovies)
let comments = computed(() => AppState.activeEventComments)
let items = computed(() => AppState.activeEventItems)
let members = computed(() => AppState.activeEventMembers)

async function addMovie() {
  try {
    let movie = AppState.activeGroupMovies.find(m => m.movie.title == newMovie.value)
    await eventsService.addMovieToEvent(route.params.id, movie.movie)
  } catch (error) {
    Pop.error(error)
    logger.log(error)
  }
}
async function getComments() {
  try {
    await eventsService.getCommentsByEventId(route.params.id)
  } catch (error) {
    Pop.error(error)
    logger.log(error)
  }
}
async function postComment() {
  try {
    await eventsService.postCommentToEvent(route.params.id, comment.value)
    comment.value = {}
  } catch (error) {
    Pop.error(error)
    logger.log(error)
  }
}
async function getEvent() {
  try {
    await eventsService.getEventById(route.params.id)
  } catch (error) {
    Pop.error(error)
    logger.log(error)
  }
}
async function getMembers() {
  try {
    await eventsService.getMembersByEventId(route.params.id)
    if (AppState.activeEventMembers.find(m => m.accountId == AppState.account.id)) {
      isMember.value = true
    }
    console.log("AGGHH!", AppState.activeEventMembers)
  } catch (error) {
    Pop.error(error)
    logger.log(error)
  }
}
async function getMovies() {
  try {
    await eventsService.getMoviesByEventId(route.params.id)
  } catch (error) {
    Pop.error(error)
    logger.log(error)
  }
}
async function getGroup() {
  try {
    await groupsService.getGroupByGroupId(AppState.activeEvent.groupId)
  } catch (error) {
    Pop.error(error)
    logger.log(error)
  }
}
async function getGroupMovies() {
  try {
    await groupsService.getMoviesByGroupId(AppState.activeEvent.groupId)
  } catch (error) {
    Pop.error(error)
    logger.log(error)
  }
}
async function getItems() {
  try {
    await eventsService.getItemsByEventId(route.params.id)
  } catch (error) {
    Pop.error(error)
    logger.log(error)
  }
}
async function leaveEvent() {
  try {
    await eventsService.removeMemberFromEvent(route.params.id, AppState.account.id)
    isMember.value = false
    Pop.success("Left Event")
  } catch (error) {
    Pop.error("Error Leaving Event")
    logger.log(error)
  }
}
async function joinEvent() {
  try {
    await eventsService.addMemberToEvent(route.params.id, AppState.account.id)
    isMember.value = true
    Pop.success("Joined Event")
  } catch (error) {
    Pop.error(error)
    logger.log(error)
  }
}



</script>


<style lang="scss" scoped>
.eventPage {
  display: flex;
  padding: 1rem;
  gap: 1rem;
  background-image: url("https://img.freepik.com/premium-photo/stone-interior-ancient-armenian-church-highlands-dark-hall-rays-from-window_604704-26.jpg?w=1380");
  background-size: cover;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-color: rgba(0, 0, 0, 0.734);
  background-blend-mode: color;
}

.leftSection {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 23vw;
  overflow-x: hidden;

}

.middleSection {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  flex-grow: 1;
}

.rightSection {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
}

.eventDetails {
  padding: 1rem;
  font-size: 1.5rem;
  font-weight: normal;
  color: white;
  padding-left: 4rem;
  padding-right: 4rem;
  margin-right: -1rem;
  margin-left: -1rem;
  padding-top: 3rem;
  background-image: url("../assets/img/bannerflaggood-removebg-preview.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-size: 100%;
  word-break: break-all;

  min-height: 20rem;

  // text-shadow: 0 0 10px black;
}

.moviesHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.eventImage {
  width: 100%;
  height: 300px;
  object-fit: cover;
  border: 2px solid goldenrod
}

.niceButton {
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
  text-align: center;
}

.title {
  background-image: url("../assets/img/scrollsmall-removebg-preview.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% 100%;
  color: black;
  font-weight: bold;
  font-size: 4rem;
  padding-left: 5rem;
  padding-right: 5rem;
  padding-top: 1rem;
  padding-bottom: 3rem;
  font-family: 'MedievalSharp', cursive;


  text-align: center;
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

.commentForm {
  display: flex;
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

.commentBorder {
  border: 3px solid goldenrod;
  background-color: rgba(0, 0, 0, 0.623);
  color: white;
  padding: 1rem;

}

.commentsSection {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.comments {
  display: flex;
  flex-direction: column-reverse;
  gap: 1rem;
}

.movies {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.members {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
}

.memberPicture {
  width: 5rem;
  height: 5rem;
  object-fit: cover;
  border-radius: 50%;
  border: 3px solid goldenrod;
}
</style>