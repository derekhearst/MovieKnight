<template>
  <div class="myComment" v-if="comment.creator.id == account.id">
    <div class="posterInfo">
      <img :src="comment.creator.picture" alt="">
      <div class="posterName">
        <h4 class="">{{ comment.creator.name }}</h4>
        <sub class="createdAt">{{ new Date(comment.createdAt).toDateString() }}</sub>
      </div>
    </div>
    <p class="text-start">{{ comment.body }}</p>
  </div>

  <div class="otherComment" v-else>
    <div class="posterInfo">
      <img :src="comment.creator.picture" alt="">
      <div class="posterName">
        <h4 class="">{{ comment.creator.name }}</h4>
        <sub class="createdAt">{{ new Date(comment.createdAt).toDateString() }}</sub>
      </div>
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
  margin-bottom: .25rem;
}

.posterName {
  display: flex;
  flex-direction: column;
  justify-content: center;

}

.myComment {
  background-color: rgba(0, 0, 0, 0.581);
  backdrop-filter: blur(2px);
  border: 1px solid goldenrod;
  padding: .25rem;
  align-self: flex-end;
  max-width: 50ch;
  word-break: break-all;
}

.otherComment {
  background-color: rgba(0, 0, 0, 0.581);
  backdrop-filter: blur(2px);
  border: 1px solid maroon;
  padding: .5rem;
  align-self: flex-start;
  max-width: 50ch;
  word-break: break-all;
}
</style>