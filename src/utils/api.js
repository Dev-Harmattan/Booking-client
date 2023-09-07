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

export const createUser = async (email, token) => {
  try {
    await api.post(
      '/user/register',
      { email },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log('running user registration');
  } catch (error) {
    toast.error('Something went wrongs, Please try again');
    throw error;
  }
};

export const bookVisit = async (date, propertyId, email, token) => {
  try {
    await api.post(
      `/user/bookings/${propertyId}`,
      {
        date: dayjs(date).format('DD/MM/YYYY'),
        id: propertyId,
        email,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    toast.error('Error while booking a visit, Please try again');
    throw error;
  }
};

export const removeBooking = async (id, email, token) => {
  try {
    await api.post(
      `/user/cancelBooking/${id}`,
      {
        email,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    toast.error('Something went wrong, Please try again');

    throw error;
  }
};

export const getUserBookings = async (email, token) => {
  try {
    return await api.post(
      `/user/userBookings`,
      {
        userEmail: email,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    toast.error('Something went wrong, Please try again');
    throw error;
  }
};
