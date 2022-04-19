export function myTypeof(arg) {
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

export function throwError(message){
    throw new Error(message)
}

/**
 * 
 * @param {String} date "YYYY/MM/DD"
 * @return {String} "YYYY年MM月DD"
 */
export function dateFormat(date){
    let formatDate = new Date(date) //get format date
    let yy = formatDate.getFullYear()
    let mm = formatDate.getMonth() + 1
    let dd = formatDate.getDate()

    return {
        format :  `${yy}年${mm}月${dd}日`,
        yy,
        mm,
        dd
    }
}

/**
 * 
 * @param {Function} fn 回调函数 
 * @param {Number} delay delay-time 
 */
export function debounce(fn,delay = 1000){
    //点击之后，再数秒内点击有效但是不会执行，在数秒后执行函数，如果一直点击就一直刷新计时器
    if(typeof fn !== 'function' || typeof delay !== 'number') 
        throw new Error('syntax error in throttle')
    let timer
    return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(()=> {
            fn(...args)
        },delay)
    }
}

export function throttle(fn,delay = 1000){
    //n秒内只执行一次
    if(typeof fn !== 'function' || typeof delay !== 'number') 
        throw new Error('syntax error in throttle')
    let timer
    return (...args) => {
        if(timer) return 
        timer = setTimeout(()=>{
            fn(...args)
            clearTimeout(timer) //n秒后自动执行清除定时器
        },delay)
    }
}