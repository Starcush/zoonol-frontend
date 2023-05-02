import React, { useEffect } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import styled from 'styled-components';
import { makeMarkerClustering } from '@/lib/navermap/markerCluster';
import { Marker, ClusterMarker } from '@/components/map/Marker';
import StoreInfoWindow from '@/components/store/StoreInfoWindow';

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

      const htmlMarker1 = {
        content: renderToStaticMarkup(<ClusterMarker />),
        size: window.naver.maps.Size(40, 40),
        anchor: window.naver.maps.Point(20, 20),
      };

      const markers = makeMarkers(window.naver, map, stores);

      const MarkerClustering = makeMarkerClustering(window.naver);
      new MarkerClustering({
        minClusterSize: 2,
        maxZoom: 15,
        map: map,
        markers: markers,
        disableClickZoom: false,
        gridSize: 120,
        icons: [htmlMarker1],
        indexGenerator: [10],
        stylingFunction: function (clusterMarker, count) {
          const el = (clusterMarker
            .getElement()
            .querySelector('#cluster-count').innerText = count);
        },
      });
    }
    initMap();
  }, []);

  const makeMarkers = (naver, map, stores) => {
    const makeStoreInfoWindow = (store) => {
      const infoWindowContent = renderToStaticMarkup(
        <StoreInfoWindow store={store} />
      );
      return new naver.maps.InfoWindow({
        content: infoWindowContent,
        disableAnchor: true,
        borderColor: 'transparent',
        borderWidth: 0,
        pixelOffset: new naver.maps.Point(30, -50),
        maxWidth: 500,
      });
    };

    const markers = [];
    stores?.forEach((store) => {
      const { lat, lng } = store;
      const content = renderToStaticMarkup(<Marker store={store} />);
      const marker = new naver.maps.Marker({
        map,
        position: new naver.maps.LatLng(lat, lng),
        icon: {
          content,
        },
      });

      const infoWindow = makeStoreInfoWindow(store);
      naver.maps.Event.addListener(marker, 'click', function (e) {
        if (infoWindow.getMap()) {
          infoWindow.close();
        } else {
          infoWindow.open(map, marker);
        }
      });
      markers.push(marker);
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
