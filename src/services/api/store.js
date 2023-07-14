import { defaultAxios } from '@/lib/axios';

const storeService = {
  async getStoreList() {
    const { data } = await defaultAxios.get('/store/list');
    return data;
  },
};

export { storeService };
