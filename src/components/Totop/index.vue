<template>
  <div class="totop" ref="totop" @click="backtotop">
    <img src="@/assets/scroll.png" alt />
  </div>
</template>

<script>
// import {throttle} from '@/utils'
export default {
  name: "Totop",
  mounted() {
    window.addEventListener("scroll", this.handleScroll, true);
  },
  methods: {
    handleScroll() {
      let limit = 500;
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      if (scrollTop > limit) this.$refs.totop.classList.add("active");
      else if (scrollTop < limit) this.$refs.totop.classList.remove("active");
    },
    backtotop() {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    },
  },
  destroyed() {
    document.removeEventListener("scroll", this.handleScroll);
  },
  // computed:{
  //     throttleScroll(){
  //         return throttle(this.handleScroll,500)
  //     }
  // }
};
</script>

<style lang="css" scoped>
.totop {
  height: 700px;
  position: fixed;
  background-color: transparent;
  top: -100px;
  right: 50px;
  transition: all 1s;
  transform: translateY(-100%);
  z-index: 20230;
}

.totop img {
  height: 100%;
}

.active {
  transform: translateY(-50%);
  opacity: 1;
}
</style>
