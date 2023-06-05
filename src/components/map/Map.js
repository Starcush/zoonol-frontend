import React, { useEffect } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import styled from 'styled-components';
import { Marker } from '@/components/map/Marker';
import StoreInfoWindow from '@/components/store/StoreInfoWindow';

// todo: 겹침은 당장 중요하진 않고 infowindow 하는게 시급하다

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

      makeMarkers(window.naver, map, stores);
    }
    initMap();
  }, []);

  const makeMarkers = (naver, map, stores) => {
    // const makeStoreInfoWindow = (store) => {
    //   const infoWindowContent = renderToStaticMarkup(
    //     <StoreInfoWindow store={store} />
    //   );

    //   return new naver.maps.InfoWindow({
    //     content: infoWindowContent,
    //     disableAnchor: true,
    //     borderColor: 'transparent',
    //     borderWidth: 0,
    //     pixelOffset: new naver.maps.Point(30, -50),
    //     maxWidth: 500,
    //   });
    // };

    const markers = [];
    stores?.forEach((store) => {
      const { lat, lng, zoonol_place, name } = store;
      const markerSize = zoonol_place ? 36 : 30;
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

      // const infoWindow = makeStoreInfoWindow(store);
      // naver.maps.Event.addListener(marker, 'click', function (e) {
      //   if (infoWindow.getMap()) {
      //     infoWindow.close();
      //   } else {
      //     infoWindow.open(map, marker);
      //   }
      // });
      // markers.push(marker);
    });
    return markers;
  };

  return <Wrapper id="map">{children}</Wrapper>;
};

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  z-index: 1;
  position: relative;
`;

export default Map;
