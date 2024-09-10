import { defineStore } from 'pinia';
import { getUser } from '~/utils/auth';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    authToken: localStorage.getItem('authToken') || null,
    user: null,
  }),
  actions: {
    setToken(token) {
      this.authToken = token;
      localStorage.setItem('authToken', token);
    },
    removeToken() {
      this.authToken = null;
      localStorage.removeItem('authToken');
    },
    async fetchUser() {
      try {
        this.user = await getUser(this.authToken);
      } catch (err) {
        this.removeToken();
        throw new Error('Invalid token');
      }
    },
  },
  getters: {
    isLoggedIn: (state) => !!state.authToken,
  },
});
