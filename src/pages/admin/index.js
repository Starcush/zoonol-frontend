import { useState } from 'react';
import styled from 'styled-components';
import { storeService } from '@/services/api/store';
import { StoreList } from '@/pages/admin/components/StoreList';
import { InsertPopup, DeletePopup, UpdatePopup } from '@/pages/admin/popup/Popup';

import Image from 'next/image';
import * as Icon from '@/icons/icon';

// 검색 -> 추가 -> 삭제 -> 업데이트.
// 전체 리스트 보기.
// ant 디자인 참고할건가..?
// 이름, 카테고리(카테고리 테이블 연동 해서 카테고리 이름), 주소, 주놀플레이스인지
export default function Admin() {
  const [stores, setStores] = useState([]);
  const [keyword, setKeyword] = useState();
  const [showInsertPopup, setShowInsertPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [selectStore, setSelectStore] = useState();

  const fetchGetStoreData = async (keyword) => {
    const { stores } = await storeService.getStoreByName({ keyword });
    setStores(stores);
  };

  const onChangeSearchInput = (e) => {
    const { value } = e.target;
    setKeyword(value);
  };

  const onKeyPressSearchInput = (e) => {
    if (e.key == 'Enter') {
      onSearch();
    }
  };

  const onSearch = (e) => {
    fetchGetStoreData(keyword);
  };

  const fetchInsertStore = async () => {
    const stroeInfo = inputs;
    const { stores } = await storeService.insertStore({ storeInfo: stroeInfo });
    if (stores == 1) {
      resetStore();
      closeInsertPopup();
    }
  };

  // 삭제
  const resetStore = () => {
    setStores([]);
  };

  const fetchDeleteStore = async (seq) => {
    const { stores } = await storeService.deleteStoreBySeq({ seq });
    if (stores == 1) {
      // 삭제되면 stores 비워서 검색했던 내역 삭제.?
      resetStore();
      closeDeletePopup();
    }
  };

  const fetchUpdateStore = async (seq) => {
    const storeInfo = inputs;
    storeInfo['storeSeq'] = seq;

    const { stores } = await storeService.updateStore({ storeInfo: storeInfo });
    if (stores == 1) {
      // 삭제되면 stores 비워서 검색했던 내역 삭제.?
      resetStore();
      closeUpdatePopup();
    }
  };

  // INSERT 기능 및 함수.
  const [inputs, setInputs] = useState({
    place: '',
    storeId: '',
    name: '',
    phoneNumber: '',
    homepage: '',
    description: '',
    convenience: '',
    shortAddress: '',
    address: '',
    roadAddress: '',
    lat: '',
    lng: '',
    mapUrl: '',
    categorySeq: '',
    infoUpdatedAt: '',
    offLeash: '',
    largeDog: '',
    thumbnail: '',
    additionalInfo: '',
    zoonolFeedUrl: '',
  });

  const resetInputs = () => {
    setInputs({
      place: '',
      storeId: '',
      name: '',
      phoneNumber: '',
      homepage: '',
      description: '',
      convenience: '',
      shortAddress: '',
      address: '',
      roadAddress: '',
      lat: '',
      lng: '',
      mapUrl: '',
      categorySeq: '',
      infoUpdatedAt: '',
      offLeash: '',
      largeDog: '',
      thumbnail: '',
      additionalInfo: '',
      zoonolFeedUrl: '',
    });
  };

  const setInputByStoreInfo = (storeInfo) => {
    setInputs(storeInfo);
  };

  const openInsertPopup = () => {
    resetInputs();
    setShowInsertPopup(true);
  };
  const closeInsertPopup = () => {
    setShowInsertPopup(false);
    resetInputs();
  };

  const openDeletePopup = (store) => {
    setSelectStore(store);
    setShowDeletePopup(true);
  };
  const closeDeletePopup = () => {
    setSelectStore();
    setShowDeletePopup(false);
  };

  const openUpdatePopup = (store) => {
    setInputByStoreInfo(store);
    setSelectStore(store);
    setShowUpdatePopup(true);
  };
  const closeUpdatePopup = () => {
    setSelectStore();
    setShowUpdatePopup(false);
    resetInputs();
  };

  const getLatLngByRoadAddress = async () => {
    // 코코샌드 주소
    await window.naver.maps.Service.geocode(
      {
        query: '서울특별시 마포구 동교동 148-7 2층',
      },
      (status, response) => {
        console.log('SHI status ::::  ', status);
        console.log('SHI response ::::  ', response);
        // setInputs({
        //   ...inputs,
        //   [name]: value
        // });
      }
    );
  };

  const onChangeInputValue = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const ZOONOL_ADMIN_PAGE_TITLE = '주인아 관리하자';

  return (
    <>
      <ZoonolLogoBox>
        <Image src={Icon.zoonolPlaceIcon} alt="zoonol-place-icon" width={45} height={45} />
        <ZoonolLogoText>{ZOONOL_ADMIN_PAGE_TITLE}</ZoonolLogoText>
      </ZoonolLogoBox>
      <SearchBox>
        <SearchInput
          onChange={(e) => {
            onChangeSearchInput(e);
          }}
          onKeyDown={(e) => {
            onKeyPressSearchInput(e);
          }}
          placeholder="찾을 가게 이름을 입력해주세요."
        />
        <SearchButton
          onClick={(e) => {
            onSearch(e);
          }}
        >
          검색
        </SearchButton>
      </SearchBox>
      {stores.length > 0 ? (
        <StoreList
          stores={stores}
          openDeletePopup={openDeletePopup}
          openUpdatePopup={openUpdatePopup}
        />
      ) : (
        <></>
      )}
      <InsertBox>
        <InsertButton
          onClick={(e) => {
            openInsertPopup(e);
          }}
        >
          스토어 추가
        </InsertButton>
      </InsertBox>
      {showInsertPopup ? (
        <InsertPopup
          onChangeInput={onChangeInputValue}
          fetchInsertStore={fetchInsertStore}
          closeInsertPopup={closeInsertPopup}
        />
      ) : (
        <></>
      )}
      {showDeletePopup ? (
        <DeletePopup
          storeInfo={selectStore}
          closeDeletePopup={closeDeletePopup}
          fetchDeleteStore={fetchDeleteStore}
        />
      ) : (
        <></>
      )}
      {showUpdatePopup ? (
        <UpdatePopup
          storeInfo={inputs}
          onChangeInput={onChangeInputValue}
          closeUpdatePopup={closeUpdatePopup}
          fetchUpdateStore={fetchUpdateStore}
        />
      ) : (
        <></>
      )}
    </>
  );
}
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
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 0 0 50px 0;
`;

const SearchInput = styled.input`
  width: 500px;
  height: 100%;
  margin: 0;
  padding: 0 15px;
  font-size: 20px;
  box-sizing: border-box;
`;

const SearchButton = styled.button`
  height: 100%;
  margin-left: 10px;
  padding: 0 15px;
  font-size: 20px;
`;

const InsertBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 50px 0 0 0;
`;

const InsertButton = styled.button`
  height: 50px;
  padding: 0 15px;
  font-size: 20px;
`;
