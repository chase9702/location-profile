# Location Intelligence
위치기반 정보제공 플랫폼
## Project 구성
### Profile-dashboard
위치기반 프로파일 정보를 제공해주는 대시보드
#### backend
Spring boot 로 구성한 백엔드 프로젝트
* Java 11
* Spring Boot 2.7.4
* Kotlin 1.7.20
### frontend
React(Typescript) 로 구성한 프론트엔드 프로젝트
* React 17.0.3
* Typescript 5.0.4
  

**개발 시에는 backend와 frontend 프로젝트를 각각 띄워서 사용하고, 배포 시에는 하나의 jar 파일로 빌드하여 배포**
## Development
profile-dashboard 프로젝트는 frontend 프로젝트와 backend 프로젝트를 각각 띄워서 개발하도록 구성되어 있다. backend는 일반적인 Spring Boot 프로젝트이므로 실행하면 바로 서버가 실행된다. frontend 프로젝트는 [webpack-dev-server](https://github.com/webpack/webpack-dev-server) proxy를 이용해 들어오는 모든 요청을 backend([http://127.0.0.1:8080](http://127.0.0.1:8080))로 넘기도록 설정되어 있다.
따라서, 각각 실행하고 [http://127.0.0.1:3000](http://127.0.0.1:3000)으로 접속하면 개발을 시작할 수 있다
### 기본 port 정보
* Spring boot: 8080
* webpack-dev-server: 3000
#### Kotlin Kotest
[Kotlin Kotest](https://kotest.io/) 를 사용 시, [IntelliJ 관련 플러그인](https://plugins.jetbrains.com/plugin/14080-kotest) 설치 필요
### Convention
* Kotlin : [Kotlin convention](https://kotlinlang.org/docs/code-style-migration-guide.html)
### profile-dashboard 프로젝트 실행 방법
1. **backend**: Spring boot 실행
    ```bash
    ./gradlew [clean] bootRun
    ```
   이전에 `prodBuild`를 수행했다면 backend 프로젝트에 frontend를 빌드한 *static* 파일들이 남아있을 것이므로, `clean`을 같이 써줘야 할 때도 있음
2. **frontend**: webpack-dev-server 실행
    ```bash
    cd frontend
    npm start # or npm run dev
    ```
3. frontend 접속 정보 [http://localhost.com:3000](http://localhost.com:3000) 로 접속
### frontend bundle analyzer
* [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer) 를 설치해둬서 웹팩을 이용해 번들링되는 모듈들은 분석화면으로 확인할 수 있음
* webpack-dev-server가 뜨면 8888번 포트로 접속하면 확인할 수 있음
    * [http://local-cube.kakao.com:8888](http://local-cube.kakao.com:8888)
### Swagger UI
* Local URL: [http://localhost:8080/swagger-ui/index.html#/](http://localhost:8080/swagger-ui/index.html#/)
## profile-dashboard 프로젝트 Product build
```bash
./gradlew [clean] prodBuild
```
실행 순서
1. `:profile-dashboard:frontend:prodBuild`
0. `clean`: *frontend/build*, *backend/src/main/resources/static* 디렉터리 삭제
1. `build`: npm이 webpack과 babel을 이용해 번들링한 결과를 *frontend/build* 디렉터리에 저장
2. `moveBuild`: *frontend/build*에 생성된 frontend 프로젝트 결과물을 *backend/src/main/resources/static* 디렉터리로 이동
2. `clean`: backend 프로젝트 clean
3. `build`: frontend 결과를 포함한 backend 프로젝트를 빌드 *profile-location-0.0.1-SNAPSHOT.jar* 파일 생성