import styled from 'styled-components';
import { Modal, Form, Input, Checkbox, Button, Select } from 'antd';
import * as column from '@/constants/column';

const getNaverInfoFromUrl = (naverUrl) => {
  const url = new URL(naverUrl);
  const urlParams = url.searchParams;
  const lat = urlParams.get('lat');
  const lng = urlParams.get('lng');
  const pathname = url.pathname.split('/');
  const naverStoreId = pathname[pathname.length - 1];

  return { naverStoreId, lat, lng };
};

const StoreInfoForm = ({ form, defaultValue, type }) => {
  const isInsert = type === 'insert';
  return (
    <Form form={form}>
      <FormBody>
        <FormStoreInfoBody>
          <Form.Item
            label={column.STORE_COLUMN_CATEGORY_SEQ}
            name={column.STORE_COLUMN_CATEGORY_SEQ}
            initialValue={defaultValue?.[column.STORE_COLUMN_CATEGORY_SEQ]}
            rules={[{ required: isInsert, message: '새 장소 입력시 카테고리를 입력해주세요.' }]}
          >
            <Select
              defaultValue={1}
              options={[
                { value: 1, label: '식당' },
                { value: 2, label: '카페' },
                { value: 7, label: '호프' },
                { value: 8, label: '서점' },
              ]}
            />
          </Form.Item>
          <Form.Item
            label={column.STORE_COLUMN_NAME}
            name={column.STORE_COLUMN_NAME}
            initialValue={defaultValue?.[column.STORE_COLUMN_NAME]}
            rules={[{ required: isInsert, message: '새 장소 입력시 이름을 입력해주세요' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={column.STORE_COLUMN_ADDRESS}
            name={column.STORE_COLUMN_ADDRESS}
            initialValue={defaultValue?.[column.STORE_COLUMN_ADDRESS]}
            rules={[{ required: isInsert, message: '새 장소 입력시 주소를 입력해주세요' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={column.STORE_COLUMN_ROAD_ADDRESS}
            name={column.STORE_COLUMN_ROAD_ADDRESS}
            initialValue={defaultValue?.[column.STORE_COLUMN_ROAD_ADDRESS]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={column.STORE_COLUMN_PHONE_NUMBER}
            name={column.STORE_COLUMN_PHONE_NUMBER}
            initialValue={defaultValue?.[column.STORE_COLUMN_PHONE_NUMBER]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={column.STORE_COLUMN_DESCRIPTION}
            name={column.STORE_COLUMN_DESCRIPTION}
            initialValue={defaultValue?.[column.STORE_COLUMN_DESCRIPTION]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={column.STORE_COLUMN_THUMBNAIL}
            name={column.STORE_COLUMN_THUMBNAIL}
            initialValue={defaultValue?.[column.STORE_COLUMN_THUMBNAIL]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="url"
            name="url"
            rules={[{ required: isInsert, message: '새 장소 입력시 URL을 입력해주세요' }]}
          >
            <Input />
          </Form.Item>
        </FormStoreInfoBody>
        <FormZoonolBody>
          <Form.Item
            label={column.STORE_COLUMN_ZOONOL_PLACE}
            name={column.STORE_COLUMN_ZOONOL_PLACE}
            initialValue={Boolean(defaultValue?.[column.STORE_COLUMN_ZOONOL_PLACE])}
            valuePropName="checked"
          >
            <Checkbox />
          </Form.Item>
          <Form.Item
            label={column.STORE_COLUMN_NEED_CAGE}
            name={column.STORE_COLUMN_NEED_CAGE}
            initialValue={Boolean(defaultValue?.[column.STORE_COLUMN_NEED_CAGE])}
            valuePropName="checked"
          >
            <Checkbox />
          </Form.Item>
          <Form.Item
            label={column.STORE_COLUMN_LARGE_DOG_AVAILABLE}
            name={column.STORE_COLUMN_LARGE_DOG_AVAILABLE}
            initialValue={Boolean(defaultValue?.[column.STORE_COLUMN_LARGE_DOG_AVAILABLE])}
            valuePropName="checked"
          >
            <Checkbox />
          </Form.Item>
          <Form.Item
            label={column.STORE_COLUMN_OFF_LEASH}
            name={column.STORE_COLUMN_OFF_LEASH}
            initialValue={Boolean(defaultValue?.[column.STORE_COLUMN_OFF_LEASH])}
            valuePropName="checked"
          >
            <Checkbox />
          </Form.Item>
          <Form.Item
            label={column.STORE_COLUMN_ZOONOL_FEED_URL}
            name={column.STORE_COLUMN_ZOONOL_FEED_URL}
            initialValue={defaultValue?.[column.STORE_COLUMN_ZOONOL_FEED_URL]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={column.STORE_COLUMN_ADDITIONAL_INFO}
            name={column.STORE_COLUMN_ADDITIONAL_INFO}
            initialValue={defaultValue?.[column.STORE_COLUMN_ADDITIONAL_INFO]}
          >
            <Input />
          </Form.Item>
        </FormZoonolBody>
      </FormBody>
    </Form>
  );
};

const InsertPopup = ({ open, closeInsertPopup, fetchInsertStore }) => {
  const [form] = Form.useForm();

  const onSubmit = async (values) => {
    const naverInfo = getNaverInfoFromUrl(values.url);
    delete values.url;
    fetchInsertStore({ ...values, ...naverInfo });
  };

  const closeModal = () => {
    closeInsertPopup();
    form.resetFields();
  };

  return (
    <Modal
      style={{ top: 50 }}
      open={open}
      onCancel={closeModal}
      width={'80%'}
      footer={[
        <Button
          key="submit"
          type="primary"
          htmlType="submit"
          onClick={() =>
            form
              .validateFields()
              .then((values) => {
                onSubmit(values);
              })
              .catch((info) => {
                console.log('Validate Failed:', info);
              })
          }
        >
          Submit
        </Button>,
        <Button key="close" onClick={closeModal}>
          Close
        </Button>,
      ]}
    >
      <PopupTitle>스토어 추가</PopupTitle>
      <StoreInfoForm form={form} type="insert" />
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

const UpdatePopup = ({ open, storeInfo, closeUpdatePopup, fetchUpdateStore }) => {
  const [form] = Form.useForm();

  const checkUpdatedAddress = (prevValues, values) => {
    const prevAddress = prevValues['address'];
    const curAddress = values['address'];
    if (curAddress !== prevAddress) {
      return true;
    }
    return false;
  };

  const onSubmit = async (values) => {
    const { seq } = storeInfo;
    const updateStoreInfo = { seq, ...values };

    if (storeInfo) {
      const isUpdatedAddress = checkUpdatedAddress(storeInfo, values);
      if (isUpdatedAddress) {
        if (!values.url) return alert('URL을 입려해주세요');
        const naverInfo = getNaverInfoFromUrl(values.url);
        delete naverInfo.url;
        delete updateStoreInfo.url;
        fetchUpdateStore({ ...updateStoreInfo, ...naverInfo });
      } else {
        fetchUpdateStore(updateStoreInfo);
      }
    }
  };

  const closeModal = () => {
    closeUpdatePopup();
    form.resetFields();
  };

  return (
    <Modal
      open={open}
      onCancel={closeModal}
      style={{ top: 50 }}
      width={'80%'}
      footer={[
        <Button
          key="submit"
          type="primary"
          htmlType="submit"
          onClick={() =>
            form
              .validateFields()
              .then((values) => {
                onSubmit(values);
              })
              .catch((info) => {
                console.log('Validate Failed:', info);
              })
          }
        >
          Submit
        </Button>,
        <Button key="close" onClick={closeModal}>
          Close
        </Button>,
      ]}
    >
      <PopupTitle>스토어 수정</PopupTitle>
      <StoreInfoForm form={form} defaultValue={storeInfo} />
    </Modal>
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

export { InsertPopup, DeletePopup, UpdatePopup };
