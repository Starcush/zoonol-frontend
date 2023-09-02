import { useState, createContext } from 'react';
import styled from 'styled-components';
import { storeService } from '@/services/api/store';
import { StoreList } from '@/pages/admin/components/StoreList';
import { InsertPopup, DeletePopup, UpdatePopup } from '@/pages/admin/popup/Popup';

import Image from 'next/image';
import * as Icon from '@/icons/icon';

export const AdminContext = createContext();

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

  const storeInfoArr = [
    { id: 'zoonol_place', name: 'zoonolPlace', text: '', dataType: 'int' },
    { id: 'naver_store_id', name: 'naverStoreId', text: '네이버 스토어 ID', dataType: 'int' },
    { id: 'name', name: 'name', text: '가게 명', dataType: 'char' },
    { id: 'phone_number', name: 'phoneNumber', text: '전화번호', dataType: 'char' },
    { id: 'homepage', name: 'homepage', text: '홈페이지', dataType: 'char' },
    { id: 'description', name: 'description', text: '가게 설명', dataType: 'text' },
    { id: 'convenience', name: 'convenience', text: '편의 시설', dataType: 'text' },
    { id: 'short_address', name: 'shortAddress', text: '짧은 주소', dataType: 'char' },
    { id: 'address', name: 'address', text: '기존 주소', dataType: 'char' },
    { id: 'need_cage', name: 'needCage', text: '케이지 여부', dataType: 'int' },
    // { id: 'road_address', name: 'roadAddress', text: '도로명 주소', dataType: 'char' },
    // { id: 'lat', name: 'lat', text: '경도', dataType: 'double' },
    // { id: 'lng', name: 'lng', text: '위도', dataType: 'double' },
    { id: 'map_url', name: 'mapUrl', text: '지도 URL', dataType: 'char' },
    { id: 'category_seq', name: 'categorySeq', text: '카테고리 시퀀스', dataType: 'int' },
    // todo : infoUpdatedAt 삭제 예정
    // { id: 'info_updated_at', name: 'infoUpdatedAt', text: '', dataType: 'date' },
    { id: 'off_leash', name: 'offLeash', text: '', dataType: 'int' },
    { id: 'large_dog_available', name: 'largeDogAvaiable', text: '', dataType: 'int' },
    { id: 'thumbnail', name: 'thumbnail', text: '', dataType: 'char' },
    { id: 'additional_info', name: 'additionalInfo', text: '', dataType: 'char' },
    { id: 'zoonol_feed_url', name: 'zoonolFeedUrl', text: '', dataType: 'char' },
  ];

  /**
   * @brief : 스토어 검색
   * @param {*} keyword : 검색 키워드
   */
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

  const resetStore = () => {
    setStores([]);
  };

  /**
   * @brief : 스토어 추가
   */
  // INSERT 기능 및 함수.
  const [inputs, setInputs] = useState({
    zoonolPlace: '',
    naverStoreId: '',
    name: '',
    needCage: '',
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
    // infoUpdatedAt: '', todo: 이거 지우기로 함
    offLeash: '',
    largeDogAvailable: '',
    thumbnail: '',
    additionalInfo: '',
    zoonolFeedUrl: '',
  });

  const resetInputs = () => {
    setInputs({
      zoonolPlace: '',
      naverStoreId: '',
      name: '',
      needCage: '',
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
      // infoUpdatedAt: '', todo: 이거 지우기로 함
      offLeash: '',
      largeDogAvailable: '',
      thumbnail: '',
      additionalInfo: '',
      zoonolFeedUrl: '',
    });
  };

  const fetchInsertStore = async ({ roadAddress, lat, lng }) => {
    let storeInfo = Object.assign({}, { ...inputs, roadAddress, lat, lng });
    storeInfo = checkStoreData(storeInfo);
    const { stores } = await storeService.insertStore({ storeInfo: storeInfo });
    if (stores > 0) {
      resetStore();
      closeInsertPopup();
    }
  };

  const checkStoreData = (storeInfo) => {
    for (const key in storeInfo) {
      const val = storeInfo[key];
      const dataType = checkStoreDataType(key);
      if (dataType == 'int' && val == '') {
        storeInfo[key] = 0;
      } else if (dataType == 'double' && val == '') {
        storeInfo[key] = 0;
      }
    }

    return storeInfo;
  };

  const checkStoreDataType = (key) => {
    let dataType = 'text';
    switch (key) {
      case 'zoonolPlace':
      case 'naverStoreId':
      case 'categorySeq':
      case 'offLeash':
      case 'largeDogAvailable':
      case 'needCage':
        dataType = 'int';
        break;
      case 'name':
      case 'phoneNumber':
      case 'homepage':
      case 'shortAddress':
      case 'address':
      case 'roadAddress':
      case 'mapUrl':
      case 'thumbnail':
      case 'additionalInfo':
      case 'zoonolFeedUrl':
        dataType = 'char';
        break;
      case 'description':
      case 'convenience':
        dataType = 'text';
        break;
      case 'lat':
      case 'lng':
        dataType = 'double';
        break;
      // todo : infoUpdatedAt 삭제 예정
      // case 'infoUpdatedAt':
      //   dataType = 'date';
      //   break;
    }
    return dataType;
  };

  const getLatLngByRoadAddress = async () => {
    const address = inputs['address'];
    // 도로명 주소
    let roadAddress = '';
    // 위도
    let lat = 0;
    // 경도
    let lng = 0;
    if (address != '') {
      await window.naver.maps.Service.geocode(
        {
          query: address,
          // 코코샌드 주소
          // query: '서울특별시 마포구 동교동 148-7 2층',
        },
        (status, response) => {
          if (status == 200) {
            const addresses = response['v2']['addresses'];
            if (addresses.length > 0) {
              const addressObj = addresses[0];
              roadAddress = addressObj['roadAddress'];
              lat = addressObj['x'];
              lng = addressObj['y'];
              setAddressReqInsert({ roadAddress, lat, lng });
            } else {
              setAddressReqInsert({ roadAddress, lat, lng });
            }
          } else {
            console.log('SHI getLatLngByRoadAddress ::: ', status, response);
          }
        }
      );
    } else {
      setAddressReqInsert({ roadAddress, lat, lng });
    }
  };

  const setAddressReqInsert = ({ roadAddress, lat, lng }) => {
    // 주소값이 없으면 위도 경도 0으로 초기화.
    setInputs({
      ...inputs,
      roadAddress,
      lat,
      lng,
    });
    fetchInsertStore({ roadAddress, lat, lng });
  };

  const onChangeInputValue = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  /**
   * @brief : 스토어 삭제
   * @param {*} seq : 삭제 할 SEQ
   */
  const fetchDeleteStore = async ({ seq }) => {
    const { stores } = await storeService.deleteStoreBySeq({ seq });
    if (stores > 0) {
      // 삭제되면 stores 비워서 검색했던 내역 삭제.?
      resetStore();
      closeDeletePopup();
    }
  };

  /**
   * @brief : 스토어 수정
   * @param {*} seq : 수정 할 SEQ
   */
  const fetchUpdateStore = async ({ isUpdatedAddress, seq, roadAddress, lat, lng }) => {
    let storeInfo = Object.assign({}, { ...inputs, seq });
    if (isUpdatedAddress) {
      storeInfo = Object.assign({}, { ...inputs, seq, roadAddress, lat, lng });
    }
    storeInfo = checkStoreData(storeInfo);
    const { stores } = await storeService.updateStore({ storeInfo: storeInfo });
    if (stores > 0) {
      // 삭제되면 stores 비워서 검색했던 내역 삭제.?
      // resetStore();
      onSearch();
      closeUpdatePopup();
    }
  };

  const checkUpdatedAddress = () => {
    const prevAddress = selectStore['address'];
    const curAddress = inputs['address'];
    if (curAddress !== prevAddress) {
      return true;
    }
    return false;
  };

  const updateLatLngByRoadAddress = async ({ isUpdatedAddress, seq }) => {
    const address = inputs['address'];
    // 도로명 주소
    let roadAddress = '';
    // 위도
    let lat = 0;
    // 경도
    let lng = 0;
    if (address != '') {
      await window.naver.maps.Service.geocode(
        {
          query: address,
        },
        (status, response) => {
          if (status == 200) {
            const addresses = response['v2']['addresses'];
            if (addresses.length > 0) {
              const addressObj = addresses[0];
              roadAddress = addressObj['roadAddress'];
              lat = addressObj['x'];
              lng = addressObj['y'];
              setAddressReqUpdate({ isUpdatedAddress, seq, roadAddress, lat, lng });
            } else {
              setAddressReqUpdate({ isUpdatedAddress, seq, roadAddress, lat, lng });
            }
          } else {
            console.log('SHI updateLatLngByRoadAddress ::: ', status, response);
          }
        }
      );
    } else {
      setAddressReqUpdate({ isUpdatedAddress, seq, roadAddress, lat, lng });
    }
  };

  const setAddressReqUpdate = ({ isUpdatedAddress, seq, roadAddress, lat, lng }) => {
    // 주소값이 없으면 위도 경도 0으로 초기화.
    setInputs({
      ...inputs,
      roadAddress,
      lat,
      lng,
    });
    fetchUpdateStore({ isUpdatedAddress, seq, roadAddress, lat, lng });
  };

  const setInputByStoreInfo = (storeInfo) => {
    setInputs(storeInfo);
  };

  /**
   * @brief : 팝업
   */
  // 스토어 추가 팝업
  const openInsertPopup = () => {
    resetInputs();
    setShowInsertPopup(true);
  };
  const closeInsertPopup = () => {
    setShowInsertPopup(false);
    resetInputs();
  };

  // 스토어 삭제 팝업
  const openDeletePopup = (store) => {
    setSelectStore(store);
    setShowDeletePopup(true);
  };
  const closeDeletePopup = () => {
    setSelectStore();
    setShowDeletePopup(false);
  };

  // 스토어 수정 팝업
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

  const ZOONOL_ADMIN_PAGE_TITLE = '주인아 관리하자';

  return (
    <>
      <ZoonolLogoBox>
        <Image src={Icon.zoonolPlaceIcon} alt="zoonol-place-icon" width={45} height={45} />
        <ZoonolLogoText>{ZOONOL_ADMIN_PAGE_TITLE}</ZoonolLogoText>
      </ZoonolLogoBox>
      <SearchBox>
        <SearchInput
          onChange={onChangeSearchInput}
          onKeyDown={onKeyPressSearchInput}
          placeholder="찾을 가게 이름을 입력해주세요."
        />
        <SearchButton onClick={onSearch}>검색</SearchButton>
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
        <InsertButton onClick={openInsertPopup}>스토어 추가</InsertButton>
      </InsertBox>
      {showInsertPopup ? (
        <AdminContext.Provider value={{ storeInfoArr }}>
          <InsertPopup
            onChangeInput={onChangeInputValue}
            getLatLngByRoadAddress={getLatLngByRoadAddress}
            closeInsertPopup={closeInsertPopup}
          />
        </AdminContext.Provider>
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
        <AdminContext.Provider value={{ storeInfoArr }}>
          <UpdatePopup
            storeInfo={inputs}
            onChangeInput={onChangeInputValue}
            updateLatLngByRoadAddress={updateLatLngByRoadAddress}
            checkUpdatedAddress={checkUpdatedAddress}
            closeUpdatePopup={closeUpdatePopup}
            fetchUpdateStore={fetchUpdateStore}
          />
        </AdminContext.Provider>
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
