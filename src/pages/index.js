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
        <title>zoonol</title>
        <meta name="description" content="description" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
