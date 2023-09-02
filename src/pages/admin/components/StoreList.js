import { Fragment } from 'react';
import styled from 'styled-components';

const StoreList = ({ stores, openDeletePopup, openUpdatePopup }) => {
  const getStoreList = () => {
    const storeItemArr = [];
    for (const index in stores) {
      const store = stores[index];
      storeItemArr.push(getStoreItemObj(index, store));
    }
    return storeItemArr;
  };

  const onClickDeleteItem = (e, store) => {
    openDeletePopup(store);
  };

  const onClickUpdateItem = (e, store) => {
    openUpdatePopup(store);
  };

  const getStoreItemObj = (index, store) => {
    const storeItemObj = (
      <StoreItem key={store.seq}>
        <StoreItemLabelBox>
          <StoreItemLabel>{store.name}</StoreItemLabel>
          <StoreItemBlock />
          <StoreItemLabel>{store.address}</StoreItemLabel>
        </StoreItemLabelBox>
        <StoreItemButton
          onClick={(e) => {
            onClickDeleteItem(e, store);
          }}
        >
          삭제
        </StoreItemButton>
        <StoreItemButton
          onClick={(e) => {
            onClickUpdateItem(e, store);
          }}
        >
          수정
        </StoreItemButton>
      </StoreItem>
    );
    return storeItemObj;
  };

  return (
    <StoreListWrap>
      <StoreListBox>
        <StoreItem>
          <StoreItemLabelBox>
            <StoreItemLabel>이름</StoreItemLabel>
            <StoreItemBlock />
            <StoreItemLabel>주소</StoreItemLabel>
            <Fragment />
            <Fragment />
          </StoreItemLabelBox>
        </StoreItem>
        {getStoreList()}
      </StoreListBox>
    </StoreListWrap>
  );
};

export { StoreList };

const StoreListWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StoreListBox = styled.div`
  width: 80%;
  height: 600px;
  overflow: scroll;
  overflow-x: hidden;
`;

const StoreItem = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0;
`;

const StoreItemLabelBox = styled.div`
  display: flex;
  width: 80%;
  height: 100%;
`;

const StoreItemLabel = styled.span`
  display: block;
  flex-grow: 1;
  height: 100%;
  font-size: 18px;
  line-height: 40px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StoreItemBlock = styled.span`
  margin: 0 5px;
`;

const StoreItemButton = styled.button`
  height: 100%;
  padding: 0 5px;
  font-size: 15px;
  box-sizing: border-box;
  margin: 0 20px;
`;
