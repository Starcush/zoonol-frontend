import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const StoreInfoWindowMobile = () => {
  return (
    <Wrapper drag="y" dragConstraints={{ top: 0, bottom: 300 }}>
      Title
    </Wrapper>
  );
};

const Wrapper = styled(motion.div)``;

export default StoreInfoWindowMobile;
