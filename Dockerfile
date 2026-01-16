# 1단계: 빌드
FROM node:20-alpine AS build
WORKDIR /app
# ARG는 빌드 시점에만 사용되는 변수입니다.
ARG VITE_API_BASE_URL
ARG VITE_FRONTEND_ORIGIN
ARG VITE_GOOGLE_CLIENT_ID
ARG VITE_KAKAO_CLIENT_ID
ARG VITE_NAVER_CLIENT_ID
# 이를 환경 변수로 등록하여 빌드 프로세스가 인식하게 합니다.
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ENV VITE_FRONTEND_ORIGIN=$VITE_FRONTEND_ORIGIN
ENV VITE_GOOGLE_CLIENT_ID=$VITE_GOOGLE_CLIENT_ID
ENV VITE_KAKAO_CLIENT_ID=$VITE_KAKAO_CLIENT_ID
ENV VITE_NAVER_CLIENT_ID=$VITE_NAVER_CLIENT_ID


COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 2단계: 실행
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]