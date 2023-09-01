FROM node:18.17-alpine3.18

ENV TZ Asia/Seoul

WORKDIR /usr/app

COPY . .
RUN yarn install
RUN --mount=type=secret,id=NEXT_PUBLIC_NAVER_MAP_ID \
  export NEXT_PUBLIC_NAVER_MAP_ID=$(cat /run/secrets/NEXT_PUBLIC_NAVER_MAP_ID) \
  --mount=type=secret,id=NEXT_PUBLIC_PRODUCTION_ENDPOINT \
  export NEXT_PUBLIC_PRODUCTION_ENDPOINT=$(cat /run/secrets/NEXT_PUBLIC_PRODUCTION_ENDPOINT) \
  --mount=type=secret,id=NEXT_PUBLIC_GA_ID \
  export NEXT_PUBLIC_GA_ID=$(cat /run/secrets/NEXT_PUBLIC_GA_ID) yarn build
ENV NODE_ENV production

CMD [ "yarn", "start" ]
EXPOSE 3000
