// src/api/axios.js
import axios from 'axios';

const baseURL = 'http://0.0.0.0:8000/';

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true, // Required for sending cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add CSRF token to headers
axiosInstance.interceptors.request.use(
  async (config) => {
    // Only add CSRF token for non-GET requests
    if (config.method !== 'get') {
      // Get CSRF token from cookie
      const csrfToken = document.cookie
        .split('; ')
        .find((row) => row.startsWith('csrftoken='))
        ?.split('=')[1];

      if (csrfToken) {
        config.headers['X-CSRFToken'] = csrfToken;
      } else {
        // If no CSRF token exists, fetch it from the backend
        try {
          const response = await axios.get(`${baseURL}/get-csrf-token/`, {
            withCredentials: true,
          });
          config.headers['X-CSRFToken'] = response.data.csrf_token;
        } catch (error) {
          console.error('Error fetching CSRF token:', error);
        }
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;

// import axios from "axios";

// axios.defaults.baseURL = 'http://localhost:8000';
// axios.defaults.withCredentials = true;

// axios.defaults.xsrfCookieName = 'csrftoken';
// axios.defaults.xsrfHeaderName = 'X-CSRFToken';

// function getCsrfToken() {
//     const name = 'csrftoken';
//     const cookieValue = document.cookie
//       .split('; ')
//       .find(row => row.startsWith(name))
//       ?.split('=')[1];
//     return cookieValue;
//   }

//   // Set the CSRF token in Axios headers
// axios.defaults.headers.common['X-CSRFToken'] = getCsrfToken();

// const djangoWebInstance = axios.create({
//     baseURL: 'http://localhost:8000',

// });

// export default djangoWebInstance;
