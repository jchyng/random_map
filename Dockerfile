# Node.js v20 이미지를 기반으로 합니다
FROM arm64v8/node:20-bullseye-slim


# 작업 디렉토리를 설정합니다
WORKDIR /usr/src/app

# package.json과 package-lock.json 파일을 복사합니다
COPY package*.json ./

# 데이터 디렉터리와 애플리케이션 코드 복사
COPY . .

# 의존성을 설치합니다
RUN npm install

# 애플리케이션이 사용할 포트를 노출합니다
EXPOSE 3000

# 애플리케이션을 시작하는 명령을 실행합니다
CMD ["node", "server"]
