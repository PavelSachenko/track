import axios from 'axios';

import handleNetError from '../utils/handleNetError';

const protocol = 'https://';
const currentHostname = window && window.location && window.location.hostname;

let backendHostname;

if (currentHostname === 'localhost') {
  backendHostname = 'api.track-agent.agency';
}
else if (currentHostname === '192.168.1.128') {
    backendHostname = 'api.track-agent.agency';
}
else if (currentHostname === 'app.track-agent.agency') {
    backendHostname = 'api.track-agent.agency';
}
else if (currentHostname === 'app.gencytrack.me') {
  backendHostname = 'api.gencytrack.me';
}
else if (currentHostname && currentHostname !== 'chromewebdata') {
  backendHostname = currentHostname;
}
else {
  backendHostname = process.env.REACT_APP_BACKEND_HOST || 'unknownhosterror';
}

export const API_ROOT = protocol + backendHostname + '/api/';

const axiosInstance = axios.create({ baseURL: API_ROOT });


// axios.defaults.baseURL = API_ROOT;

// if (process.env.NODE_ENV === 'development') {
//   console.log('add axios credentials conf');

//   axios.defaults.withCredentials = true;
// }

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (config.url && !['login', 'register'].includes(config.url)) {
      config.headers.Authorization = 'Bearer ' + token;
    }

    console.log('BASE', config);

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  response => {
    // Do something with response data
    return Promise.resolve(response);
  },
  err => {
    // Do something with response err
    if (err.response) {
      console.log('API ERROR:) - ', err.response.data.code);
      console.log('API ERROR22:) - ', err.response.data);
    }
    else {
      console.error('API ERROR:) - ', err);
      console.log('API ERROR22:) - ', err.message);
    }

    handleNetError(err);

    return Promise.reject(err);
  }
);

export default axiosInstance;
