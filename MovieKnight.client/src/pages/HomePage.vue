<template>
  <div class="homePage">

    <div class="movies">
      <MovieCard :movie="m" v-for="m in movies" />
    </div>

    <div class="myStuff">

      <div class="groups">
        <h1 class="scrollTitle">My Guilds</h1>
        <div class="banner">
          <button data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" id="formGuild" class="button">Form
            Guild</button>
          <div v-if="myGroups" class="groupsContainer">
            <GroupCard :group="g.group" v-for="g in myGroups" />
          </div>
        </div>
      </div>

      <div class="events">
        <h1 class="scrollTitle">My Events</h1>
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
import { computed, onMounted, ref, watchEffect } from 'vue';
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
watchEffect(()=>{
  AppState.myGroups
})

async function getMovies() {
  try {
    await moviesService.getMovies();
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

#formGuild {
  align-self: center;
  margin-top: -1rem;
}



.movies {
  flex-basis: 75vw;
  padding: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.myStuff {
  flex-basis: 25vw;
  padding: .25rem;
  display: flex;
  flex-direction: column;
  gap: .25rem;
}

.groupsContainer {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  padding: 1rem
}

.eventsContainer {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
}


@media (max-width: 515px) {
  .homePage {
    flex-direction: column-reverse;
  }

  .movies {
    justify-content: center;
  }

  .myStuff {

    flex-direction: column;

  }



}
</style>
