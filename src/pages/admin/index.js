import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { defaultAxios } from '@/lib/axios';

export default function Admin(){
  const [stores, setStores] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [keyword, setKeyword] = useState([]);

  // useEffect(() => {
  //   const fetchGetStoreData = async (keyword) => {
  //     const queryParams = {name : keyword};
  //     const { data } = await defaultAxios.get('/store/getStore', {
  //       params: queryParams
  //     }
  //     );
  //     const { stores } = data;
  //     setStores(stores);
  //     console.log("SHI ::: stores :: ", stores);
  //     setIsLoading(false);
  //   };
  //   fetchGetStoreData();
  // }, []);
  const fetchGetStoreData = async (keyword) => {
    const queryParams = {name : keyword};
    const { data } = await defaultAxios.get('/store/getStore', {
      params: queryParams
    }
    );
    const { stores } = data;
    setStores(stores);
    console.log("SHI ::: stores :: ", stores);
    setIsLoading(false);
  };

  const onChangeSearchInput = (e) => {
    const { value } = e.target;
    setKeyword(value);
  }

  const onClickSearchBtn = () => {
    fetchGetStoreData(keyword);
  }

  const getStoreList = (stores) => {
    let ch = [];
    for (const key in stores) {
        const store = stores[key];
        ch.push(
          getStoreDiv(store)
        )
    }
    return ch;
  }

  const getStoreDiv = (store) => {
    const divObj = (
      <div key={store.seq}>
        <span>{store.name}</span>
        <span> | </span>
        <span>{store.seq}</span>
      </div>
    );
    return divObj;
  }

  return(
    <>
      {isLoading ? (
          <LoadingWrapper>반려견 동반 장소 지도 로딩중...</LoadingWrapper>
        ) : (
          <>
            <input onChange={onChangeSearchInput}/>
            <button onClick={onClickSearchBtn}>검색</button>
            {getStoreList(stores)}
          </>
        )}
    </>
  )
}

const LoadingWrapper = styled.div`
  font-weight: 600;
  padding: 10px;
`;