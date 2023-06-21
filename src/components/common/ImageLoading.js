import React from 'react';
import styled, { keyframes } from 'styled-components';

const ImageLoading = ({ width, height }) => {
  return <Wrapper height={height} width={width} />;
};

const shine = keyframes`
  0%   { background: #F8F8F8; }
  25%  { background: #F0F0F0; }
  50%  { background: #E8E8E8; }
  75%  { background: #F0F0F0; }
  100% { background: #F8F8F8; }
`;

const Wrapper = styled.div`
  height: ${({ height }) => `${height}px`};
  width: ${({ width }) => `${width}px`};
  animation-name: ${shine};
  animation-duration: 3s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  border-radius: 4px;
`;

export default ImageLoading;
