import styled from 'styled-components';
import { Table, Button } from 'antd';
import * as column from '@/constants/column';
import {
  RESTAURANT_CATEGORY_SEQ,
  CAFE_CATEGORY_SEQ,
  PUB_CATEGORY_SEQ,
  LIBRARY_CATEGORY_SEQ,
} from '@/constants/constant';

const StoreList = ({ stores, openDeletePopup, openUpdatePopup }) => {
  const onClickDeleteItem = (e, store) => {
    openDeletePopup(store);
  };

  const onClickUpdateItem = (e, store) => {
    openUpdatePopup(store);
  };

  const DeleteButton = ({ store }) => {
    return (
      <Button
        style={{ marginRight: 10 }}
        type="primary"
        onClick={(e) => {
          onClickDeleteItem(e, store);
        }}
      >
        삭제
      </Button>
    );
  };

  const UpdateButton = ({ store }) => {
    return (
      <Button
        onClick={(e) => {
          onClickUpdateItem(e, store);
        }}
      >
        수정
      </Button>
    );
  };

  const columns = [
    {
      title: '번호',
      dataIndex: column.STORE_COLUMN_SEQ,
      key: column.STORE_COLUMN_SEQ,
    },
    {
      title: '카테고리 번호',
      dataIndex: column.STORE_COLUMN_CATEGORY_SEQ,
      key: column.STORE_COLUMN_CATEGORY_SEQ,
      render: (text) => {
        switch (text) {
          case RESTAURANT_CATEGORY_SEQ:
            return '식당';
          case CAFE_CATEGORY_SEQ:
            return '카페';
          case PUB_CATEGORY_SEQ:
            return '호프';
          case LIBRARY_CATEGORY_SEQ:
            return '서점';
        }
      },
    },
    {
      title: '네이버 번호',
      dataIndex: column.STORE_COLUMN_NAVER_STORE_ID,
      key: column.STORE_COLUMN_NAVER_STORE_ID,
    },
    {
      title: '이름',
      dataIndex: column.STORE_COLUMN_NAME,
      key: column.STORE_COLUMN_NAME,
    },
    {
      title: '주소',
      dataIndex: column.STORE_COLUMN_ADDRESS,
      key: column.STORE_COLUMN_ADDRESS,
    },
    {
      title: '주놀 장소',
      dataIndex: column.STORE_COLUMN_ZOONOL_PLACE,
      key: column.STORE_COLUMN_ZOONOL_PLACE,
      render: (text) => {
        if (text) {
          return 'yes';
        } else {
          return 'no';
        }
      },
    },
    {
      title: '',
      dataIndex: 'action',
      key: 'action',
      render: (text, record) => {
        return (
          <ButtonWrapper>
            <DeleteButton store={record} />
            <UpdateButton store={record} />
          </ButtonWrapper>
        );
      },
    },
  ];

  return (
    <Wrapper>
      <Table columns={columns} dataSource={stores} />
    </Wrapper>
  );
};

export { StoreList };

const Wrapper = styled.div``;

const ButtonWrapper = styled.div``;
