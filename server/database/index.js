var MongoClient = require('mongodb').MongoClient
var ObjectId = require('mongodb').ObjectId
var url = "mongodb://localhost:27017/test"
var COLLECTION = 'article'

let db, collection

async function init() {
    try {
        db = await MongoClient.connect(url)  //连接数据库
        console.log('数据库已连接');
        dbase = db.db('')
        collection = await dbase.collection(COLLECTION) //连接集合并自动创建
    } catch {
        throw new Error('数据库初始化错误')
    }
}

init() //初始化数据库

/**
 * @method 向数据库集合中插入文章
 * @param {object} article 
 */
module.exports.insertArticle = function (article) {
    /*
        article:{
            name:'',
            content:'',
            summary:'',
            id:number,
            time:'',
            show:boolean
        }
    */
   if(Object.prototype.toString.call(article) !== '[object Object]') {
       throw new Error('article插入错误,类型不为对象')
   }
    collection.insertOne(article, (err, _) => {
        if (err) throw err
        console.log('文章插入成功');
    })
}

/**
 * @method 批量插入文章
 * @param {array} articles 
 */
module.exports.insertManyArticles = function (articles) {
    if (articles && !Array.isArray(articles)) throw new Error('articles参数不是数组')
    collection.insertMany(articles, (err, _ ) => {
        if (err) throw err
        console.log('批量插入文章成功');
    })
}

/**
 * @method 查询文章，可携带参数
 * @param {object} where 查询语句
 */
module.exports.findArticles = async function (where = null) {
    let find
    let _id = where?._id ?  new ObjectId(where._id) : ''
    if(_id) where._id = _id
    find = await where ? collection.find(where) : collection.find() //查找对应数据
    result = await find.toArray() //数据处理
    return result //返回结果
}

/**
 * 
 * @param {Object} query 
 * @param {Object} update 
 */
module.exports.updateArticle = (query,update) => collection.updateOne(query,update,{multi:true})


/**
 * @method 删除对应id文章
 * @param query {Object} 查询参数
 */
module.exports.deleteArticle = (query) => collection.deleteOne(query,{justOne:true})
