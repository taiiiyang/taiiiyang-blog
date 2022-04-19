<template>
  <div class="rightlistBox">
      <section class="user-profile">
          <img id="profileImage" src="@/assets/profile.jpg" alt="网络错误">
          <span id="description">Can you find me ?</span>
          <div class="link-group">
            <a href="https://github.com/taiiiyang" target="_blank">
              <i class="fa fa-github fa-2x"></i>
            </a>
            <a href="http://localhost:8080/qq.png" target="_blank">
             <i class="fa fa-qq fa-2x"></i>
             </a>
            <a href="http://localhost:8080/wechat.jpg" target="_blank">
              <i class="fa fa-wechat fa-2x"></i>
            </a>
            <!-- <router-link to="/Aboutme"></router-link> -->
          </div>
      </section>
      <section class="thumb">
        <p>Do you like me ? </p>
        <div>
          <i class="fa fa-heart"></i>
          <span>{{thumbCount}}</span>
        </div>
      </section>
  </div>
</template>

<script>
export default {
    name:"RightListBox",
    data(){
      return {
        thumbCount:5533
      }
    }
}
</script>

<style src="./index.css">

