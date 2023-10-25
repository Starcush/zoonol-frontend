import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Modal, Form, Button } from 'antd';
import * as column from '@/constants/column';
import FormInputFactory from '@/components/common/FormInputFactory';

const schema = yup.object().shape({
  name: yup.string().required('이름을 입력해주세요.'),
  categorySeq: yup.number().required('카테고리를 정해주세요.'),
  address: yup.string().required('주소를 입력해주세요.'),
  lat: yup.number().required('위도를 입력해주세요.'),
  lng: yup.number().required('경도를 입력해주세요.'),
  naverStoreId: yup.number().required('네이버 스토어 아이디를 입력해주세요.'),
});

const InsertPopup = ({ open, closeInsertPopup, fetchInsertStore }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      [column.STORE_COLUMN_CATEGORY_SEQ]: null,
      [column.STORE_COLUMN_ZOONOL_PLACE]: false,
      [column.STORE_COLUMN_NEED_CAGE]: false,
      [column.STORE_COLUMN_LARGE_DOG_AVAILABLE]: false,
      [column.STORE_COLUMN_OFF_LEASH]: false,
    },
  });

  const onSubmit = async (data) => {
    const { STORE_COLUMN_THUMBNAIL } = column;
    const formData = new FormData();
    for (const key of Object.keys(data)) {
      if (key === STORE_COLUMN_THUMBNAIL) {
        if (data.thumbnail && data.thumbnail.length > 0) {
          formData.append(STORE_COLUMN_THUMBNAIL, data.thumbnail[0].originFileObj);
        }
      } else {
        formData.append(key, data[key]);
      }
    }
    await fetchInsertStore(formData);
    closeModal();
    reset();
  };

  const closeModal = () => {
    closeInsertPopup();
    reset();
  };

  return (
    <Modal
      style={{ top: 40 }}
      open={open}
      onCancel={closeModal}
      width={'80%'}
      footer={[<EmptyButton />, <EmptyButton />]}
    >
      <PopupTitle>스토어 추가</PopupTitle>
      <StoreInfoForm
        onSubmit={onSubmit}
        closeModal={closeModal}
        hookForm={[control, handleSubmit, reset, errors]}
      />
    </Modal>
  );
};

const UpdatePopup = ({ open, storeInfo, closeUpdatePopup, fetchUpdateStore }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      ...storeInfo,
      [column.STORE_COLUMN_ZOONOL_PLACE]: Boolean(storeInfo[column.STORE_COLUMN_ZOONOL_PLACE]),
      [column.STORE_COLUMN_NEED_CAGE]: Boolean(storeInfo[column.STORE_COLUMN_NEED_CAGE]),
      [column.STORE_COLUMN_LARGE_DOG_AVAILABLE]: Boolean(
        storeInfo[column.STORE_COLUMN_LARGE_DOG_AVAILABLE]
      ),
      [column.STORE_COLUMN_OFF_LEASH]: Boolean(storeInfo[column.STORE_COLUMN_OFF_LEASH]),
    },
  });

  const checkAddressUpdated = (prev, cur) => {
    const { STORE_COLUMN_ADDRESS } = column;
    return prev?.[STORE_COLUMN_ADDRESS] !== cur?.[STORE_COLUMN_ADDRESS];
  };

  const checkCoordinateUpdated = (prev, cur) => {
    const { STORE_COLUMN_LAT, STORE_COLUMN_LNG } = column;
    return (
      prev?.[STORE_COLUMN_LAT] !== cur?.[STORE_COLUMN_LAT] ||
      prev?.[STORE_COLUMN_LNG] !== cur?.[STORE_COLUMN_LNG]
    );
  };

  const onSubmit = async (data) => {
    if (storeInfo) {
      const isAddressUpdated = checkAddressUpdated(storeInfo, data);
      if (isAddressUpdated) {
        const isCoordinateUpdated = checkCoordinateUpdated(storeInfo, data);
        if (!isCoordinateUpdated) {
          alert('주소가 변경되었습니다. 위도 경도를 변경해주세요');
        }
      }
    }
    const { STORE_COLUMN_THUMBNAIL } = column;
    const formData = new FormData();
    for (const key of Object.keys(data)) {
      if (key === STORE_COLUMN_THUMBNAIL) {
        if (data.thumbnail && data.thumbnail?.length > 0) {
          formData.append(STORE_COLUMN_THUMBNAIL, data.thumbnail[0].originFileObj);
        } else {
          formData.append(key, data[key]);
        }
      } else {
        formData.append(key, data[key]);
      }
    }

    await fetchUpdateStore(formData);
    closeModal();
    reset();
  };

  const closeModal = () => {
    closeUpdatePopup();
    reset();
  };

  return (
    <Modal
      open={open}
      onCancel={closeModal}
      style={{ top: 50 }}
      width={'80%'}
      footer={[<EmptyButton />, <EmptyButton />]}
    >
      <PopupTitle>스토어 수정</PopupTitle>
      <StoreInfoForm
        onSubmit={onSubmit}
        closeModal={closeModal}
        hookForm={[control, handleSubmit, reset, errors]}
      />
    </Modal>
  );
};

const DeletePopup = ({ open, storeInfo, closeDeletePopup, fetchDeleteStore }) => {
  const onClickDeleteButton = (e) => {
    if (storeInfo != null) {
      const seq = storeInfo['seq'];
      fetchDeleteStore({ seq });
    }
  };

  return (
    <Modal open={open} onOk={onClickDeleteButton} onCancel={closeDeletePopup}>
      <PopupTitle>스토어 삭제</PopupTitle>
      <PopupText>{storeInfo?.name}</PopupText>
      <PopupText>{storeInfo?.address}</PopupText>
      <PopupBoldText>정말로 삭제 하시겠습니까?</PopupBoldText>
    </Modal>
  );
};

const StoreInfoForm = ({ onSubmit, closeModal, hookForm }) => {
  const [control, handleSubmit, reset, errors] = hookForm;

  const handleCancelButton = () => {
    closeModal();
    reset();
  };

  return (
    <Form onFinish={handleSubmit(onSubmit)}>
      <FormBody>
        <FormStoreInfoBody>
          <FormInputFactory
            type="input"
            label={column.STORE_COLUMN_NAME}
            name={column.STORE_COLUMN_NAME}
            control={control}
            placeholder="장소명"
            required={true}
            errors={errors}
          />
          <FormInputFactory
            type="select"
            label={column.STORE_COLUMN_CATEGORY_SEQ}
            name={column.STORE_COLUMN_CATEGORY_SEQ}
            control={control}
            placeholder="장소명"
            required={true}
            errors={errors}
            options={[
              { value: null, label: '카테고리 선택' },
              { value: 1, label: '식당' },
              { value: 2, label: '카페' },
              { value: 7, label: '호프' },
              { value: 8, label: '서점' },
            ]}
          />
          <FormInputFactory
            type="input"
            label={column.STORE_COLUMN_ADDRESS}
            name={column.STORE_COLUMN_ADDRESS}
            control={control}
            placeholder="주소"
            required={true}
            errors={errors}
          />
          <FormInputFactory
            type="input"
            label={column.STORE_COLUMN_ROAD_ADDRESS}
            name={column.STORE_COLUMN_ROAD_ADDRESS}
            control={control}
            placeholder="도로명 주소"
          />
          <FormInputFactory
            type="input"
            label={column.STORE_COLUMN_PHONE_NUMBER}
            name={column.STORE_COLUMN_PHONE_NUMBER}
            control={control}
            placeholder="전화번호"
          />
          <FormInputFactory
            type="input"
            label={column.STORE_COLUMN_DESCRIPTION}
            name={column.STORE_COLUMN_DESCRIPTION}
            control={control}
            placeholder="장소 설명"
          />
        </FormStoreInfoBody>
        <FormStoreInfoBody>
          <FormInputFactory
            type="input"
            label={column.STORE_COLUMN_LAT}
            name={column.STORE_COLUMN_LAT}
            control={control}
            placeholder="37.5610355"
            required={true}
            errors={errors}
          />
          <FormInputFactory
            type="input"
            label={column.STORE_COLUMN_LNG}
            name={column.STORE_COLUMN_LNG}
            control={control}
            placeholder="126.9259443"
            required={true}
            errors={errors}
          />
          <FormInputFactory
            type="input"
            label={column.STORE_COLUMN_NAVER_STORE_ID}
            name={column.STORE_COLUMN_NAVER_STORE_ID}
            control={control}
            placeholder="1950070220"
            required={true}
            errors={errors}
          />
          <FormInputFactory
            type="upload"
            label={column.STORE_COLUMN_THUMBNAIL}
            name={column.STORE_COLUMN_THUMBNAIL}
            control={control}
            error={errors.name}
          />
        </FormStoreInfoBody>
        <FormZoonolBody>
          <FormInputFactory
            type="checkbox"
            label={column.STORE_COLUMN_ZOONOL_PLACE}
            name={column.STORE_COLUMN_ZOONOL_PLACE}
            control={control}
          />
          <FormInputFactory
            type="checkbox"
            label={column.STORE_COLUMN_NEED_CAGE}
            name={column.STORE_COLUMN_NEED_CAGE}
            control={control}
          />
          <FormInputFactory
            type="checkbox"
            label={column.STORE_COLUMN_LARGE_DOG_AVAILABLE}
            name={column.STORE_COLUMN_LARGE_DOG_AVAILABLE}
            control={control}
          />
          <FormInputFactory
            type="checkbox"
            label={column.STORE_COLUMN_OFF_LEASH}
            name={column.STORE_COLUMN_OFF_LEASH}
            control={control}
          />
          <FormInputFactory
            type="input"
            label={column.STORE_COLUMN_ZOONOL_FEED_URL}
            name={column.STORE_COLUMN_ZOONOL_FEED_URL}
            control={control}
            placeholder="주놀 인스타 주소"
          />
          <FormInputFactory
            type="input"
            label={column.STORE_COLUMN_ADDITIONAL_INFO}
            name={column.STORE_COLUMN_ADDITIONAL_INFO}
            control={control}
            placeholder="반려견 관련 추가 정보"
          />
        </FormZoonolBody>
      </FormBody>
      <FormFooter>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            적용
          </Button>
        </Form.Item>
        <Button onClick={handleCancelButton} style={{ marginLeft: 10 }}>
          닫기
        </Button>
      </FormFooter>
    </Form>
  );
};

const PopupTitle = styled.div`
  font-weight: bold;
  text-align: center;
  font-size: 20px;
  font-family: 'Pretendard';
`;

const PopupText = styled.div`
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  font-size: 16px;
  font-family: 'Pretendard';
`;

const PopupBoldText = styled.div`
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: bold;
  text-align: center;
  margin: 10px 0;
`;

const FormBody = styled.div`
  display: flex;
  margin-top: 10px;
`;

const FormStoreInfoBody = styled.div`
  margin-right: 50px;
`;

const FormZoonolBody = styled.div``;

const FormFooter = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const EmptyButton = styled.div``;

export { InsertPopup, DeletePopup, UpdatePopup };
