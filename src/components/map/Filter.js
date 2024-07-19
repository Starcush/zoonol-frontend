import { useState } from 'react';
import styled from 'styled-components';
import { Button } from 'antd';
import { useStoreFilter } from '@/stores/store';

const filterLargeDog = 'isLargeDogAvailable';
const filterCage = 'isNeedCage';
const filterOffLeash = 'isOffLeash';

export default function Filter() {
  const { storeFilter, setStoreFilter } = useStoreFilter();

  const onClickFilter = (filterKey) => {
    setStoreFilter({ [filterKey]: !storeFilter[filterKey] });
  };

  return (
    <Wrapper>
      <Wrapper>
        <Button onClick={() => onClickFilter(filterLargeDog)}>
          대형견 가능 {storeFilter.isLargeDogAvailable ? '✅' : '❌'}
        </Button>
        <Button onClick={() => onClickFilter(filterCage)}>
          케이지 필요 {storeFilter.isNeedCage ? '✅' : '❌'}
        </Button>
        <Button onClick={() => onClickFilter(filterOffLeash)}>
          오프리쉬 가능 {storeFilter.isOffLeash ? '✅' : '❌'}
        </Button>
      </Wrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: absolute;
  z-index: 3;
`;
