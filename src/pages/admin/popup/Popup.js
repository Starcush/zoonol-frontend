import styled from 'styled-components';

const setPopupTop = (title) => {
  return (
    <PopupTop>
      <PopupTitle>{title}</PopupTitle>
    </PopupTop>
  );
};

const InsertPopup = ({ onChangeInput, fetchInsertStore, closeInsertPopup }) => {
  const stroeInfoArr = [
    { id: 'zoonol_place', name: 'zoonolPlace', text: '' },
    { id: 'naver_store_id', name: 'naverStoreId', text: '네이버 스토어 ID' },
    { id: 'name', name: 'name', text: '가게 명' },
    { id: 'phone_number', name: 'phoneNumber', text: '전화번호' },
    { id: 'homepage', name: 'homepage', text: '홈페이지' },
    { id: 'description', name: 'description', text: '가게 설명' },
    { id: 'convenience', name: 'convenience', text: '편의 시설' },
    { id: 'short_address', name: 'shortAddress', text: '짧은 주소' },
    { id: 'address', name: 'address', text: '기존 주소' },
    { id: 'road_address', name: 'roadAddress', text: '도로명 주소' },
    { id: 'lat', name: 'lat', text: '경도' },
    { id: 'lng', name: 'lng', text: '위도' },
    { id: 'map_url', name: 'mapUrl', text: '지도 URL' },
    { id: 'category_seq', name: 'categorySeq', text: '카테고리 시퀀스' },
    { id: 'info_updated_at', name: 'infoUpdatedAt', text: '' },
    { id: 'off_leash', name: 'offLeash', text: '' },
    { id: 'large_dog_available', name: 'largeDogAvaiable', text: '' },
    { id: 'thumbnail', name: 'thumbnail', text: '' },
    { id: 'additional_info', name: 'additionalInfo', text: '' },
    { id: 'zoonol_feed_url', name: 'zoonolFeedUrl', text: '' },
  ];

  const onClickInsertButton = (e) => {
    fetchInsertStore();
  };

  const onClickCloseButton = (e) => {
    closeInsertPopup();
  };

  const getStoreListObj = () => {
    const insertChild = [];

    for (const key in stroeInfoArr) {
      const storeObj = stroeInfoArr[key];
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
          onChange={(e) => {
            onChangeInput(e);
          }}
          placeholder={storeObj.text}
        />
      </StoreItem>
    );
    return insertInputObj;
  };

  const setPopupMiddle = () => {
    return <PopupMiddle>{getStoreListObj(onChangeInput)}</PopupMiddle>;
  };

  const setPopupButtom = (btnText) => {
    return (
      <PopupBottom>
        <ButtonBox>
          <PopupButton
            onClick={(e) => {
              onClickInsertButton(e);
            }}
          >
            {btnText}
          </PopupButton>
          <PopupButton
            onClick={(e) => {
              onClickCloseButton(e);
            }}
          >
            닫기
          </PopupButton>
        </ButtonBox>
      </PopupBottom>
    );
  };

  return (
    <PopupWrapper>
      <PopupBg />
      <PopupContainer>
        {setPopupTop('스토어 추가')}
        {setPopupMiddle()}
        {setPopupButtom('추가')}
      </PopupContainer>
    </PopupWrapper>
  );
};

const DeletePopup = ({ storeInfo, closeDeletePopup, fetchDeleteStore }) => {
  const onClickDeleteButton = (e) => {
    if (storeInfo != null) {
      fetchDeleteStore(storeInfo.seq);
    }
  };
  const onClickCloseButton = (e) => {
    closeDeletePopup();
  };

  const setPopupMiddle = (storeInfo) => {
    return (
      <PopupMiddle>
        <PopupText>가게 이름 : {storeInfo.name}</PopupText>
        <PopupText>가게 주소 : {storeInfo.address}</PopupText>
        <PopupBoldText>정말로 삭제 하시겠습니까?</PopupBoldText>
      </PopupMiddle>
    );
  };

  const setPopupButtom = (btnText) => {
    return (
      <PopupBottom>
        <ButtonBox>
          <PopupButton
            onClick={(e) => {
              onClickDeleteButton(e);
            }}
          >
            {btnText}
          </PopupButton>
          <PopupButton
            onClick={(e) => {
              onClickCloseButton(e);
            }}
          >
            닫기
          </PopupButton>
        </ButtonBox>
      </PopupBottom>
    );
  };

  return (
    <PopupWrapper>
      <PopupBg />
      <PopupContainer>
        {setPopupTop('스토어 삭제')}
        {setPopupMiddle(storeInfo)}
        {setPopupButtom('삭제')}
      </PopupContainer>
    </PopupWrapper>
  );
};

const UpdatePopup = ({ storeInfo, onChangeInput, fetchUpdateStore, closeUpdatePopup }) => {
  const stroeInfoArr = [
    { id: 'zoonol_place', name: 'zoonolPlace', text: '' },
    { id: 'naver_store_id', name: 'naverStoreId', text: '네이버 스토어 ID' },
    { id: 'name', name: 'name', text: '가게 명' },
    { id: 'phone_number', name: 'phoneNumber', text: '전화번호' },
    { id: 'homepage', name: 'homepage', text: '홈페이지' },
    { id: 'description', name: 'description', text: '가게 설명' },
    { id: 'convenience', name: 'convenience', text: '편의 시설' },
    { id: 'short_address', name: 'shortAddress', text: '짧은 주소' },
    { id: 'address', name: 'address', text: '기존 주소' },
    { id: 'road_address', name: 'roadAddress', text: '도로명 주소' },
    { id: 'lat', name: 'lat', text: '경도' },
    { id: 'lng', name: 'lng', text: '위도' },
    { id: 'map_url', name: 'mapUrl', text: '지도 URL' },
    { id: 'category_seq', name: 'categorySeq', text: '카테고리 시퀀스' },
    { id: 'info_updated_at', name: 'infoUpdatedAt', text: '' },
    { id: 'off_leash', name: 'offLeash', text: '' },
    { id: 'large_dog_available', name: 'largeDogAvailable', text: '' },
    { id: 'thumbnail', name: 'thumbnail', text: '' },
    { id: 'additional_info', name: 'additionalInfo', text: '' },
    { id: 'zoonol_feed_url', name: 'zoonolFeedUrl', text: '' },
  ];

  const onClickUpdateButton = (e) => {
    if (storeInfo != null) {
      fetchUpdateStore(storeInfo.seq);
    }
  };

  const onClickCloseButton = (e) => {
    closeUpdatePopup();
  };

  const getStoreListObj = () => {
    const insertChild = [];

    for (const key in stroeInfoArr) {
      const storeObj = stroeInfoArr[key];
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
          onChange={(e) => {
            onChangeInput(e);
          }}
          placeholder={storeObj.text}
          value={storeInfo[storeObj.id]}
        />
      </StoreItem>
    );
    return insertInputObj;
  };

  const setPopupMiddle = () => {
    return <PopupMiddle>{getStoreListObj(onChangeInput)}</PopupMiddle>;
  };

  const setPopupButtom = (btnText) => {
    return (
      <PopupBottom>
        <ButtonBox>
          <PopupButton
            onClick={(e) => {
              onClickUpdateButton(e);
            }}
          >
            {btnText}
          </PopupButton>
          <PopupButton
            onClick={(e) => {
              onClickCloseButton(e);
            }}
          >
            닫기
          </PopupButton>
        </ButtonBox>
      </PopupBottom>
    );
  };

  return (
    <PopupWrapper>
      <PopupBg />
      <PopupContainer>
        {setPopupTop('스토어 수정')}
        {setPopupMiddle()}
        {setPopupButtom('수정')}
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
