import { useQuery } from '@tanstack/react-query';
import StoreService from '@/services/api/store';

export default class StoreQuery {
  constructor() {
    this.storeServices = new StoreService();
    this.keys = {
      list: ['store', 'list'],
    };
  }

  useStores = async () => {
    return useQuery({
      queryKey: this.keys.list,
      queryFn: this.storeServices.getStoreList,
    });
  };
}
