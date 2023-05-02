import React from 'react';
import styled from 'styled-components';

const StoreInfoWindow = ({ store }) => {
  const { name, sub_category, additional_info, address } = store;
  return (
    <Wrapper>
      <Name>{name}</Name>
      <Category>{sub_category}</Category>
      <Address>{address}</Address>
      <AdditionalInfo>{additional_info}</AdditionalInfo>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 10px;
  background-color: white;
  border-radius: 6px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.3);
  cursor: pointer;
`;

const Name = styled.span`
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  color: #191919;
  display: block;
  margin-bottom: 10px;
`;

const Category = styled.span`
  display: block;
  margin-bottom: 10px;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  color: #777777;
`;

const Address = styled.span`
  display: block;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  color: #777777;
`;

const AdditionalInfo = styled.span`
  display: block;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  color: #777777;
`;

export default StoreInfoWindow;
