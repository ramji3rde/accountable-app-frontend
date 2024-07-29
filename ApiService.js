import axios from 'axios';
import { reactLocalStorage } from 'reactjs-localstorage'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';

const AxiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },

});

AxiosInstance.interceptors.request.use(
  async config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);
AxiosInstance.interceptors.response.use(
  res => {
    return res;
  },
  async err => {
    console.log(err, 'AxiosInstance AxiosInstance');
    console.log(err?.response?.status, 'err AxiosInstance');


    // reactLocalStorage.clear();
    // toast.success('Log Out SuccessFully');
    // window.location.href = '/'; 

    return Promise.reject(err);

  },
);

export default AxiosInstance;
