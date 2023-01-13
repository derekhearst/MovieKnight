<template>
  <div class="eventPage">
    <section class="leftSection">

      <button v-if="!isMember" class="button" @click="joinEvent">Join Event </button>
      <button v-else class="button" @click="leaveEvent">Leave Event</button>

      <img :src="event?.coverImg" alt="" class="eventImage" />
      <div class="desc banner">
        <p>Description: {{ event?.description }}</p>
        <p>Location: {{ event?.location }}</p>
        <p>Date: {{ event?.startTime }}</p>
        <p>Capacity: {{ event?.capacity }}</p>
        <p v-if="event?.items">Items: {{ event?.items }}</p>
      </div>

      <h1 class="badge">Members</h1>
      <div class="members banner">
        <router-link v-for="member in members" :to="{ name: 'Profile', params: { id: member.accountId } }">
          <img :src="member?.account?.picture" :title="member?.account?.name" alt="NO Picture" class="memberPicture" />
        </router-link>
      </div>
    </section>

    <div class="middleSection">
      <h1 class="scrollTitle">{{ event?.title }}</h1>
      <div class="badge me-3">Movies</div>
      <button @click="addMovie" class="button">Add Movie</button>
      <div class="movies">
        <div v-for="m in movies" class="movie">
          <i class="mdi mdi-trash-can" @click="removeMovie(m.id)"></i>
          <MovieCard :movie="m.movie" />
        </div>
      </div>

      <div class="badge">Comments</div>
      <div class="commentBorder">

        <div class="comments">
          <CommentCard :comment="c" v-for="c in comments" />
        </div>
        <form @submit.prevent="postComment" class="commentForm">
          <input v-model="comment.body" class="form-control" type="text" placeholder="comment here...">
          <button class="btn btn-dark"><i class="mdi mdi-script-text"></i></button>
        </form>
      </div>


    </div>

    <div class="rightSection">
      <h1 class="badge">Items</h1>
      <div class="items banner">
        <button class="button" @click="addItem" id="addItem">Add item</button>
        <div v-for="item in items" class="item">
          <img :src="item?.creator?.picture" :title="item?.creator?.name" />
          <i class="mdi mdi-arrow-right"></i>
          <p>{{ item?.item }}</p>
          <i class="mdi mdi-trash-can" v-if="item?.creator?.id == account.id" @click="removeItem(item?.id)"></i>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, watchEffect, ref } from 'vue';
import Pop from "../utils/Pop.js";
import { logger } from "../utils/Logger.js";
import { eventsService } from "../services/EventsService.js";
import { onBeforeRouteLeave, useRoute } from "vue-router";
import { groupsService } from "../services/GroupsService.js";
import GroupCard from "../components/GroupCard.vue";
import Swal from 'sweetalert2';
import { EventsHandler } from '../handlers/EventsHandler.js';

const route = useRoute()
const comment = ref({})
onMounted(async () => {
  EventsHandler.EnterEvent(route.params.id)
  await getEvent()
  await getMovies()
  await getComments()
  await getMembers()
  await getGroup()
  await getItems()
  await getGroupMovies()
})
onBeforeRouteLeave(() => {
  EventsHandler.LeaveEvent(route.params.id)
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
  await Swal.fire({
    title: 'Add Movie',
    input: 'select',
    inputOptions: groupMovies.value.map(m => {
      return m.movie.title
    }),
    inputPlaceholder: 'Select a movie',
    showCancelButton: true,
    inputValidator: (value) => {
      if (!value) {
        return 'You need to select a movie!'
      }
    }
  }).then(async (result) => {
    if (result.isConfirmed) {
      let movie = groupMovies.value[result.value]
      await eventsService.addMovieToEvent(route.params.id, movie.movie)
    }
  })
}
async function removeMovie(movieId) {
  try {
    let res = await Pop.confirm('Are you sure you want to remove this movie?', 'Remove Movie', 'Yes, remove it!', "question")
    if (res) {
      await eventsService.removeMovieFromEvent(route.params.id, movieId)
    }
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
async function addItem() {
  await Swal.fire({
    title: 'Add Item',
    input: 'text',
    // inputLabel: 'Item Name',
    inputPlaceholder: 'Enter Item Name',
    showCancelButton: true,
    inputValidator: (value) => {
      if (!value) {
        return 'You need to write something!'
      }
    }
  }).then(async (result) => {
    if (result.isConfirmed) {
      await eventsService.addItemToEvent(route.params.id, result.value)
      Pop.success("Item Added")
    }
  })
}
async function removeItem(itemId) {
  let conf = await Pop.confirm("Are you sure you want to remove that item?", "Remove Item", "Yes, Remove", "question")
  if (conf) {
    await eventsService.removeItemFromEvent(route.params.id, itemId)
    Pop.success("Item Removed")
  }
}


</script>


<style lang="scss" scoped>
.eventPage {
  display: flex;
  padding: 1rem;
  flex-wrap: wrap;
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
  flex: 0 1 20vw;
  width: clamp(100px, 20vw, 500px);
  align-items: center;


  .eventImage {
    width: 300px;
    height: 300px;
    object-fit: cover;
    border: 2px solid goldenrod
  }

  .desc {
    font-size: 1.5rem;
    font-weight: normal;
    color: white;
    padding: 1rem;
    display: flex;


  }

  .members {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: center;
    padding: 1rem;
    gap: 1rem;


    img {
      width: 75px;
      height: 75px;
      object-fit: cover;
      border-radius: 50%;
      border: 2px solid goldenrod;
    }
  }
}

.middleSection {
  display: flex;
  flex-wrap: wrap;
  gap: .25rem;
  flex: 1 1 50vw;
  width: clamp(100px, 50vw, 1000px);

  align-items: center;
  align-content: flex-start;
  justify-content: center;


  .scrollTitle {
    font-size: 4rem;
    width: 100%;
    height: min-content;
  }

  .commentBorder {
    border: 3px solid goldenrod;
    background-color: rgba(0, 0, 0, 0.623);
    color: white;
    padding: 1rem;
    width: 100%;
  }

  .commentForm {
    display: flex;
    align-items: center;
    flex-wrap: wrap;

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

  .comments {
    display: flex;
    flex-direction: column-reverse;
    gap: 1rem;
    max-height: 50vh;
    overflow-y: auto;
    padding: 1rem;
  }



  .movies {
    display: flex;
    gap: 1rem;
    overflow-x: scroll;
    padding: 1rem;
    border: 2px solid goldenrod;
    width: 100%;

  }

  .movie {
    position: relative;
    display: flex;

    i {
      position: absolute;
      top: 0;
      right: 0;
      font-size: 2.5rem;
      color: maroon;
      cursor: pointer;
    }
  }




}

.rightSection {
  display: flex;
  flex-direction: column;
  flex: 0 1 auto;
  align-items: center;
  gap: 1rem;



  .items {
    button {
      align-self: center;
      margin-top: -2.5rem;
      margin-bottom: -.5rem;
    }

    display: flex;
    flex-direction: column;
    padding: 1rem;
    gap: 1rem;
  }

  .item {
    display: flex;
    align-items: center;
    gap: 1rem;
    font-size: 1.5rem;
    color: white;

    img {
      width: 3rem;
      height: 3rem;
      object-fit: cover;
      border-radius: 50%;
      border: 3px solid goldenrod;
    }

    p {
      margin: 0;
      font-family: 'MedievalSharp', cursive;
      color: white;
      font-weight: bold;
    }

    .mdi-trash-can {
      cursor: pointer;
      color: goldenrod;
    }
  }

}

@media (max-width:1000px) {
  .eventPage {
    flex-direction: column;
    align-items: center;
  }

  .leftSection {
    width: 100%;
    flex-direction: column;
    justify-content: center;
    order: 1;
  }

  .middleSection {
    width: 100%;
    order: 0;
  }

  .rightSection {
    width: 100%;
  }

}
</style>