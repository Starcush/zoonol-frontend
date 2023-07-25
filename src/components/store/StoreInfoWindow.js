import React from 'react';
import StoreInfoWindowMobile from '@/components/store/StoreInfoWindowMobile';
import StoreInfoWindowDesktop from '@/components/store/StoreInfoWindowDesktop';

const StoreInfoWindow = ({ store, closeInfoWindow }) => {
  const { innerWidth } = window;
  const isMobile = innerWidth <= 768;

  return isMobile ? (
    <StoreInfoWindowMobile store={store} closeInfoWindow={closeInfoWindow} />
  ) : (
    <StoreInfoWindowDesktop store={store} closeInfoWindow={closeInfoWindow} />
  );
};

export default StoreInfoWindow;
