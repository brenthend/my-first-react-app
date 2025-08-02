import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

export const getGroceries = async () => {
    const res = await axios.get(`${API_BASE_URL}/groceries`);
    const modified = res.data.map((item) => ({
        ...item,
        name: `${item.name} - GOOD`, 
        extra: `good item`
    }));

    return { ...res, data:modified };
};

export const getHardwareItems = () => {
   return axios.get(`${API_BASE_URL}/hardware`);
};

export const getCategories = () => {
    return axios.get(`${API_BASE_URL}/categories`);
};