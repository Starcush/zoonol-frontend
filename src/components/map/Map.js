import React, { useEffect, useState } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import styled from 'styled-components';
import { Marker } from '@/components/map/Marker';
import StoreInfoWindow from '@/components/store/StoreInfoWindow';

const cityHallPosition = { lat: 37.557527, lng: 126.9244669 };
const MAX_ZOOM_LEVEL = 16;

const Map = ({ children, stores }) => {
  const [visibleStore, setVisibleStore] = useState(null);

  useEffect(() => {
    async function initMap() {
      const map = new window.naver.maps.Map('map', {
        zoom: MAX_ZOOM_LEVEL,
        center: new naver.maps.LatLng(
          cityHallPosition.lat,
          cityHallPosition.lng
        ),
      });

      makeMarkers(window.naver, map, stores);

      window.naver.maps.Event.addListener(map, 'click', function (e) {
        setVisibleStore(null);
      });
    }
    initMap();
  }, []);

  const makeMarkers = (naver, map, stores) => {
    const markers = [];
    stores?.forEach((store) => {
      const { lat, lng, zoonolPlace } = store;

      const markerSize = zoonolPlace ? 36 : 30;
      const content = renderToStaticMarkup(<Marker store={store} />);
      const marker = new naver.maps.Marker({
        map,
        position: new naver.maps.LatLng(lat, lng),
        icon: {
          content,
          origin: new naver.maps.Point(0, 0),
          size: new naver.maps.Size(markerSize, markerSize),
        },
      });

      naver.maps.Event.addListener(marker, 'click', function (e) {
        setVisibleStore(store);
      });
    });
    return markers;
  };

  const closeInfoWindow = () => {
    setVisibleStore(null);
  };

  return (
    <Wrapper id="map">
      {children}
      {visibleStore && (
        <StoreInfoWindow
          store={visibleStore}
          closeInfoWindow={closeInfoWindow}
        />
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  z-index: 1;
  position: relative;
`;

export default Map;
