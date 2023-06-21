import { useQuery } from '@tanstack/react-query';
import { storeService } from '@/services/api/store';

const keys = {
  list: ['store', 'list'],
};

const storeQuery = {
  async useStores(params) {
    return useQuery({
      queryKey: keys.list,
      queryFn: storeService.getStoreList,
      ...params,
    });
  },
};

export { keys, storeQuery };
