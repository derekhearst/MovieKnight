<template>
  <div class="homePage">

    <!-- SECTION movies -->
    <div class="movies">
      <MovieCard :movie="m" v-for="m in movies" />
    </div>

    <!-- SECTION groups and events -->
    <div class="info">

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


        </div>
      </div>
    </div>


  </div>
</template>

<script>
import { AppState } from "../AppState.js";
import { computed, reactive, onMounted, ref } from 'vue';
import Pop from "../utils/Pop.js";
import { logger } from "../utils/Logger.js";
import { moviesService } from "../services/MoviesService.js";
import MovieCard from "../components/MovieCard.vue";
import { groupsService } from "../services/GroupsService.js";
import { useRouter } from "vue-router";
import GroupCard from "../components/GroupCard.vue";


export default {
  setup() {
    const editable = ref({});
    const router = useRouter();
    onMounted(() => {
      getMovies();
      // getMyGroups()
    });
    // async function getMyGroups(){
    //   try {
    //     await groupsService.getMyGroups()
    //   } catch (error) {
    //     Pop.error(error)
    //     logger.log(error)
    //   }
    // }
    async function getMovies() {
      try {
        await moviesService.getMovies();
      }
      catch (error) {
        Pop.error(error);
        logger.log(error);
      }
    }
    return {
      movies: computed(() => AppState.movies),
      myGroups: computed(() => AppState.myGroups),
      account: computed(() => AppState.account),
      async createGroup() {
        try {
          await groupsService.createGroup(editable.value);
          router.push({ name: "Group", params: { id: group.id } });
        }
        catch (error) {
          Pop.error(error);
          logger.log(error);
        }
      }
    };
  },
  // components: { GroupCard }
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

.info {
  flex-basis: 25vw;
  padding: .25rem;
  display: flex;
  flex-direction: column;
  gap: .25rem;

}

.groupsContainer {
  padding-top: 1rem;
  padding-bottom: 1rem;
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
