import React from 'react';
import styled, { keyframes } from 'styled-components';

const ImageLoading = () => {
  return <Wrapper />;
};

const shine = keyframes`
  0%   { background: #F8F8F8; }
  25%  { background: #F0F0F0; }
  50%  { background: #E8E8E8; }
  75%  { background: #F0F0F0; }
  100% { background: #F8F8F8; }
`;

const Wrapper = styled.div`
  animation-name: ${shine};
  animation-duration: 2s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  border-radius: 4px;
  position: absolute;
  top: 0;
  left: 0;
`;

export default ImageLoading;
