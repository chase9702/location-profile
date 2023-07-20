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
   # 최초 실행시에는 npm install 로 npm moudle을 설치 해야 함
    npm start # or npm run dev
    ```
3. frontend 접속 정보 [http://localhost.com:3000](http://localhost.com:3000) 로 접속
### frontend bundle analyzer
* [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer) 를 설치해둬서 웹팩을 이용해 번들링되는 모듈들은 분석화면으로 확인할 수 있음
* webpack-dev-server가 뜨면 8888번 포트로 접속하면 확인할 수 있음
    * [http://localhost:8888](http://local-cube.kakao.com:8888)
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




### 로컬에서 Hive 설정하기 (feat. docker)

* **도커 설치와 실행을 로컬pc에 진행 후 아래 단계를 진행**

1. docker hive(하둡) 이미지 파일을 압축한 hive.tar파일(3.7gb)을 공용폴더(172.30.100.100)에서 받음
2. tar 파일을 docker 이미지로 load
```bash
docker load -i hive.tar
```
3. 도커 이미지 파일 실행 및 접속
```bash
docker run -d -p 10000:10000 -p 10001:10001 -p 10002:10002 -p 8088:8088 --name hive1 -it --privileged=true ddong4753/hive:latest /sbin/init
docker exec -it -u 0 hive1 /bin/bash
```
4. 도커 컨테이너 ssh 22 포트 개방
```bash
#파일 가운데의 PermitRootLogin을 yes로 바꿈
vi /etc/ssh/sshd_config #vim 사용법은 인터넷에서 확인
service ssh start
```

5. hosts 파일 및 hostname 변경
```bash
vi /etc/hosts         #  마지막 줄 host 정보를 namenode로 변경 후 저장
vi /etc/hostname      #  host 정보를 namenode 로 변경 후 저장
hostnamectl set-hostname namenode
# hostname 처서 namenode 나오면됨 
```
6. **시스템 계정 변경**
```bash
su - hadoop 
```
7. 새로 컨테이너 시작했기 때문에 bashrc 변경내용 적용
```bash
cd ~
source .bashrc
```
8. 하둡 실행
```bash
start-all.sh
#실행 쉘스크립트 실행 후 
jps
#jps 입력 결과가 아래와 같이 나오면 성공 (DataNode가 나오는지 확인 필수) 
Jps
NodeManager
SecondaryNameNode
NameNode
ResourceManager
DataNode
```
* **datanode 실행 안되면 datanode/current 폴더 삭제**
```bash
sudo rm -rf /home/hadoop/hdfs/datanode/current 
#sudo 비밀번호 : 1234
```

9. 하둡 폴더 생성
```bash
hdfs dfs -mkdir /tmp
hdfs dfs -mkdir -p /user/hive/warehouse
hdfs dfs -chmod g+w /tmp
hdfs dfs -chmod -R g+w /user

#명령어 실행 후 
hdfs dfs -ls / #폴더 생성되었는지 확인 
```

10. hiveserver 실행
```bash
hive --service metastore &
 #화면에 로그 더 이상 나오지 않는것 확인 후 ctrl+c로 나와서 
hive --service hiveserver2 & 
```

11. 테이블 생성 및 테스트 
```bash
hive 
#hive로 하이브 쉘 실행
#원하는 디비 생성 및 테이블 생성하고 난 후 테스트 진행 
```

* 로그 확인
```bash
cat -t /tmp/hadoop/hive.log
```