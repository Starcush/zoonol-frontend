import React from 'react';
import styled from 'styled-components';
import { StoreMarkerLogo } from '@/icons/icon';

const Marker = ({ store }) => {
  const { id, name } = store;

  return (
    <MarkerWrapper className="marker" id={`marjer-${id}`} storeInfoName={name}>
      <StoreMarkerLogo />
      <Info>{name}</Info>
    </MarkerWrapper>
  );
};

const ClusterMarker = () => {
  return (
    <ClusterMarkerWrapper>
      <StoreMarkerLogo />
      <ClusterCount id="cluster-count" />
    </ClusterMarkerWrapper>
  );
};

const MarkerWrapper = styled.div`
  background-color: #111111;
  padding: 3px 5px 3px 3px;
  border: 1px solid #111111;
  border-radius: 18px;
  position: absolute;
  white-space: nowrap;
  bottom: 3px;
  left: -15px;
  display: flex;
  flex-direction: row;
  align-items: center;

  &:after {
    border-top: 6px solid #111111;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-bottom: 0 solid transparent;
    content: '';
    position: absolute;
    bottom: -5px;
    left: 11px;
  }
`;

const Info = styled.div`
  margin-left: 3px;
  font-weight: 600;
  font-size: 14px;
  color: #f8f3d4;

  @media screen and (max-width: 768px) {
    font-size: 12px;
  }
`;

const ClusterMarkerWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: #555e5d;
  border-radius: 50px;
  padding: 8px 10px;
`;

const ClusterCount = styled.span`
  color: #f8f3d4;
  margin-left: 8px;
`;

export { Marker, ClusterMarker };
