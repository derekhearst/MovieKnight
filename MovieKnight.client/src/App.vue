<template>
  <header>
    <Navbar />
  </header>
  <main class="bg-dark">
    <router-view />
  </main>
  <AddMovieModal />
  <ModalComponent />
  <EventFormOffCanvas />
  <AddMovieToEventModal />
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import AddMovieModal from "./components/AddMovieModal.vue"
import EventFormOffCanvas from "./components/EventFormOffCanvas.vue"
import ModalComponent from "./components/ModalComponent.vue"
import AddMovieToEventModal from "./components/AddMovieToEventModal.vue"
import Navbar from './components/Navbar.vue'

export default {
  setup() {
    return {
      appState: computed(() => AppState)
    }
  },
  components: { Navbar, ModalComponent, AddMovieModal, EventFormOffCanvas, AddMovieToEventModal }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

html {
  min-height: 100vh;

  ::-webkit-scrollbar {
    width: 10px;
    background-color: maroon;
    color: gold;
  }

  ::-webkit-scrollbar-thumb {
    background-color: goldenrod;
    border-radius: 10px;
    border: 3px solid maroon;
  }
}
</style>
