<template>
  <div class="archiveBox">
    <div class="archive-title">归档</div>
    <div class="class">
      <div class="class-title">分类</div>
      <ul>
        <li
          v-for="(tag, index) in tags"
          :key="tag[1]"
          @click="filterByTag(index)"
          ref="tag"
        >
          <span style="margin-right: 10px">{{ tag[0] }}</span>
          <span style="color: #444">({{ tagCount[index] }})</span>
        </li>
      </ul>
    </div>
    <div class="archive-main">
      <main class="article-list">
        <section v-for="year in years" :key="year">
          <p>{{ year }}</p>
          <el-timeline>
            <el-timeline-item
              v-for="(article, index) in articles[year]"
              type="primary"
              class="archive-article"
            >
              <span style="margin-right: 10px; color: #409eff">{{
                article.time.slice(5)
              }}</span>
              <span @click="toDetail(article._id)">{{ article.name }}</span>
            </el-timeline-item>
          </el-timeline>
        </section>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  name: "Archive",
  data() {
    let tags = new Map();
    tags.set("分享镜", 1);
    tags.set("闲言碎语", 2);
    return {
      tags, //通过对应tag进行查找
      years: [], //根据年份进行分类
      articles: [],
      tagCount: [0, 0],
    };
  },
  mounted() {
    this.$api
      .findArticles() //默认显示全部文章
      .then((res) => {
        let articles = res.data.data;
        this.handleArticle(articles);
        articles.map((item) => {
          if (item.tag == 1) {
            this.tagCount[0] += 1;
          } else if (item.tag == 2) {
            this.tagCount[1] += 1;
          }
        });
      });
  },
  methods: {
    handleArticle(articles) {
      let tmp, years;
      tmp = {};
      years = articles.map((item) =>
        new Date(item.time).getFullYear().toString()
      );
      years = [...new Set(years)]; //获取years
      years.forEach((year) => {
        tmp[year] = [];
      });
      articles.forEach((item) => {
        let year = new Date(item.time).getFullYear();
        tmp[year].push(item);
      });
      this.articles = { ...tmp };
      this.years = years;
    },
    filterByTag(tag) {
      let query;
      //点击后获取文章，改变文章内容
      this.removeActive();
      this.$refs.tag[tag].classList.add("active");
      tag += 1;
      this.$router.push({
        path: "/archive",
        query: {
          tag,
        },
      }); //跳转搜索对应文章
      query = {
        tag,
      };
      //查找过滤对应文章
      this.$api
        .findArticles(query)
        .then((res) => this.handleArticle(res.data.data));
    },
    removeActive() {
      this.$refs.tag &&
        this.$refs.tag.forEach((item) => {
          if (item.classList.contains("active"))
            item.classList.remove("active");
        });
    },
    toDetail(_id) {
      this.$router.push("/detail/" + _id);
    },
  },
  computed: {},
};
</script>

<style src="./index.css" />
