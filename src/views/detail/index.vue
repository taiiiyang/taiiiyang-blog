<template>
    <div class="detail-wrapper">
        <Article v-if="article" :article="article" />
    </div>
</template>

<script>
import Article from '@/components/Article'
export default {
    name:"Detail",
    data(){
        return {
            article:''
        }
    },
    components:{
        Article
    },
    mounted(){
        let query = {
           _id : this.$route.params._id
        }
        this.$api.findArticles(query)
            .then(res => {
                console.log(res.data.data)
                this.article = res.data.data[0]
            })
    }
}
</script>