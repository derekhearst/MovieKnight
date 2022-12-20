<template>
  <div class="container-fluid">
    <section class="row justify-content-center mt-3">
      <!-- SECTION movies -->
      <div class="col-7 m-2 p-1">
        <section class="row justify-content-evenly p-1">
          <!-- TODO v-for over this col-3 -->
          <div class="col-3 p-3">
            <img class="movie-elv rounded" src="http://thiscatdoesnotexist.com" alt="">
          </div>
          <div class="col-3 p-3">
            <img class="movie-elv rounded" src="http://thiscatdoesnotexist.com" alt="">
          </div>
          <div class="col-3 p-3">
            <img class="movie-elv rounded" src="http://thiscatdoesnotexist.com" alt="">
          </div>
          <div class="col-3 p-3">
            <img class="movie-elv rounded" src="http://thiscatdoesnotexist.com" alt="">
          </div>
          <div class="col-3 p-3">
            <img class="movie-elv rounded" src="http://thiscatdoesnotexist.com" alt="">
          </div>
        </section>
      </div>
      <!-- SECTION groups and events -->
      <div class="col-4">
        <!-- SECTION groups -->
        <section class="row justify-content-center">
          <div class="col-10">
            <h1 class="fw-bold">My Groups</h1>
          </div>
          <div class="col-10"></div>
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
export default {
  setup() {
    return {}
  }
}
</script>

<style scoped lang="scss">
.movie-elv{
  box-shadow: 3pt 3pt 3pt whitesmoke;
  height: 33vh;
  width: 100%;
  object-fit: cover;
}
</style>
