import React, { useEffect } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import styled from 'styled-components';
import Marker from '@/components/map/Marker';
import { makeMarkerClustering } from '@/lib/navermap/MarkerCluster';

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

      // 임시 marker
      const htmlMarker1 = {
        content:
          '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:white;text-align:center;font-weight:bold;background:url(https://navermaps.github.io/maps.js.ncp/docs/img/cluster-marker-1.png);background-size:contain;"></div>',
        size: window.naver.maps.Size(40, 40),
        anchor: window.naver.maps.Point(20, 20),
      };
      const htmlMarker2 = {
        content:
          '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:white;text-align:center;font-weight:bold;background:url(https://window.naver.maps.github.io/maps.js.ncp/docs/img/cluster-marker-2.png);background-size:contain;"></div>',
        size: window.naver.maps.Size(40, 40),
        anchor: window.naver.maps.Point(20, 20),
      };
      const htmlMarker3 = {
        content:
          '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:white;text-align:center;font-weight:bold;background:url(https://window.naver.maps.github.io/maps.js.ncp/docs/img/cluster-marker-3.png);background-size:contain;"></div>',
        size: window.naver.maps.Size(40, 40),
        anchor: window.naver.maps.Point(20, 20),
      };
      const htmlMarker4 = {
        content:
          '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:white;text-align:center;font-weight:bold;background:url(https://window.naver.maps.github.io/maps.js.ncp/docs/img/cluster-marker-4.png);background-size:contain;"></div>',
        size: window.naver.maps.Size(40, 40),
        anchor: window.naver.maps.Point(20, 20),
      };
      const htmlMarker5 = {
        content:
          '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:white;text-align:center;font-weight:bold;background:url(https://window.naver.maps.github.io/maps.js.ncp/docs/img/cluster-marker-5.png);background-size:contain;"></div>',
        size: window.naver.maps.Size(40, 40),
        anchor: window.naver.maps.Point(20, 20),
      };

      const markers = makeMarkers(map, stores);

      const MarkerClustering = makeMarkerClustering(window.naver);
      new MarkerClustering({
        minClusterSize: 2,
        maxZoom: 15,
        map: map,
        markers: markers,
        disableClickZoom: false,
        gridSize: 120,
        icons: [
          htmlMarker1,
          htmlMarker2,
          htmlMarker3,
          htmlMarker4,
          htmlMarker5,
        ],
        indexGenerator: [10, 100, 200, 500, 1000],
        stylingFunction: function (clusterMarker, count) {
          clusterMarker
            .getElement()
            .querySelector('div:first-child').innerText = count;
        },
      });
    }
    initMap();
  }, []);

  const makeMarkers = (map, stores) => {
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
`;

export default Map;
