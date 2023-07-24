import { useState, useEffect } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { storeService } from '@/services/api/store';
import Map from '@/components/map/Map';

export default function Home() {
  const [stores, setStores] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchInitalStoreData = async () => {
      const { getStoreList } = storeService;
      const { stores } = await getStoreList();
      setStores(stores);
      setIsLoading(false);
    };
    fetchInitalStoreData();
  }, []);

  return (
    <>
      <Head>
        <title>주인아 놀자</title>
        <meta name="description" content="반려견 동반이 가능한 가게 지도" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="naver-site-verification"
          content="23003489028ab313878e59743b6ee1c72353f4fb"
        />
        <meta property="og:title" content="주인아 놀자:주놀(zoonol)" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://zooonol.com" />
        <meta
          property="og:image"
          content="https://zoonol-bucket.nyc3.cdn.digitaloceanspaces.com/web-assets/opengraph_image.jpg"
        />
        <meta
          property="og:description"
          content="반려견 동반이 가능한 가게 지도"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {isLoading ? (
          <LoadingWrapper>반려견 동반 장소 지도 로딩중...</LoadingWrapper>
        ) : (
          <Map stores={stores} />
        )}
      </main>
    </>
  );
}

const LoadingWrapper = styled.div`
  font-weight: 600;
  padding: 10px;
`;
