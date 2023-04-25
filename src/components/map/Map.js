import React, { useEffect } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import styled from 'styled-components';
import Marker from '@/components/map/Marker';

const cityHallPosition = { lat: 37.557527, lng: 126.9244669 };
const MAX_ZOOM_LEVEL = 16;

const Map = ({ children, stores }) => {
  useEffect(() => {
    async function initMap() {
      const map = new window.naver.maps.Map('map', {
        zoom: MAX_ZOOM_LEVEL,
        center: new naver.maps.LatLng(
          cityHallPosition.lat,
          cityHallPosition.lng
        ),
      });
      makeMarkers(map, stores);
    }
    initMap();
  }, []);

  const makeMarkers = (map, stores) => {
    stores?.forEach((store) => {
      const { lat, lng } = store;
      const content = renderToStaticMarkup(<Marker store={store} />);
      new naver.maps.Marker({
        map,
        position: new naver.maps.LatLng(lat, lng),
        icon: {
          content,
        },
      });
    });
  };

  return <Wrapper id="map">{children}</Wrapper>;
};

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  z-index: 1;
`;

export default Map;
