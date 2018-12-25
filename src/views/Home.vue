<template>
  <div>
    <h1>This is an home page</h1>
    
    <button
      v-for="(item,index) of tabs"
      :key="index"
      @click="currentTab = item"
      :class="{active: currentTab === item}"
    >{{item}}</button>
    <transition name="fade" mode="out-in">
      <component :is="currentTab"></component>
    </transition>
  </div>
</template>

<script>
import one from "../components/one";
import two from "../components/two";
export default {
  data() {
    return {
      tabs: ["one", "two"],
      currentTab: "one",
      check: false
    };
  },
 
  components: {
    one,
    two
  }
};
</script>

<style scoped>
.active {
  border: 1px solid red;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
</style>