<template>
  <router-link :to="{ name: 'MovieDetails', params: { id: movie.mdId } }" class="movieCard">
    <img :src="movie.posterImg" alt="" class="poster">
  </router-link>
</template>


<script setup>
let props = defineProps({
  movie: {
    type: Object,
    required: true
  }
})

</script>


<style lang="scss" scoped>
.movieCard {
  flex: 1 1 250px;
  max-width: 280px;
  min-width: 240px;
  height: 24rem;
  object-fit: cover;
}

.poster {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border: 2px solid #fcc333c5;
}
</style>