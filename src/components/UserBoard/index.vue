<template>
  <div class="user-board">
     <div class="scene">
         <vue-typed-js :strings="['Hi  taiiiyang']" :typeSpeed="100">
              <h1 class="typing"></h1>
         </vue-typed-js>
     </div>
     <div class="h-information">
         <div class="avatar">
             <img src="@/assets/avatar.jpg" alt="网络不好">
         </div>
         <div class="quote">
            <p>Trust Yourself</p>
         </div>
     </div>
  </div>
</template>

<script>
export default {
    name:"UserBoard",
    data(){
        return {

        }
    }
}
</script>

<style src="./index.css">