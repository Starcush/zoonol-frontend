'use client';

import { useState } from 'react';
import styled from 'styled-components';
import { Button, Input } from 'antd';
import { storeService } from '@/services/api/store';
import { StoreList } from '@/components/admin/StoreList';
import { InsertPopup, DeletePopup, UpdatePopup } from '@/components/admin/Popup';
import Image from 'next/image';
import * as Icon from '@/icons/icon';

export default function Admin() {
  const [stores, setStores] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [showInsertPopup, setShowInsertPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [selectStore, setSelectStore] = useState(null);

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

  const onSearch = () => {
    fetchGetStoreData(keyword);
  };

  const resetStore = () => {
    setStores([]);
  };

  const fetchInsertStore = async (storeInfo) => {
    const { stores } = await storeService.insertStore({ storeInfo });
    if (stores > 0) {
      resetStore();
      closeInsertPopup();
    }
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
  const fetchUpdateStore = async (storeInfo) => {
    const { stores } = await storeService.updateStore({ storeInfo });
    if (stores > 0) {
      // 삭제되면 stores 비워서 검색했던 내역 삭제.?
      // resetStore();
      onSearch();
      closeUpdatePopup();
    }
  };

  /**
   * @brief : 팝업
   */
  // 스토어 추가 팝업
  const openInsertPopup = () => {
    setShowInsertPopup(true);
  };

  const closeInsertPopup = () => {
    setShowInsertPopup(false);
  };

  // 스토어 삭제 팝업
  const openDeletePopup = (store) => {
    setSelectStore(store);
    setShowDeletePopup(true);
  };

  const closeDeletePopup = () => {
    setSelectStore(null);
    setShowDeletePopup(false);
  };

  // 스토어 수정 팝업
  const openUpdatePopup = (store) => {
    setSelectStore(store);
    setShowUpdatePopup(true);
  };

  const closeUpdatePopup = () => {
    setSelectStore();
    setShowUpdatePopup(false);
  };

  const ZOONOL_ADMIN_PAGE_TITLE = '주인아 관리하자';

  return (
    <Wrapper>
      <ZoonolLogoBox>
        <Image src={Icon.zoonolPlaceIcon} alt="zoonol-place-icon" width={45} height={45} />
        <ZoonolLogoText>{ZOONOL_ADMIN_PAGE_TITLE}</ZoonolLogoText>
      </ZoonolLogoBox>
      <TableWrapper>
        <TableHeader>
          <SearchBox>
            <Input
              style={{ width: 300, marginRight: 10 }}
              onChange={onChangeSearchInput}
              onKeyDown={onKeyPressSearchInput}
              placeholder="찾을 가게 이름을 입력해주세요."
            />
            <Button onClick={() => onSearch()}>검색</Button>
          </SearchBox>
          <InsertBox>
            <Button type="primary" onClick={openInsertPopup}>
              장소 추가
            </Button>
          </InsertBox>
        </TableHeader>
        <StoreList
          stores={stores}
          openDeletePopup={openDeletePopup}
          openUpdatePopup={openUpdatePopup}
        />
      </TableWrapper>
      <InsertPopup
        fetchInsertStore={fetchInsertStore}
        open={showInsertPopup}
        closeInsertPopup={closeInsertPopup}
      />
      <DeletePopup
        open={showDeletePopup}
        storeInfo={selectStore}
        closeDeletePopup={closeDeletePopup}
        fetchDeleteStore={fetchDeleteStore}
      />
      {selectStore && (
        <UpdatePopup
          open={showUpdatePopup}
          storeInfo={selectStore}
          closeUpdatePopup={closeUpdatePopup}
          fetchUpdateStore={fetchUpdateStore}
        />
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

const SearchBox = styled.div`
  display: flex;
`;

const InsertBox = styled.div``;

const TableWrapper = styled.div`
  padding: 0 30px;
`;

const TableHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;
