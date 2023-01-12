<template>
  <div class="homePage">

    <div class="movies">
      <MovieCard :movie="m" v-for="m in movies" />
    </div>

    <div class="myStuff">

      <div class="groups">
        <h1 class="scrollCard">My Guilds</h1>
        <div class="banner">
          <button data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" class="createButton">Form Guild</button>
          <div v-if="myGroups" class="groupsContainer">
            <GroupCard :group="g.group" v-for="g in myGroups" />
          </div>
        </div>
      </div>

      <div class="events">
        <h1 class="scrollCard">My Events</h1>
        <div class="banner">
          <div class="eventsContainer">
            <EventCard :event="e.event" v-for="e in myEvents" />
          </div>

        </div>
      </div>
    </div>


  </div>
</template>

<script setup>
import { AppState } from "../AppState.js";
import { computed, onMounted, ref } from 'vue';
import Pop from "../utils/Pop.js";
import { logger } from "../utils/Logger.js";
import { moviesService } from "../services/MoviesService.js";
import MovieCard from "../components/MovieCard.vue";
import { groupsService } from "../services/GroupsService.js";
import { useRouter } from "vue-router";
import GroupCard from "../components/GroupCard.vue";

const editable = ref({});
const router = useRouter();
let movies = computed(() => AppState.searchMovies)
let myGroups = computed(() => AppState.myGroups)
let myEvents = computed(() => AppState.myEvents)


onMounted(async () => {
  await getMovies();
});

async function getMovies() {
  try {
    await moviesService.getMovies();
  }
  catch (error) {
    Pop.error(error);
    logger.log(error);
  }
}

async function createGroup() {
  try {
    await groupsService.createGroup(editable.value);
    router.push({ name: "Group", params: { id: group.id } });
  }
  catch (error) {
    Pop.error(error);
    logger.log(error);
  }
}

</script>

<style scoped lang="scss">
.homePage {
  display: flex;
  justify-content: space-between;
  background-image: url("https://i.pinimg.com/originals/9a/d3/ec/9ad3ec7a8be2cbd9d1bc3cf8054c7e30.jpg");
  background-color: rgba(0, 0, 0, 0.821);
  background-blend-mode: color;

}

.movies {
  flex-basis: 75vw;
  padding: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
}

.myStuff {
  flex-basis: 25vw;
  padding: .25rem;
  display: flex;
  flex-direction: column;
  gap: .25rem;
  max-width: 30vw;

}

.groupsContainer {

  padding-top: 1rem;
  padding-bottom: 1rem;
  display: flex;
  padding-left: 5rem;
  padding-right: 5rem;
  flex-direction: column;
  gap: 1rem;
  align-items: center;


}

.eventsContainer {

  padding-top: 4rem;
  padding-bottom: 1rem;
  padding-left: 5rem;
  padding-right: 5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
}

.banner {
  background-image: url("../assets/img/bannerflaggood-removebg-preview.png");
  background-size: 100%;
  background-repeat: no-repeat;
  text-align: center;
  min-height: 10rem;
}

.scrollCard {
  background-image: url("../assets/img/scrollsmall-removebg-preview.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
  text-align: center;
  height: 5rem;
  margin-bottom: -1rem;
  color: black;
  font-family: 'MedievalSharp', cursive;
  font-weight: bold;
  padding-top: .25rem;


}

.createButton {
  background-image: url("../assets/img/goodbutton-removebg-preview.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
  text-align: center;
  height: 3rem;
  width: 14rem;
  border: none;
  color: black;
  font-size: 1.5rem;
  font-weight: bold;
  background-color: transparent;
  margin-top: -.15rem;
  font-family: 'MedievalSharp', cursive;
}
</style>
