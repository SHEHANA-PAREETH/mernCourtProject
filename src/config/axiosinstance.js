import axios from 'axios'

const AxiosInstance=axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

AxiosInstance.interceptors.request.use(function(config){
    const token=localStorage.getItem('token')
    if(token){
        config.headers['Authorization']="Bearer " +token
    }
    return config
})

// an expired, blocked or invalid session ends here, whichever page made the request
AxiosInstance.interceptors.response.use(
    (response)=>response,
    (error)=>{
        if(error?.response?.status===401 && error?.response?.data?.message==='unauthorized request'){
            localStorage.clear()
            if(window.location.pathname!=='/'){
                window.location.href='/'
            }
        }
        return Promise.reject(error)
    }
)

export default AxiosInstance
