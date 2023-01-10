<template>
  <div class="groupPage">
    <img class="coverImg" :src="group?.coverImg">

    <h1 class="title">{{ group?.title }}</h1>

    <div class="bg-dark my-2 rounded p-2">
      <h2>Description:</h2>
      <h4>{{ group?.description }}</h4>
    </div>


    <i @click="addMyselfToGroup" class="mdi mdi-account-plus fs-2 text-white selectable px-3"></i>

    <i @click="removeMyselfFromGroup" class="mdi mdi-account-minus fs-2 text-white selectable px-3"></i>

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


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref } from 'vue';
import { useRoute } from "vue-router";
import Pop from "../utils/Pop.js";
import { logger } from "../utils/Logger.js";
import { groupsService } from "../services/GroupsService.js";
import CommentCard from "../components/CommentCard.vue";
import EventCard from "../components/EventCard.vue";
import { eventsService } from "../services/EventsService.js";

export default {
  setup() {
    const editable = ref({})
    const route = useRoute()
    onMounted(() => {
      getGroupById()
      getMoviesByGroupId()
      getCommentsByGroupId()
      getEventsByGroupId()
    })
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
    async function getGroupById() {
      try {
        await groupsService.getGroupById(route.params.id)
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
    return {
      async addMyselfToGroup() {
        try {
          await groupsService.addMyselfToGroup(route.params.id)
        } catch (error) {
          Pop.error(error)
          logger.log(error)
        }
      },
      groupEvents: computed(() => AppState.activeGroupEvents),
      comments: computed(() => AppState.activeComments),
      editable,
      group: computed(() => AppState.activeGroup),
      groupMovies: computed(() => AppState.groupMovies),
      async postComment() {
        try {
          await groupsService.postComment(route.params.id, editable.value)
          editable.value = {}
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
.groupPage {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;

}

.coverImg {
  position: absolute;
  width: 100%;
  height: 100%;
  filter: brightness(.2);
}

.title {
  background-image: url("../assets/img/scrollsmall-removebg-preview.png");
}
</style>