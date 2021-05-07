import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

export const request = axios.create({
  baseURL: BASE_URL,
});

request.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (e) => {
    console.log(e.message, '数据请求错误！');
    throw e;
  }
);
