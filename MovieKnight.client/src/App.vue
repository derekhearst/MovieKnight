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
  <footer>
    <h1>Created By :</h1>
    <a href="https://derekhearst.com" target="_blank">
      <h1>Derek Hearst</h1>
    </a>
    <a href="https://github.com/jon-cron" target="_blank">
      <h1>John Cron</h1>
    </a>
    <h1>Kendall Powell</h1>
    <h1>Calvin Thurston</h1>
  </footer>
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

footer {
  background-color: black;
  color: rgba(255, 255, 255, 0.49);
  display: flex;
  gap: 2rem;
  justify-content: center;

  h1 {
    padding: 0;
    font-size: 1.5rem;
    text-decoration: none;
  }
}

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

.banner {
  border-image-slice: 37 39 148 37;
  border-image-width: 30px 20px 144px 20px;
  border-image-outset: 0px 0px 0px 0px;
  border-top: 20px;
  border-bottom: 144px;
  border-right: 20px;
  border-left: 20px;
  margin-top: -5px;
  border-image-repeat: stretch stretch;
  border-image-source: url("./assets/img/bannerflaggood-removebg-preview.png");
  border-style: solid;
  background-image: url("./assets/img/bannerborderbg.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-clip: border-box;
  display: flex;
  flex-direction: column;
  width: 100%;
}

.button {
  background-image: url("./assets/img/goodbutton-removebg-preview.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
  text-align: center;
  border: none;
  color: black;
  font-size: 1.5rem;
  font-weight: bold;
  background-color: transparent;
  font-family: 'MedievalSharp', cursive;
  padding: 1rem;
  padding-right: 2rem;
  padding-left: 2rem;
  user-select: none;
  width: max-content;
}

.button:hover {
  scale: 1.05;
}

.button:active {
  scale: 0.95;
}

.badge {
  text-align: center;
  background-image: url("./assets/img/buttondots-removebg-preview.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-weight: bold;
  color: black;
  font-size: 2rem;
  padding: 1.5rem;
  padding-right: 2rem;
  padding-left: 2rem;
  width: min-content;
  height: min-content;
  font-family: 'MedievalSharp', cursive;
}

.scrollTitle {
  background-image: url("./assets/img/scrollsmall-removebg-preview.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
  text-align: center;
  padding-top: .25rem;
  padding-bottom: 1.75rem;
  padding-right: 2rem;
  padding-left: 2rem;
  font-size: 1.5rem;
  color: black;
  font-family: 'MedievalSharp', cursive;
  font-weight: bold;
  margin-bottom: -1rem;
}
</style>
