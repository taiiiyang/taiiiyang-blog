const bodyParser = require('body-parser')
const express = require('express')
// const formidable = require('express-formidable')
const app = express()

const router = require(__dirname + '/router.js')

// app.use(formidable)
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json({extended:false}))
app.use('/api',router) //应用路由中间件

app.listen(5000,()=>{
    console.log('启动服务器成功');
})