<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>|
      <router-link to="/hello">hello</router-link>
    </div>
    <transition :name="transitionName" mode="out-in">
      <keep-alive>
        <router-view
          class="transitionBody"
          @touchstart.native="handleTouchStart"
          @touchmove.native="handleTouchMove"
          @touchend.native="handleTouchEnd"
        />
      </keep-alive>
    </transition>
  </div>
</template>

<script>
const MAX_DELTA = 70;
export default {
  data() {
    return {
      transitionName: "transitionLeft",
      touches: {},
      currentPath: "",
      currentIndex: 0,
      routesList: [
        {
          path: "/",
          name: "home"
        },
        {
          path: "/about",
          name: "about"
        },
        {
          path: "/hello",
          name: "hello"
        }
      ]
    };
  },
  mounted() {
    this.currentPath = this.$route.path;
  },
  methods: {
    handleTouchStart(e) {
      const touches = e.touches[0];
      this.touches.startX = touches.pageX;
      this.touches.startY = touches.pageY;
    },
    handleTouchMove(e) {
      const touches = e.touches[0];
      this.touches.endX = touches.pageX;
      this.touches.endY = touches.pageY;
    },
    handleTouchEnd(e) {
      const diffX = this.touches.endX - this.touches.startX;
      const diffY = this.touches.endY - this.touches.startY;
      this.routesList.forEach((item, index) => {
        if (item.path === this.currentPath) {
          this.currentIndex = index;
        }
      });
      const diff_X_Y = Math.abs(diffX) > Math.abs(diffY);
      if (diff_X_Y && diffX > MAX_DELTA && this.currentIndex > 0) {
        this.transitionName = "transitionRight";
        console.log(this.transitionName);
        this.$router.push(this.routesList[this.currentIndex - 1].path);
      } else if (
        diff_X_Y &&
        diffX < -MAX_DELTA &&
        this.currentIndex < this.routesList.length - 1
      ) {
        console.log(this.transitionName);
        this.transitionName = "transitionLeft";
        this.$router.push(this.routesList[this.currentIndex + 1].path);
      }
    }
  },
  watch: {
    $route(to, from) {
      const routes = this.$router.options.routes;
      const arr = [];
      routes.forEach(item => {
        arr.push(item.path);
      });
      const compare = arr.indexOf(to.path) > arr.indexOf(from.path);
      this.transitionName = compare ? "transitionLeft" : "transitionRight";
      this.currentPath = to.path;
    }
  }
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
html,
body {
  height: 100%;
  width: 100%;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.transitionBody {
  transition: all 0.1s ease; /*定义动画的时间和过渡效果*/
}

.transitionLeft-enter,
.transitionRight-leave-active {
  transform: translate(100%, 0);
  /*当左滑进入右滑进入过渡动画*/
}

.transitionLeft-leave-active,
.transitionRight-enter {
  transform: translate(-100%, 0);
}
</style>>