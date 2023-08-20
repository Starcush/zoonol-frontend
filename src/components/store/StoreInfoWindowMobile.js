import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// 자유를 너무 많이 주지 말고 2가지 포지션을 주고 아예 끄게 하거나 해야겠다

const StoreInfoWindowMobile = ({ store, closeInfoWindow }) => {
  const TOP_MAX = (-1 * window.innerHeight) / 2 + 80;

  const [y, setY] = useState(0);
  const [step, setStep] = useState(0);

  return (
    <Wrapper
      animate={{ y }}
      drag="y"
      dragElastic={0}
      dragMomentum={false}
      dragConstraints={{
        top: (-1 * window.innerHeight) / 2 + 80,
        bottom: window.innerHeight / 2 - 80,
      }}
      onDragEnd={(_, info) => {
        const deltaY = info.delta.y;
        if (deltaY > 0) {
          setY(0);
        } else {
          setY(TOP_MAX);
        }
      }}
    >
      <TopBar />
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
  display: flex;
  justify-content: center;
`;

const TopBar = styled.div`
  height: 6px;
  width: 80px;
  background-color: #cbcbcb;
  margin-top: 12px;
  border-radius: 4px;
`;

export default StoreInfoWindowMobile;
