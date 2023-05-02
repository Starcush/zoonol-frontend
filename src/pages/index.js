import { useState, useEffect } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { defaultAxios } from '@/lib/axios';
import Map from '@/components/map/Map';

export default function Home() {
  const [stores, setStores] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchInitalStoreData = async () => {
      const { data } = await defaultAxios.get('/store/list');
      const { stores } = data;
      setStores(stores);
      setIsLoading(false);
    };
    fetchInitalStoreData();
  }, []);

  return (
    <>
      <Head>
        <title>주인아 놀자</title>
        <meta name="description" content="description" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="naver-site-verification"
          content="0fc7af72b76c7d8fcc80542e10efae782d1dd4fe"
        />
        <meta property="og:title" content="주인아 놀자:주놀(zoonol)" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://zoonol.com" />
        <meta
          property="og:image"
          content="https://api.zoonol.com/assets/opengraph_image.jpg"
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
