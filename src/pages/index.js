import { useState, useEffect } from 'react';
import Head from 'next/head';
import { storeService } from '@/services/api/store';
import Map from '@/components/map/Map';
import { useStoreFilter } from '@/stores/store';

// 최신화된 Next.js 적용하는거 생각하기 -> React도 변화가 많아서 그것도 같이 배운다는 느낌
// 필터한 데이터를 여기서 다시 해줘야 하는건가?
// 필터한값을 별도로 나눠서 하자
// 그러면 이걸 드릴링을 해야하나?
// 그건 아닌거 같고

export default function Home() {
  const [stores, setStores] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { storeFilter } = useStoreFilter();
  // 이거가 filter에서 변경되야 하는데
  console.log('storeFilter: ', storeFilter);

  useEffect(() => {
    const fetchInitalStoreData = async () => {
      const { getStoreList } = storeService;
      const { stores } = await getStoreList(storeFilter);
      setStores(stores);
      setIsLoading(false);
    };
    fetchInitalStoreData();
  }, [storeFilter]);

  return (
    <>
      <Head>
        <title>주인아 놀자</title>
        <meta name="description" content="반려견 동반이 가능한 가게 지도" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="naver-site-verification" content="23003489028ab313878e59743b6ee1c72353f4fb" />
        <meta property="og:title" content="주인아 놀자:주놀(zoonol)" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://zooonol.com" />
        <meta
          property="og:image"
          content="https://zoonol-bucket.nyc3.cdn.digitaloceanspaces.com/web-assets/opengraph_image.jpg"
        />
        <meta property="og:description" content="반려견 동반이 가능한 가게 지도" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {isLoading ? (
          <div className="initial-loading-text">반려견 동반 장소 지도 로딩중...</div>
        ) : (
          <Map stores={stores} />
        )}
      </main>
    </>
  );
}
