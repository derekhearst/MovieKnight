<template>
  <div class="container-fluid">
    <section class="row justify-content-evenly mt-3">
      <!-- SECTION movies -->
      <div class="col-8 p-1">
        <section class="row justify-content-evenly p-1">
          <!-- TODO v-for over this col-3 -->
          <div class="col-3 p-3" v-for="m in movies">
            <MovieCard :movie="m"/>
          </div>
        </section>
      </div>
      <!-- SECTION groups and events -->
      <div class="col-3 border-style">
        <!-- SECTION groups -->
        <section class="row justify-content-center">
          <div class="col-10 d-flex justify-content-between">
            <h1 class="fw-bold">My Guilds</h1>
            <!-- TODO offcanvas form -->
            <button v-if="account.id != null" class="btn maroon fw-bold fs-4"  type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">Form Guild</button>
          </div>
          <div v-if="myGroups" v-for="g in myGroups" class="col-11">
            <GroupCard :group="g.group"/>
          </div>
        </section>
        <!-- SECTION events -->
        <section class="row">
          <div class="col-10"></div>
        </section>
      </div>
    </section>
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
            account: computed(()=> AppState.account),
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
.maroon{
  background-color: #fbcf33;
  color: #8f1515;
}
.border-style{
  // border-color:#fbcf33;
  border-left: 2px solid #fbcf33;
}
.img-style{
  height: 20vh;
  width: 40%;
  object-fit: cover;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}
.elevation-7{
  box-shadow: 3px 3px 3px #fbd033a2;
}
</style>
