<template>
  <div class="layout">
    <Test v-if="isTest"/>
    <HeadBar/>
    <UserBoard/>
    <el-row class="content" >
      <el-col :span="14">
          <router-view></router-view>
      </el-col>
      <el-col :span="8">
         <RightListBox/>
      </el-col>
    </el-row>
    <Totop/>
    <Backdrop/>
  </div>
</template>

<script>
import Test from '../test.vue'
import HeadBar from  '@/components/HeadBar'
import UserBoard from '@/components/UserBoard'
import Backdrop from "@/components/Backdrop"
import RightListBox from "@/components/RightListBox"
import Totop from '@/components/Totop'
export default {
  name: "Layout",
  data() {
    return {
      articles: [],
      isTest:false
    };
  },
  mounted() {
   
  },
  components:{
    Test,
    HeadBar,
    UserBoard,
    Backdrop,
    RightListBox,
    Totop
  }
};
</script>

<style src="./index.css"> 
