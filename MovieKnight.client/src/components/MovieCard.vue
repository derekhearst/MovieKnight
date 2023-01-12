<template>
  <router-link :to="{ name: 'MovieDetails', params: { id: movie.id } }" class="movieCard">
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
  min-width: 200px;
  max-width: 290px;

  // width: 250px;
  object-fit: cover;
  // box-shadow: 3px 3px 2px 2px #fcc333c5;
}

.poster {
  width: 100%;
  height: 25rem;
  object-fit: cover;
  border: 2px solid #fcc333c5;
}
</style>