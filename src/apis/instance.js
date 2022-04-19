import axios from "axios";
import qs from "qs"
import {Message} from 'element-ui'

const instance = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout:5000,
}) //创建实例


instance.defaults.responseType = 'json'  //响应类型
instance.defaults.withCredentials = true //是否需要携带凭证
// instance.defaults.transformRequest = [ 
//     // eslint-disable-next-line    
//     data => qs.stringify(data)
// ]

instance.defaults.validateStatus = function(){
    return true
}

instance.interceptors.request.use(
    config=>{
        //do something
        return config
    },
    error => {
        console.log(error);
        return Promise.reject(error)
    }
)

instance.interceptors.response.use(
    response => {
        // eslint-disable-next-line    
        const res = response.data

        if(res.code !== 20000){
            Message({
                message: res.message || 'Error',
                type:'error',
                duration: 2 * 1000
            })
            // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
            //后台登录错误处理
            if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
                // to re-login
                // MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
                //   confirmButtonText: 'Re-Login',
                //   cancelButtonText: 'Cancel',
                //   type: 'warning'
                // }).then(() => {
                //   store.dispatch('user/resetToken').then(() => {
                //     location.reload()
                //   })
                // })
            }
            return Promise.reject(new Error(res.message || 'Error'))
        }else {
            return response
        }

    },
    error => {
        console.log('instance reponse err'  ,error);
        Message({
            message: error.message,
            type:'error',
            duration: 2 * 1000
        }) 
        return Promise.reject(error)
    }
)

const axiosMethod = ['get','post','delete'] // 请求方式
let api = {}
axiosMethod.forEach(method => {
    api[method] = function(url,data,config){
        return new Promise((resolve,reject)=>{
            instance[method](url,data,config)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    }
})

export default api
