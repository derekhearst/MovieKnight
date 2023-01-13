<template>
  <div class="page">
    <div class="scrollTitle">{{ account.name }}</div>
    <!-- <img class="rounded" :src="account.picture" alt="" /> -->
    <button class="button" @click="editAccountPop">Edit Account</button>
    <section class="mainSection">
      <div class="container">

        <div class="badge">My Favorites</div>
        <div v-if="favoriteMovies" class="movies">
          <div class="movie" v-for="m in favoriteMovies">
            <MovieCard :movie="m.movie" />
            <i class="mdi mdi-trash-can" @click="removeMovie(m.id)"></i>
            <i @click="switchFavorite(m.id)" class="mdi mdi-heart" title="UnFavorite"></i>

          </div>
        </div>
      </div>
      <div class="container">
        <div class="badge">My Movies</div>

        <div v-if="myMovies" class="movies">
          <div class="movie" v-for="m in myMovies">
            <MovieCard :movie="m.movie" />
            <i class="mdi mdi-trash-can" @click="removeMovie(m.id)"></i>
            <i @click="switchFavorite(m.id)" class="btn mdi mdi-heart-outline" title="Favorite"></i>
          </div>
        </div>

      </div>



    </section>
  </div>


</template>

<script setup>
import Swal from 'sweetalert2'
import { computed, onMounted, ref } from 'vue'
import { AppState } from '../AppState'
import MovieCard from "../components/MovieCard.vue"
import { accountService } from "../services/AccountService.js"
import { logger } from "../utils/Logger.js"
import Pop from "../utils/Pop.js"

const editable = ref({});
let account = computed(() => AppState.account)
let myMovies = computed(() => AppState.myMovies)
let favoriteMovies = computed(() => AppState.myFavoriteMovies)

async function switchFavorite(id) {
  try {
    await accountService.switchFavorite(id)
  } catch (error) {
    Pop.error(error)
    logger.log(error)
  }
}
async function editAccountPop() {
  await Swal.fire({
    title: 'Edit Account',
    html: `
    <label for="swal-input1" class="swal2-label">Name</label>
    <input id="swal-input1" class="swal2-input" placeholder="Name" value="${AppState.account.name}">
    <label for="swal-input2" class="swal2-label">Picture</label>
    <input id="swal-input2" class="swal2-input" placeholder="Picture" value="${AppState.account.picture}">
    `,
    showCancelButton: true,
    cancelButtonText: 'Cancel',
    focusConfirm: false,
    preConfirm: () => {
      return [
        document.getElementById('swal-input1').value,
        document.getElementById('swal-input2').value
      ]
    }
  }).then(async (result) => {
    if (result.isConfirmed) {
      editable.value.name = result.value[0]
      editable.value.picture = result.value[1]
      try {
        await accountService.editAccount(editable.value);
        Pop.toast('Account Updated', 'success')
      }
      catch (error) {
        Pop.error(error);
        logger.log(error);
      }
    }
  })
}

async function removeMovie(id) {
  try {
    await accountService.deleteMovieFromMyList(id)
  } catch (error) {
    Pop.error(error)
    logger.log(error)
  }
}

</script>

<style lang="scss" scoped>
.page {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  width: 100%;
  background-image: url("../assets/img/stone-texture-background.jpg");
  background-size: cover;
  // background-repeat: no-repeat;
  background-position: center;
  background-color: rgba(0, 0, 0, 0.842);
  background-blend-mode: color;
  color: white;
}

.mainSection {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.scrollTitle {
  font-size: 3rem;
  padding-left: 4rem;
  padding-right: 4rem;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

}

.movies {
  padding: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.movie {
  position: relative;
  display: flex;

  i {
    position: absolute;
    top: .5rem;
    right: .5rem;
    z-index: 3;
    color: red;
    font-size: 2rem;
    cursor: pointer;
  }

  .mdi-trash-can {

    left: .5rem;
    right: auto;
  }
}
</style>
