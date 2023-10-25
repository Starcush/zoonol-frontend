import { defaultAxios } from '@/lib/axios';

const storeService = {
  async getStoreList() {
    const { data } = await defaultAxios.get('/store/list');
    return data;
  },
  async getStoreByName({ keyword }) {
    const queryParams = { name: keyword };
    const { data } = await defaultAxios.get('/store/list-by-name', {
      params: queryParams,
    });
    return data;
  },
  async insertStore({ storeInfo }) {
    const { data } = await defaultAxios.post('/store', storeInfo, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data?.id;
  },
  async deleteStoreBySeq({ seq }) {
    const queryParams = { seq };
    const { data } = await defaultAxios.get('/store/delete-by-seq', {
      params: queryParams,
    });
    return data;
  },
  async updateStore({ storeInfo }) {
    const { data } = await defaultAxios.patch('/store', storeInfo, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  },
};

export { storeService };
