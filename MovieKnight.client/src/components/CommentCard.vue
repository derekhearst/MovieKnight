<template>
  <div class="col-12"  v-if="comment.creator.id == account.id">
    <section class="row justify-content-end">
      <div class="col-7 p-2 comment">
        <div class="d-flex align-items-center">
          <img :src="comment.creator.picture" class="img" alt="">
          <h6 class="p-1">{{ comment.creator.name }}</h6>
        </div>
        <p class="text-start">{{ comment.body }}</p>
      </div>
    </section>
  </div>
  <div class="col-12"  v-else>
    <section class="row justify-content-end">
  <div class="col-7 p-2 comment">
    <div class="d-flex align-items-center">
      <img :src="comment.creator.picture" class="img" alt="">
      <h6 class="p-1">{{ comment.creator.name }}</h6>
    </div>
    <p class="text-start">{{ comment.body }}</p>
  </div>
  </section>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
export default {
  // props: {movie: {type: Movie, required: true}},

  props: {comment: {type: Object, required: true}},
  setup(){
  return {
    account: computed(()=> AppState.account)
  }
  }
};
</script>


<style lang="scss" scoped>
.img{
  height: 8vh;
  widows: 8vh;
  border-radius: 45em;
}
.comment{
  border: 2pt solid #fbcf33;
  border-radius: 10pt;
}
</style>