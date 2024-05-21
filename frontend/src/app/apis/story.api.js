import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BACKEND_API;

export const STORYAPI = {
    saveStory: (data) => axios.post(`${BASE_URL}/api/story`, data),
    getStorys: () => axios.get(`${BASE_URL}/api/story`),
    getStoryById: (id) => axios.get(`${BASE_URL}/api/story/${id}`),
    getStorysByUserId: (id) => axios.get(`${BASE_URL}/api/story/user/${id}`),
    updateStoryById: (id, data) => axios.put(`${BASE_URL}/api/story/${id}`, data),
    deleteStoryById: (id) => axios.delete(`${BASE_URL}/api/story/${id}`),
};