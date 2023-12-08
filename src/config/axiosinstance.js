import axios from 'axios'


const AxiosInstance=axios.create({
    baseURL: process.env.REACT_APP_BASE_URL
})

AxiosInstance.interceptors.request.use(function(config){
    const token=localStorage.getItem('token')
config.headers['Authorization']="Bearer " +token
config.headers['Access-control-Allow-Origin']='*'
return config
})
export default AxiosInstance