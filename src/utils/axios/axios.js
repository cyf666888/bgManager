// 引入axios核心库
import axios from 'axios'
import router from '../../router';
// 重新创建一个实例
const http = axios.create({
    baseURL: '/api'
});


// ---------拦截器高阶
// 请求拦截
http.interceptors.request.use(req => {
    let userInfo = sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : {};
    // console.log(userInfo.token);
    req.headers.authorization = userInfo.token;
    return req;
});

// 响应拦截
http.interceptors.response.use(res => {
    // console.log(res);
    //全局拦截错误之后，跳转到登录
    if (res.data.code == 403 || res.data.code == 500) {
        alert(res.data.msg);
        router.push('./login');
        return res;
    } else {
        return res
    }
})








// 导出http实例
export default http;