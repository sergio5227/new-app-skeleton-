import axios  from 'axios';
//import store from '../store';
/* axios.interceptors.request.use(
    (config) => {
        const state = store.getState();
        const token = state?.app?.user?.token || '';
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        //config.headers.agentFrom = 'mobile';
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
); */
export default axios; 