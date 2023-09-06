import axios from 'axios';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';

export const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export const getAllProperties = async () => {
  try {
    const res = await api.get('/residency', {
      timeout: 10 * 1000,
    });
    if (res.status === 400 || res.status === 500) {
      throw res.data;
    }
    return res.data.data;
  } catch (error) {
    toast.error('Something went wrongs');
    throw error;
  }
};

export const getProperty = async (id) => {
  try {
    const res = await api.get(`/residency/${id}`);
    if (res.status === 400 || res.status === 500) {
      throw res.data;
    }
    return res.data.data;
  } catch (error) {
    toast.error('Something went wrongs');
    throw error;
  }
};
