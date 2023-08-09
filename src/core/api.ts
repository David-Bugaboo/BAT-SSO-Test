import axios from 'axios';
import AppConfig from '../core/appConfig';

const axiosInstance = axios.create({
  baseURL: AppConfig.baseUrl,
});

axiosInstance.interceptors.request.use(config => {
  // const USER_TOKEN = SessionService.getInstance().get(
  //   SessionServiceKeys.USER_TOKEN,
  // );
  //config.headers.Authorization = `Bearer ${USER_TOKEN}`;
  return config;
});

export const api = axiosInstance;
