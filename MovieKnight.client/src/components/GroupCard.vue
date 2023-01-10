<template>
  <router-link :to="{name: 'Group', params: {id: group.id}}">
  <div class="d-flex justify-content-start bg-black text-white my-4 rounded elevation-7">
      <img class="img-style" :src="group.coverImg" alt="">
      <div class="pt-3 px-2">
        <h4>{{group.title}}</h4>
        <p>{{group.description.slice(0,200)}}</p>
      </div>
    </div>
  </router-link>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
// import { group } from "console";
export default {
  props: {group:{type: Object, required: true}},
  setup(){
    
  return {
  }
  }
};
</script>


<style lang="scss" scoped>
.maroon{
  background-color: #fbcf33;
  color: #8f1515;
}
.border-style{
  // border-color:#fbcf33;
  border-left: 2px solid #fbcf33;
}
.img-style{
  height: 20vh;
  width: 40%;
  object-fit: cover;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}
.elevation-7{
  box-shadow: 3px 3px 3px #fbd033a2;
}
</style>