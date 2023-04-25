import Head from 'next/head';
import styled from 'styled-components';
import Map from '@/components/map/Map';

export default function Home() {
  return (
    <>
      <Head>
        <title>zoonol</title>
        <meta name="description" content="description" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main style={{ margin: 0, padding: 0 }}>
        <Map />
      </main>
    </>
  );
}

const Wrapper = styled.div``;

const H1 = styled.h1``;
