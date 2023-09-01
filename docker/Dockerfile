FROM node:18.17-alpine3.18

ENV TZ Asia/Seoul

WORKDIR /usr/app

COPY . .
RUN --mount=type=secret,id=NEXT_PUBLIC_NAVER_MAP_ID \
  --mount=type=secret,id=NEXT_PUBLIC_PRODUCTION_ENDPOINT \
  --mount=type=secret,id=NEXT_PUBLIC_GA_ID \
  export NEXT_PUBLIC_NAVER_MAP_ID=$(/run/secrets/NEXT_PUBLIC_NAVER_MAP_ID) && \
  export NEXT_PUBLIC_PRODUCTION_ENDPOINT=$(/run/secrets/NEXT_PUBLIC_PRODUCTION_ENDPOINT) && \
  export NEXT_PUBLIC_GA_ID=$(/run/secrets/NEXT_PUBLIC_GA_ID)
RUN yarn install
RUN yarn build

ENV NODE_ENV production

CMD [ "yarn", "start" ]
EXPOSE 3000
