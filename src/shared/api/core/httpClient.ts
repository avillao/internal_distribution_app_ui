import axios from 'axios';
// import { AuthService } from '../../features/auth/services/authService';

// const authService = AuthService.prototype.getInstance();

export const createHttpClient = (baseURL: string) => {
  const client = axios.create({
    baseURL,
    withCredentials: true,
  });

  // client.interceptors.response.use(
  //   res => res,
  //   async (error) => {
  //     if (error.response?.status === 401) {
  //       try {
  //         await authService.refresh();
  //       } catch {
  //         window.location.href = '/login';
  //       }
  //     }
  //     return Promise.reject(error);
  //   }
  // );

  return client;
};