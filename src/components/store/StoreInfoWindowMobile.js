import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const StoreInfoWindowMobile = () => {
  return (
    <Wrapper
      drag="y"
      dragConstraints={{
        top: (-1 * window.innerHeight) / 2 + 80,
        bottom: window.innerHeight / 2 - 80,
      }}
    >
      Title
    </Wrapper>
  );
};

const Wrapper = styled(motion.div)`
  position: absolute;
  top: 50%;
  right: 0;
  background-color: #ffffff;
  width: 100%;
  height: 200%;
  z-index: 1;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
`;

export default StoreInfoWindowMobile;
