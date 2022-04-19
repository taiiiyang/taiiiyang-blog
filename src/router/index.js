import VueRouter from 'vue-router'
import Home from '@/views/home'
import Detail from '@/views/detail'
import Aboutme from '@/views/Aboutme'
import Archive from '@/views/archive'

const routes = [
    {
        path:'',
        component:Home,
        meta:{
            home:true,
            detail:false
        }
    },
    {
        path:'/detail/:_id',
        component:Detail,
        meta:{
            detail:true,
            home:false,
        }
    },
    {
        path:'/aboutme',
        component:Aboutme
    },
    {
        path:'/archive*', //模糊路由
        component:Archive,
    }
]


export default new VueRouter({
    mode:'hash',
    routes
})