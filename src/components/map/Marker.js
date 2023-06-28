import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import * as Icon from '@/icons/icon';

const Marker = ({ store, hideStoreName }) => {
  const { name, zoonolPlace } = store;

  const ZoonolPlaceMarker = () => {
    return (
      <MarkerWrapper>
        <Image
          src={Icon.zoonolPlaceIcon}
          alt="zoonol-place-icon"
          width={36}
          height={36}
        />
        <NameWrapper zoonolPlace={zoonolPlace} hideStoreName={hideStoreName}>
          <Info zoonolPlace={zoonolPlace}>{name}</Info>
        </NameWrapper>
      </MarkerWrapper>
    );
  };

  const NonZoonolPlaceMarker = () => {
    return (
      <MarkerWrapper>
        <Icon.NonZoonolPlaceIcon />
        <NameWrapper zoonolPlace={zoonolPlace} hideStoreName={hideStoreName}>
          <Info zoonolPlace={zoonolPlace}>{name}</Info>
        </NameWrapper>
      </MarkerWrapper>
    );
  };

  return zoonolPlace ? <ZoonolPlaceMarker /> : <NonZoonolPlaceMarker />;
};

const MarkerWrapper = styled.div``;

const NameWrapper = styled.div`
  position: absolute;
  bottom: ${({ zoonolPlace }) => (zoonolPlace ? '42px' : '38px')};
  left: -10px;
  width: 200px;
  z-index: 1;
  display: ${({ hideStoreName }) => (hideStoreName ? 'none' : 'block')};
`;

const Info = styled.div`
  margin-left: 3px;
  font-weight: 600;
  font-size: 14px;
  color: ${({ zoonolPlace }) => (zoonolPlace ? '#545454' : '#545454')};
  text-shadow: -2px 0 #ffffff, 0 2px #ffffff, 2px 0 #ffffff, 0 -2px #ffffff;

  @media screen and (max-width: 768px) {
    font-size: 12px;
  }
`;

export { Marker };
