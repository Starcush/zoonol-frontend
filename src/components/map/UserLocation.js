import React from 'react';
import styled from 'styled-components';
import { CurrentLocationIcon } from '@/icons/icon';

const UserLocation = ({ setUserLocation }) => {
  const onClickBtn = () => {
    const success = (position) => {
      const { latitude: lat, longitude: lng } = position.coords;
      setUserLocation({ lat, lng });
    };

    const error = () => {
      alert('현재 위치 기능을 허용해주세요');
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  };

  return (
    <Wrapper onClick={onClickBtn}>
      <CurrentLocationIcon />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 45px;
  height: 45px;
  border-radius: 20px;
  z-index: 3;
  bottom: 40px;
  right: 30px;
  position: absolute;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 0px 15px 0px #00000012;
  cursor: pointer;

  @media screen and (max-width: 768px) {
    bottom: 30px;
    right: 20px;
  }
`;

export default UserLocation;
