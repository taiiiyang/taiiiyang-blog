const path = require('path')
const database = require(path.join(__dirname, '../database'))


function myTypeof(arg) {
    try {
        let type = typeof arg
        if (type !== 'object') {
            return type.slice(0, 1).toLocaleUpperCase() + type.slice(1)
        } else {
            return Object.prototype.toString.call(arg).slice(8, -1) //截取表达正确数据类型的字符串
        }
    } catch {
        throw new Error('数据不正确')
    }
}

function getSendObj(status, message, data) {
    if (status == "Ok") {
        return data ? {
            status,
            code: 20000,
            message,
            data
        } : {
            status,
            code: 20000,
            message
        }
    } else if (status == "No") {
        return {
            status,
            code: 40001,
            message,
        }
    }
}

/**
 * @method 向数据库中插入文章
 * @param articles {Object | Array} 需要插入的数据
 * @param many {Boolean} 非必需，决定是否插入多条数据
 */
module.exports.insertArticle = function (req, res) {
    console.log('file',req.file);
    let articles = req.body.articles
    console.log('articles', myTypeof(articles), articles);
    let manyArticles = req.body.manyArticles ?? false
    if (!articles || (myTypeof(articles) !== 'Array' && myTypeof(articles) !== 'Object')) {
        res.send(getSendObj('No', '提交文章错误或不存在'))
        return false
    } else if (manyArticles && myTypeof(manyArticles) !== 'Boolean') {
        //manyArticle 参数不为boolean值是
        res.send(getSendObj("No", 'manyArticle参数错误'))
        return false
    } else {
        if (!manyArticles) {
            database.insertArticle(articles)
        } else {
            database.insertManyArticles(articles)
        }
        res.send(getSendObj("Ok", '文章插入成功'))
        return false
    }
}

/**
 * @method 根据查询语句查询article
 */
module.exports.findArticle = async function (req, res) {
    let where = req.body.where    //定义where语句
    if (where && myTypeof(where) !== "Object") res.send(getSendObj("No", "查询参数错误"))
    let data = []
    data = await database.findArticles(where)
    if (Array.isArray(data)) {
        data.length == 0 ? res.send(getSendObj("No", "查询结果为空")) : res.send(getSendObj("Ok", "查询成功", data))
    }
}

module.exports.updateArticle = function (req, res) {
    let id = req.params.id ?? null
    let update = req.body.update ?? null
    if (!id|| !update) res.send(getSendObj('No', '更新文章失败，请携带参数')) //处理错误请求
    if (myTypeof(update) !== "Object") {
        res.send(getSendObj("No","更新参数类型错误"))
    }
    let query = {
        id:parseInt(id)
    }
    console.log('query,update',typeof query.id,typeof update['$set']);
    let ans = database.updateArticle(query, update)
    ans.then(result => {
        result.modifiedCount == 1 ? 
        res.send(getSendObj("Ok", "成功更新文章")) :
        res.send(getSendObj("No","更新文章失败，找不到此文章,或者更改参数错误"))
    }) 
    
}

module.exports.deleteArticle = function(req,res){
    let id = req.params.id ?? null
    if(!id) res.send(getSendObj('No',"删除操作参数不能为空"))
    let query = {
        id:parseInt(id)
    }
    let ans = database.deleteArticle(query)
    ans.then(result => {
        result.deletedCount === 1 ?
        res.send(getSendObj("Ok","成功")) : 
        res.send(getSendObj("No","尝试删除不存在文章"))
    })
}