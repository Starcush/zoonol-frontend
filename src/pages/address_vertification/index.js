'use client';

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button } from 'antd';
import { storeService } from '@/services/api/store';
import Image from 'next/image';
import * as Icon from '@/icons/icon';

export default function AddressVertification() {
  const [isLoading, setIsLoading] = useState(false);
  // const [stores, setStores] = useState([]);

  // /**
  //  * @brief : 전체 스토어 데이터 가져옴.
  //  */
  // useEffect(() => {
  //   const fetchInitalStoreData = async () => {
  //     const { getStoreList } = storeService;
  //     const { stores } = await getStoreList();
  //     setStores(stores);
  //   };
  //   fetchInitalStoreData();
  // }, []);

  // /**
  //  * @brief : 스토어 초기화
  //  */
  // const resetStore = () => {
  //   setStores([]);
  // };
  
  // /**
  //  * @brief : 스토어 삭제
  //  * @param {*} seq : 삭제 할 SEQ
  //  */
  // const fetchDeleteStore = async ({ seq }) => {
  //   const { stores } = await storeService.deleteStoreBySeq({ seq });
  //   if (stores > 0) {
  //     // 삭제되면 stores 비워서 검색했던 내역 삭제.?
  //     // resetStore();
  //   }
  // };

  // /**
  //  * @brief : 스토어 수정
  //  * @param {*} seq : 수정 할 SEQ
  //  */
  // const fetchUpdateStore = async (storeInfo) => {
  //   const { stores } = await storeService.updateStore({ storeInfo });
  //   if (stores > 0) {
  //     // 삭제되면 stores 비워서 검색했던 내역 삭제.?
  //     // resetStore();
  //   }
  // };

  const ZOONOL_ADDRESS_VERTIFICATION_PAGE_TITLE = '주인아 검증해..';

  const onVertification = async () => {
    console.log("SHI ::: 주소 검증 버튼");
    // 로딩 필요함.. 혹은 버튼 더 못누르게 disable 필요.

    // setIsLoading(true);
    const { stores, alivedStores, removedStores } = await storeService.naverAddressVertification();
    // setIsLoading(false);
    
    console.log("SHI stores ::: ", stores);
    console.log("SHI alivedStores ::: ", alivedStores);
    console.log("SHI removedStores ::: ", removedStores);
  }
  return (
    <Wrapper>
      <ZoonolLogoBox>
        <Image src={Icon.zoonolPlaceIcon} alt="zoonol-place-icon" width={45} height={45} />
        <ZoonolLogoText>{ZOONOL_ADDRESS_VERTIFICATION_PAGE_TITLE}</ZoonolLogoText>
      </ZoonolLogoBox>
      {isLoading ? (
        <LoadingWrapper>로딩중...</LoadingWrapper>
      ) : (
        <Button onClick={() => onVertification()}>주소 검증 버튼</Button>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div``;

const ZoonolLogoBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 20px 0 20px 0;
`;

const ZoonolLogoText = styled.div`
  height: 100%;
  line-height: 50px;
  font-size: 40px;
  font-weight: bold;
  text-align: center;
  margin: 0 0 0 15px;
  font-family: 'Pretendard';
`;

const LoadingWrapper = styled.div`
  font-weight: 600;
  padding: 10px;
`;