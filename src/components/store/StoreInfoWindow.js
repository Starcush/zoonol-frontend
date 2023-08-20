import React from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import {
  RESTAURANT_CATEGORY_SEQ,
  CAFE_CATEGORY_SEQ,
  PUB_CATEGORY_SEQ,
} from '@/constants/constant';
import StoreInfoWindowMobile from '@/components/store/StoreInfoWindowMobile';
import StoreInfoWindowDesktop from '@/components/store/StoreInfoWindowDesktop';

const StoreInfoWindow = ({ store, closeInfoWindow }) => {
  const { innerWidth } = window;
  const isMobile = innerWidth <= 768;

  const {
    categorySeq,
    offLeash,
    largeDogAvailable,
    zoonolPlace,
    needCage,
    infoUpdatedAt,
  } = store;

  const isZoonolPlace = Boolean(zoonolPlace);
  const convertedInfoUpdatedAt = dayjs(infoUpdatedAt).format('YYYY년 M월 D일');
  const largeDogAvailableMessage = largeDogAvailable
    ? '대형견 입장 가능'
    : '대형견 입장 불가능';
  let entranceCondition = '';
  let category = '';

  if (needCage) {
    entranceCondition = '케이지 사용시 입장 가능';
  } else {
    if (offLeash) {
      entranceCondition = '리드줄 없이 입장 가능';
    } else {
      entranceCondition = '리드줄 착용시 입장 가능';
    }
  }

  switch (categorySeq) {
    case RESTAURANT_CATEGORY_SEQ:
      category = '식당';
      break;
    case CAFE_CATEGORY_SEQ:
      category = '카페';
      break;
    case PUB_CATEGORY_SEQ:
      category = '호프';
      break;
  }

  const zoonolStoreInfo = {
    isZoonolPlace,
    convertedInfoUpdatedAt,
    largeDogAvailableMessage,
    entranceCondition,
    category,
  };

  return isMobile ? (
    <StoreInfoWindowMobile
      store={store}
      zoonolStoreInfo={zoonolStoreInfo}
      closeInfoWindow={closeInfoWindow}
    />
  ) : (
    <StoreInfoWindowDesktop
      store={store}
      zoonolStoreInfo={zoonolStoreInfo}
      closeInfoWindow={closeInfoWindow}
    />
  );
};

export default StoreInfoWindow;
