<template>
  <div class="footer-container clearfix">
    <div class="sharebox">
      <button class="shareButton">
        <i class="fa fa-heart fa-1g"></i>
        <span>喜欢</span>
        <span class="line">|</span>
        <span>{{ likeCount }} </span>
      </button>
      <button class="shareButton">
        <i class="fa fa-star fa-1g"></i>
        <span>收藏</span>
        <span class="line">|</span>
        <span>{{ bookCount }} </span>
      </button>
    </div>
    <div class="donate"></div>
  </div>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      likeCount: 0,
      bookCount: 0,
    };
  },
};
</script>

<style scoped>
.footer-container {
  width: 100%;
  height: 50px;
  display: inline-block;
  position:relative;
}

.sharebox {
  position:absolute;
  top:20px;
  right: 10px;
}

.shareButton {
  width: 90px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  font-size: 15px;
  color: #e26d6d;
  background-color: #fff;
  border-color: #e26d6d;
  border: 1px solid;
  border-radius: 20px;
  margin: 0 10px;
  cursor: pointer;
}

.clearfix:after {
  content: "";
  height: 0;
  line-height: 0;
  display: block;
  visibility: hidden;
  clear: both;
}
.clearfix {
  zoom: 1;
}

.shareButton > span:nth-of-type(1) {
  margin-left: 5px;
}

.line {
  margin: 0 5px;
}
</style>
