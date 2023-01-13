<template>
  <div class="groupPage">
    <div class="infoSection">
      <button v-if="!isMember && account.id != group.creatorId" @click="joinGroup" class="button">
        Join Guild
      </button>
      <button v-else-if="account.id != group.creatorId" @click="leaveGroup" class="button">
        Leave Guild
      </button>
      <button class="button" v-if="account.id == group.creatorId" @click="archiveGroup">Archive Group</button>
      <img :src="group?.coverImg" class="groupPicture" />
      <div class="badge">Guild Info</div>

      <div class="banner">
        <p class="groupDesc">{{ group?.description }}</p>
      </div>
      <div class="badge">Members</div>
      <div class="members">
        <img :src="m.account?.picture" class="memberPicture" :title="m.account?.name" v-for="m in groupMembers" />
      </div>

    </div>


    <div class="mainSection">
      <h1 class="scrollTitle">{{ group?.title }}</h1>

      <div class="badge">Guild Movies</div>
      <div class="movies">
        <MovieCard :movie="m.movie" v-for="m in groupMovies" />
      </div>

      <div class="badge">Guild Chat</div>
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
    </div>

    <section class="eventSection">
      <div class="badge">Guild Events</div>
      <div class="banner">
        <button class="button" data-bs-toggle="offcanvas" data-bs-target="#event">
          New Guild Event
        </button>
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
let groupMembers = computed(() => AppState.activeGroupMembers)
let group = computed(() => AppState.activeGroup)
let groupMovies = computed(() => AppState.activeGroupMovies)
let comments = computed(() => AppState.activeGroupComments)
let groupEvents = computed(() => AppState.activeGroupEvents)
let account = computed(() => AppState.account)
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
    if (AppState.activeGroupMembers.find(m => m.accountId == AppState.account.id)) {
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
    let res = await Pop.confirm("Are you sure you want to leave this group?", "", "Yes", "warning")
    if (res) {
      await groupsService.removeMyselfFromGroup(route.params.id)
    }
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
async function archiveGroup() {
  try {
    let res = await Pop.confirm("Are you sure you want to archive this group?", "Archive Group", "Yes", "warning")
    if (res) {
      await groupsService.archiveGroup(route.params.id)
    }
  } catch (error) {
    Pop.error(error)
    logger.log(error)
  }
}
</script>


<style lang="scss" scoped>
.groupPage {
  display: flex;
  padding: 1rem;
  padding-top: .5rem;
  gap: 1rem;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-color: rgba(0, 0, 0, 0.812);
  background-blend-mode: overlay;
  background-image: url("https://cdnb.artstation.com/p/assets/images/images/014/833/597/large/jeon-hyun-ho-26.jpg?1545797700");
}

.infoSection {
  width: clamp(30ch, 20vw, 100vw);
  display: flex;
  flex-direction: column;
  align-items: center;



  .groupPicture {
    width: 300px;
    height: 300px;
    object-fit: cover;
    border: 2px solid goldenrod;
  }

  .members {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    gap: 1rem;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 1rem;
  }

  .memberPicture {
    width: 75px;
    height: 75px;
    object-fit: cover;
    border: 2px solid goldenrod;
  }



  .groupDesc {
    padding: 1rem;
    font-size: 1.5rem;
    color: white;
  }

}



.mainSection {
  display: flex;
  flex-direction: column;
  flex: 1 1 60vw;
  gap: 1rem;


  .movies {
    display: flex;
    gap: 1rem;
    width: 60vw;
    overflow-x: auto;
    backdrop-filter: blur(10px);
    border: 1px solid goldenrod;
    padding: .5rem;
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
}

.eventSection {
  flex: 1 1 20vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: .5rem;



  button {
    align-self: center;
    margin-top: -1rem;
  }

  .events {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: .5rem;
    padding-top: .25rem;
  }
}
</style>