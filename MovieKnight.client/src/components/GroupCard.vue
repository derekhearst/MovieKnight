<template>

  <router-link v-if="group.archived == false" :to="{ name: 'Group', params: { id: group.id } }" class="groupCard">
    <img class="groupImage" :src="group.coverImg" alt="">
    <div>
      <h4>{{ group.title }}</h4>
      <p>{{ group.description.slice(0, 30) }}</p>
    </div>
  </router-link>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { Group } from "../models/Group.js";
// import { group } from "console";
export default {
  props: { group: { type: Object, required: true } },
  setup() {

    return {
    }
  }
};
</script>


<style lang="scss" scoped>
.groupCard {
  display: flex;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.458);
  color: white;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.9);

}

.groupImage {
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-right: 1rem;
}
</style>