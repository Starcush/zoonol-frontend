FROM node:18.17-alpine3.18

ENV TZ Asia/Seoul

WORKDIR /usr/app

COPY . .
RUN yarn install
RUN --mount=type=secret,id=map_id \
  --mount=type=secret,id=production_endpoint \
  --mount=type=secret,id=ga_id \
  cat /run/secrets/map_id \
  cat /run/secrets/production_endpoint \
  cat /run/secrets/ga_id \
  yarn build
ENV NODE_ENV production

CMD [ "yarn", "start" ]
EXPOSE 3000
