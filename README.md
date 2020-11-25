### (Study-Project-002) ⬆ TDD 를 적용하여 만드는 node.js 서버    
---

#### Introduce
> 테스트 주도 개발(TDD)를 활용하여 node.js API 서버를 구축하는 예제입니다. 구축하는 API 서버는 기본적인 등록/조회/삭제/변경 에 관한 기능으로 구성되어 있습니다. 간단한 예제를 통해 테스트 주도 개발의 중요성과 실제 API 개발 시 어떻게 활용할 수 있을 지에 부분을 다루고 있습니다. 해당 소스는 "김정환"님의 강의를 바탕으로 작성되었습니다.
---
#### Installation
```
npm install
npm start  // 서버 구동
npm test   // 테스트 실행
```
---   
#### Library & Framework  
1. mocha (test) - https://mochajs.org/
2. express (Web Framework) - https://expressjs.com/ko/
3. supertest (test) - https://www.npmjs.com/package/supertest 
4. sequelize - https://sequelize.org
5. sqlite3 - https://www.sqlite.org/index.html   
---
#### API Functions
1. 조회 (GET /users)
2. 등록 (POST /users)
3. 삭제 (DELETE /users/:id)
4. 변경 (PUT /users/:id)   
---
#### 추가로 해 보기...  
✔ 다른 데이터 베이스 사용해 보기 (mongoDB)
