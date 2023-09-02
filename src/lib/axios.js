import Axios from 'axios';

const RESPONSE_STATUS_BAD_REQUEST = 400;
const RESPONSE_STATUS_CODE_NO_SESSION = 401;
const RESPONSE_STATUS_CODE_NOT_FOUND = 404;
const RESPONST_STATUS_CODE_INTERNAL = 500;

const env = process.env.NODE_ENV;
const isDev = env === 'development';

console.log(
  'process.env.NEXT_PUBLIC_PRODUCTION_ENDPOINT: ',
  process.env.NEXT_PUBLIC_PRODUCTION_ENDPOINT
);

export const defaultAxios = Axios.create({
  baseURL: isDev
    ? process.env.NEXT_PUBLIC_LOCAL_ENDPOINT
    : process.env.NEXT_PUBLIC_PRODUCTION_ENDPOINT,
  withCredentials: true,
});

const successHandler = (res) => {
  const data = res?.data;
  if (!data) {
    return Promise.reject(res);
  }

  const { statusCode, message } = data;
  switch (statusCode) {
    case RESPONSE_STATUS_BAD_REQUEST:
      console.log(message);
      break;
  }

  return res;
};

const errorHandler = (error) => {
  const data = error?.response?.data?.error;
  if (!data) {
    return Promise.reject(error);
  }

  const { statusCode } = data;
  let overriden = error;

  switch (statusCode) {
    case RESPONSE_STATUS_CODE_NO_SESSION:
      break;
    case RESPONST_STATUS_CODE_INTERNAL:
      overriden = {
        response: {
          data: {
            error: { message: '오류가 발생했습니다. 잠시후 다시 시도해주세요' },
          },
        },
      };
      break;
    case RESPONSE_STATUS_CODE_NOT_FOUND:
      overriden = {
        response: {
          data: {
            error: { message: '오류가 발생했습니다. 잠시후 다시 시도해주세요' },
          },
        },
      };
      break;
  }
  return Promise.reject(overriden);
};

defaultAxios.interceptors.response.use(successHandler, errorHandler);
