import api from '../instance'
import { myTypeof , throwError} from '@/utils'

/**
 * 
 * @param query {object} 查询条件，直接放入对象中
 * @returns 调用结果
 */
export const findArticles = (query = null) =>  {
    let payload = {
        where:query
    }
    console.log('payload',payload);
    return api.post('/articles/find',payload)
}

/**
 * 
 * @param {Number} id 删除id
 * @returns 
 */
export const deleteArticles = (id) => {
   if(id && Array.prototype.toString.call(id) !== '[object Number]'){
        throwError("deleteArticle id must be number")
    }else if(!id){
       throwError("'deleteArticles must have id syntax'")
   }
   return api.delete(`/articles/delete/${id}`)
}

/**
 * @param {Object} articles 文章对象 
 * @param {Boolean} manyArticles 是否插入多篇文章
 */
export const insertArticles = (articles,manyArticles = false) => {
    if(!articles) throwError('insertArticles must have articles syntax')
    if((myTypeof(articles) !== 'Object' && myTypeof(articles) !== "Array") || myTypeof(manyArticles) !== "Boolean"){
        throwError("insert syntax error")
    }
    let payload = {
        articles,
        manyArticles
    }
    return api.post('/articles/insert',payload)
}

/**
 * @param {Number} id 更新id
 * @param {Object} update 更新参数
 */
export const updateArticles = (id,update) => {
    if(myTypeof(id) !== "Number" || myTypeof(update) !== "Object"){
        console.log('update',myTypeof(id),myTypeof(update));
        throwError(`update syntax error,unexpected ${myTypeof(update)}`)
    }
    let payload = {
        update
    }
    return api.post(`/articles/update/${id}`,payload)
}