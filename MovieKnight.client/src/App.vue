<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view />
  </main>
  <AddMovieModal />
  <ModalComponent />
  <EventFormOffCanvas />
  <ModalAddItemToEvent />
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import AddMovieModal from "./components/AddMovieModal.vue"
import EventFormOffCanvas from "./components/EventFormOffCanvas.vue"
import ModalComponent from "./components/ModalComponent.vue"
import ModalAddItemToEvent from "./components/ModalAddItemToEvent.vue"
import Navbar from './components/Navbar.vue'

export default {
  setup() {
    return {
      appState: computed(() => AppState)
    }
  },
  components: { Navbar, ModalComponent, AddMovieModal, EventFormOffCanvas, ModalAddItemToEvent }
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
