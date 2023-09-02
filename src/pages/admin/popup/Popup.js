import styled from 'styled-components';
import { AdminContext } from '@/pages/admin';
import { useContext } from 'react';

const PopupHeader = ({ title }) => {
  return (
    <PopupTop>
      <PopupTitle>{title}</PopupTitle>
    </PopupTop>
  );
};

const InsertPopup = ({ onChangeInput, getLatLngByRoadAddress, closeInsertPopup }) => {
  const { storeInfoArr } = useContext(AdminContext);

  const onClickInsertButton = (e) => {
    getLatLngByRoadAddress();
  };

  const onClickCloseButton = (e) => {
    closeInsertPopup();
  };

  const getStoreListObj = () => {
    const insertChild = [];

    for (const key in storeInfoArr) {
      const storeObj = storeInfoArr[key];
      insertChild.push(getStoreInputObj(storeObj, key));
    }
    return insertChild;
  };

  const getStoreInputObj = (storeObj, index) => {
    const insertInputObj = (
      <StoreItem key={storeObj.id}>
        <StoreItemLable htmlFor={storeObj.id}>{storeObj.id}</StoreItemLable>
        <StoreItemInput
          id={storeObj.id}
          name={storeObj.name}
          onChange={onChangeInput}
          placeholder={storeObj.text}
        />
      </StoreItem>
    );
    return insertInputObj;
  };

  const PopupBody = () => {
    return <PopupMiddle>{getStoreListObj()}</PopupMiddle>;
  };

  const PopupFooter = ({ btnText }) => {
    return (
      <PopupBottom>
        <ButtonBox>
          <PopupButton onClick={onClickInsertButton}>{btnText}</PopupButton>
          <PopupButton onClick={onClickCloseButton}>닫기</PopupButton>
        </ButtonBox>
      </PopupBottom>
    );
  };

  return (
    <PopupWrapper>
      <PopupBg />
      <PopupContainer>
        <PopupHeader title='스토어 추가'/>
        {PopupBody()}
        {/* todo : PopupBody 컴포넌트로 변경시 input 리렌더링 오류 수정 필요 */}
        {/* <PopupBody /> */}
        <PopupFooter btnText='추가'/>
      </PopupContainer>
    </PopupWrapper>
  );
};

const DeletePopup = ({ storeInfo, closeDeletePopup, fetchDeleteStore }) => {
  const onClickDeleteButton = (e) => {
    if (storeInfo != null) {
      const seq = storeInfo['seq'];
      fetchDeleteStore({ seq });
    }
  };
  const onClickCloseButton = (e) => {
    closeDeletePopup();
  };

  const PopupBody = ({ storeInfo }) => {
    return (
      <PopupMiddle>
        <PopupText>가게 이름 : {storeInfo.name}</PopupText>
        <PopupText>가게 주소 : {storeInfo.address}</PopupText>
        <PopupBoldText>정말로 삭제 하시겠습니까?</PopupBoldText>
      </PopupMiddle>
    );
  };

  const PopupFooter = ({ btnText }) => {
    return (
      <PopupBottom>
        <ButtonBox>
          <PopupButton onClick={onClickDeleteButton}>{btnText}</PopupButton>
          <PopupButton onClick={onClickCloseButton}>닫기</PopupButton>
        </ButtonBox>
      </PopupBottom>
    );
  };

  return (
    <PopupWrapper>
      <PopupBg />
      <PopupContainer>
        <PopupHeader title='스토어 삭제'/>
        <PopupBody storeInfo={ storeInfo } />
        <PopupFooter btnText='삭제'/>
      </PopupContainer>
    </PopupWrapper>
  );
};

const UpdatePopup = ({
  storeInfo,
  onChangeInput,
  fetchUpdateStore,
  updateLatLngByRoadAddress,
  checkUpdatedAddress,
  closeUpdatePopup,
}) => {
  const { storeInfoArr } = useContext(AdminContext);

  const onClickUpdateButton = (e) => {
    if (storeInfo != null) {
      const seq = storeInfo['seq'];
      const isUpdatedAddress = checkUpdatedAddress();
      if (isUpdatedAddress) {
        updateLatLngByRoadAddress({ seq, isUpdatedAddress });
      } else {
        fetchUpdateStore({ seq, isUpdatedAddress });
      }
    }
  };

  const onClickCloseButton = (e) => {
    closeUpdatePopup();
  };

  const getStoreListObj = () => {
    const insertChild = [];
    console.log(storeInfo);

    for (const key in storeInfoArr) {
      const storeObj = storeInfoArr[key];
      insertChild.push(getStoreInputObj(storeObj, key));
    }
    return insertChild;
  };

  const getStoreInputObj = (storeObj, index) => {
    const insertInputObj = (
      <StoreItem key={storeObj.id}>
        <StoreItemLable htmlFor={storeObj.id}>{storeObj.id}</StoreItemLable>
        <StoreItemInput
          id={storeObj.id}
          name={storeObj.name}
          onChange={onChangeInput}
          placeholder={storeObj.text}
          value={storeInfo[storeObj.id]}
        />
      </StoreItem>
    );
    return insertInputObj;
  };

  const PopupBody = () => {
    return <PopupMiddle>{getStoreListObj()}</PopupMiddle>;
  };

  const PopupFooter = ({ btnText }) => {
    return (
      <PopupBottom>
        <ButtonBox>
          <PopupButton onClick={onClickUpdateButton}>{btnText}</PopupButton>
          <PopupButton onClick={onClickCloseButton}>닫기</PopupButton>
        </ButtonBox>
      </PopupBottom>
    );
  };

  return (
    <PopupWrapper>
      <PopupBg />
      <PopupContainer>
        <PopupHeader title='스토어 수정'/>
        {PopupBody()}
        {/* todo : PopupBody 컴포넌트로 변경시 input 리렌더링 오류 수정 필요 */}
        {/* <PopupBody /> */}
        <PopupFooter btnText='수정'/>
      </PopupContainer>
    </PopupWrapper>
  );
};

const PopupWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  z-index: 100;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PopupBg = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #000;
  opacity: 0.7;
`;

const PopupContainer = styled.div`
  position: relative;
  width: 50vw;
  top: 0;
  left: 0;
  z-index: 1;
  background-color: #fff;
`;

const PopupTop = styled.div`
  width: 100%;
  border: 1px solid #000;
  box-sizing: border-box;
  padding: 10px;
`;

const PopupTitle = styled.div`
  font-weight: bold;
  text-align: center;
`;

const PopupMiddle = styled.div`
  width: 100%;
  border: 1px solid #000;
  box-sizing: border-box;
  padding: 10px;
`;

const StoreItem = styled.div`
  width: 100%;
`;

const StoreItemLable = styled.label`
  display: inline-block;
  width: 33%;
  padding: 5px 15px;
  box-sizing: border-box;
`;

const StoreItemInput = styled.input`
  display: inline-block;
  width: 67%;
  margin: 0;
  padding: 5px 15px;
  box-sizing: border-box;
`;

const PopupText = styled.div`
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
`;

const PopupBoldText = styled.div`
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: bold;
  text-align: center;
  margin: 10px 0;
`;

const PopupBottom = styled.div`
  width: 100%;
  border: 1px solid #000;
  box-sizing: border-box;
  padding: 10px;
`;

const ButtonBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PopupButton = styled.button`
  width: 20vw;
  box-sizing: border-box;
  padding: 10px;
  margin: 5px;
`;

export { InsertPopup, DeletePopup, UpdatePopup };
