import { defaultAxios } from '@/lib/axios';

export default class StoreService {
  async getStoreList() {
    const { data } = await defaultAxios.get('/store/list');
    return data?.stores;
  }
}
