<template>
  <section class="article">
    <div class="date-board">
      <p>{{ date.mm }}月</p>
      <p>{{ date.dd }}</p>
    </div>
    <div class="main">
      <header>
        <div class="title">{{ article.name }}</div>
        <div class="description">
          <p>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <i class="fa fa-user"></i>
            发表于
            <i class="fa fa-clock-o"></i>
            {{ date.format }}
          </p>
        </div>
      </header>
      <main ref="content">
      </main>
      <footer >
        <button id="viewDetail" @click="toDetail()" v-if="meta.home">阅读全文</button>
        <Footer v-else-if="meta.detail"></Footer>
      </footer>
    </div>
  </section>
</template>

<script>
import { marked } from "marked";
import { dateFormat, debounce } from "@/utils";
import Footer from './footer.vue'
export default {
  name: "Article",
  data() {
    return {};
  },
  props: {
    article: {
      type: Object,
      require: true,
    },
  },
  components:{
    Footer
  },
  computed: {
    date() {
      return dateFormat(this.article.time);
    },
    meta(){
      return this.$route.meta
    },
    content() {
      let meta = this.$route.meta
      console.log('meta',meta);
      if(meta.detail){
        console.log('de');
        return marked(this.article.content);
      }else if(meta.home){
        console.log('dee');
        return marked(this.article.summary)
      }
    },
    toDetail() {
      return debounce(this.toDetailCallback, 500);
    },
  },
  mounted() {
    console.log(this.content);
    this.$refs.content.innerHTML = this.content;
  },
  methods: {
    toDetailCallback() {
      //methods中每一个函数都是一个作用域
      console.log(this.article._id);
      this.$router.push(`/detail/${this.article._id}`)
    },
  },
};
</script>

<style src="./index.css" />
