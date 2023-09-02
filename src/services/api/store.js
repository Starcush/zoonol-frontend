import { defaultAxios } from '@/lib/axios';

const storeService = {
  async getStoreList() {
    console.log('defaultAxios: ', defaultAxios);
    const { data } = await defaultAxios.get('/store/list');
    return data;
  },
};

export { storeService };
