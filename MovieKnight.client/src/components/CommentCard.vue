<template>
  <div class="myComment" v-if="comment.creator.id == account.id">
    <div class="posterInfo">
      <img :src="comment.creator.picture" alt="">
      <h4>{{ comment.creator.name }}</h4>
      <div class="createdAt">{{ new Date(comment.createdAt).toDateString() }}</div>
    </div>
    <p class="text-start">{{ comment.body }}</p>
  </div>

  <div class="otherComment" v-else>
    <div class="posterInfo">
      <img :src="comment.creator.picture" alt="">
      <h4>{{ comment.creator.name }}</h4>
      <div class="createdAt">{{ new Date(comment.createdAt).toDateString() }}</div>
    </div>
    <p class="text-start">{{ comment.body }}</p>
  </div>


</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
export default {
  // props: {movie: {type: Movie, required: true}},

  props: { comment: { type: Object, required: true } },
  setup() {
    return {
      account: computed(() => AppState.account)
    }
  }
};
</script>


<style lang="scss" scoped>
img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
}

.createdAt {
  color: rgba(255, 255, 255, 0.689);
}

.posterInfo {
  display: flex;
  align-items: center;
  gap: .5rem;
  margin-bottom: .25rem;
}

.myComment {
  background-color: rgba(0, 0, 0, 0.581);
  backdrop-filter: blur(2px);
  border: 1px solid goldenrod;
  padding: .5rem;
  align-self: flex-end;
}

.otherComment {
  background-color: rgba(0, 0, 0, 0.581);
  backdrop-filter: blur(2px);
  border: 1px solid goldenrod;
  padding: .5rem;
  align-self: flex-start;
}
</style>