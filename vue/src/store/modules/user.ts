import { defineStore } from 'pinia';
import {IUser, IUserState} from '@/types/store/user';
import { getUserData, signin } from '@/helpers/request/github.api';

export const useUserStore = defineStore(
  'user',
  {
    state: (): IUserState => ({
      data: {},
      loading: false,
      access_token: '',
    }),
    actions: {
      SET_TOKEN(token: string) {
        localStorage.setItem('access_token', token);
        this.access_token = token;
      },
      LOGOUT() {
        this.SET_TOKEN('');
      },
      async SIGN_IN(code: string) {
        this.loading = true;
        try {
          const token = await signin(code);
          if (token) this.SET_TOKEN(token);
        } catch (e) {
          console.error(e);
        } finally {
          this.loading = false;
        }
      },
      async GET_USER_DATA() {
        this.loading = true;
        try {
          const user = await getUserData();
          if (user) this.data = user;
        } catch (e) {
          console.error(e);
        } finally {
          this.loading = false;
        }
      },
    },
  },
);
