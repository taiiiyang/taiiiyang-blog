<template>
  <header class="headBack">
    <div class="container">
      <ul class="main" @click="changeRoute">
        <li class="item" data-index="1"><i class="fa fa-home" data-index="1"></i>首页</li>
        <li class="item" data-index="2"><i class="fa fa-folder-open" data-index="2"/>归档</li>
        <li class="item" data-index="3"><i class="fa fa-address-card" data-index="3"/>关于</li>
      </ul>
    </div>
  </header>
</template>

<script>
export default {
    name:"HeadBar",
    data(){
        return {

        }
    },
    methods:{
      changeRoute(e){
        console.log('e',typeof e.target.dataset.index);
        let index = parseInt(e.target.dataset.index)
        switch(index){
          case 1:
            this.$router.push('/')
            break
          case 2:
            this.$router.push('/archive')
            break
          case 3:
            this.$router.push('/aboutme')
            break
        }
      }
    }
}
</script>

<style src="./index.css">

