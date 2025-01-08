import axios from "axios";

const instance = axios.create(
    {
        baseURL: "http://localhost:8101/api",
        timeout: 10000,
        headers: {}
    }
)

instance.interceptors.request.use(
    config => {
        config.headers['Access-Control-Allow-Origin'] = '*'
        config.headers['Content-Type'] = 'application/json;charset=UTF-8'
        return config
    }
)

// 使用响应拦截器取出响应值
instance.interceptors.response.use(
    response => {
        const data = response.data
        if (data.code === 0) {
            // alert(1)
            return data.data
        }
        console.error("request error", data)
        return response.data
    },
    error => {
        return Promise.reject(error)
    }
)

export default instance;