import { defaultAxios } from '@/lib/axios';

const storeService = {
  async getStoreList() {
    const { data } = await defaultAxios.get('/store/list');
    return data;
  },
  async getStoreByName ({ keyword }) {
    const queryParams = { name : keyword };
    const { data } = await defaultAxios.get('/store/list-by-name', {
        params: queryParams
      }
    );
    return data;
  },
  async insertStore ({ storeInfo }) {
    const queryParams = { storeInfo };
    const { data } = await defaultAxios.post('/store/insert-store', {
        params: queryParams
      },
      {}
    );
    return data;
  },
  async deleteStoreBySeq ({ seq }) {
    const queryParams = { seq };
    const { data } = await defaultAxios.get('/store/delete-by-seq', {
        params: queryParams
      }
    );
    return data;
  },
  async updateStore ({ storeInfo }) {
    const queryParams = { storeInfo };
    const { data } = await defaultAxios.post('/store/update-store', {
        params: queryParams
      },
      {}
    );
    return data;
  },
}

export { storeService };