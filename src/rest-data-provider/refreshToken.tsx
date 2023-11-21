import axios from "axios";
import { TOKEN_KEY } from "../authProvider";


const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001',
  withCredentials: true
})

axiosInstance.interceptors.request.use(
    async config => {
      // if(!config.headers['Skip-Auth'])
      if(config.url !== '/auth/admin' && config.url !== '/auth/logout')
      {
        const token = localStorage.getItem(TOKEN_KEY)
        console.log(config.data)
          config.headers = { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
      }
      return config;
    },
    error => {
      Promise.reject(error)
  });

  axiosInstance.interceptors.response.use((response) => {
    return response
  }, async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      try{
        const data = await axios.get('http://localhost:3001/auth/refresh', { withCredentials: true })
        console.log('in refresh')
        if(data?.status === 401) throw new Error()
        const { accessToken } = data?.data ?? ''
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;
        localStorage.setItem(TOKEN_KEY, accessToken)
        return axiosInstance(originalRequest);
      }
      catch(e)
      {
        await axios.get('http://localhost:3001/auth/logout', { withCredentials: true })
        localStorage.removeItem(TOKEN_KEY)
        console.error(e)
      }
    }
    return Promise.reject(error);
  });

export default axiosInstance