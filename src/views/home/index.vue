<template>
  <div id="home">
    <Article v-for="article in articles" :article="article" :key="article.id"/>
  </div>
</template>

<script>
import Article from "@/components/Article";
export default {
  name: "Home",
  components: {
    Article,
  },
  data(){
      return {
          articles:""
      }
  },
  mounted() {
    this.$api.findArticles()
        .then(res => {
           console.log('res',res.data.data);
            this.articles = res.data.data
        });
  },
};
</script>

<style src="./index.css" />
