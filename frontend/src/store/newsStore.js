import { create } from 'zustand';
import api from '../api/axios';

const useNewsStore = create((set) => ({
  newsList: [],
  topNews: [],
  singleNews: null,
  loading: false,
  error: null,

  fetchTopNews: async () => {
    try {
      const { data } = await api.get('/news/top');
      set({ topNews: data });
    } catch (error) {
      console.error(error);
    }
  },

  fetchAllNews: async (category = 'All', search = '') => {
    set({ loading: true });
    try {
      let url = `/news?category=${category}`;
      if (search) url += `&search=${search}`;
      const { data } = await api.get(url);
      set({ newsList: data.news, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  fetchSingleNews: async (id) => {
    set({ loading: true });
    try {
      const { data } = await api.get(`/news/${id}`);
      set({ singleNews: data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));

export default useNewsStore;