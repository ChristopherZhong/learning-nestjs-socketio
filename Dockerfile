FROM node:16.14.2-bullseye

FROM node:16.14.2-bullseye as build
ENV NODE_ENV=build
WORKDIR /build
COPY package*.json ./
RUN npm set-script prepare "" && npm ci
COPY prisma/ ./prisma/
RUN npx prisma generate
COPY . .
RUN npm run build
ARG BUILD_VERSION
ARG PIPELINE_ID
ARG PIPELINE_INTERNAL_ID
ARG PIPELINE_URL
ARG GIT_BRANCH
ARG COMMIT_SHA
ARG COMMIT_TIME
ENV APP_INFO_BUILD_VERSION=${BUILD_VERSION}
ENV APP_INFO_CI_PIPELINE_ID=${PIPELINE_ID}
ENV APP_INFO_CI_PIPELINE_INTERNAL_ID=${PIPELINE_INTERNAL_ID}
ENV APP_INFO_CI_PIPELINE_URL=${PIPELINE_URL}
ENV APP_INFO_GIT_BRANCH=${GIT_BRANCH}
ENV APP_INFO_GIT_COMMIT_SHA=${COMMIT_SHA}
ENV APP_INFO_GIT_COMMIT_TIME=${COMMIT_TIME}

FROM node:16.14.2-bullseye-slim
ENV NODE_ENV=production
RUN apt-get update && apt-get install --no-install-recommends --yes tini
ENTRYPOINT ["tini", "--", "docker-entrypoint.sh"]
WORKDIR /app
COPY package*.json ./
RUN npm set-script prepare "" && npm ci --only=production
COPY --from=build /build/node_modules/.prisma/ ./node_modules/.prisma/
COPY --from=build /build/prisma/ ./prisma/
COPY --from=build /build/dist/ ./dist/
ARG BUILD_VERSION
ARG PIPELINE_ID
ARG PIPELINE_INTERNAL_ID
ARG PIPELINE_URL
ARG GIT_BRANCH
ARG COMMIT_SHA
ARG COMMIT_TIME
ENV APP_INFO_BUILD_VERSION=${BUILD_VERSION}
ENV APP_INFO_CI_PIPELINE_ID=${PIPELINE_ID}
ENV APP_INFO_CI_PIPELINE_INTERNAL_ID=${PIPELINE_INTERNAL_ID}
ENV APP_INFO_CI_PIPELINE_URL=${PIPELINE_URL}
ENV APP_INFO_GIT_BRANCH=${GIT_BRANCH}
ENV APP_INFO_GIT_COMMIT_SHA=${COMMIT_SHA}
ENV APP_INFO_GIT_COMMIT_TIME=${COMMIT_TIME}
USER node
EXPOSE 3000
CMD ["bash", "-c", "npx prisma migrate deploy && node dist/main.js"]