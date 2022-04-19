const router = require('express').Router()
const articles = require('./articles')


router.get('/',(req,res)=>{
    res.send({
        status:'ok',
        code:200,
        data:{
            yes:'yes'
        },
        message:"请求测试成功"
    })
})

//文章插入接口
router.post('/articles/insert',articles.insertArticle)
//文章查询接口
router.post('/articles/find',articles.findArticle)
//文章修改接口
router.post('/articles/update/:id',articles.updateArticle)
//文章删除接口
router.delete('/articles/delete/:id',articles.deleteArticle)


module.exports = router
