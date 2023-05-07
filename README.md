# quiz

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### cors 문제 해결
/* https://nyang-in.tistory.com/272 */

### 잘했다고 생각하는 점
1. axios로 데이터를 받아오는 방식이 아니라서 직접 난이도와 문제유형에 따른 문제 필터링
2. axios로 데이터를 받아올때 타입지정은 실패했지만 indexable 타입으로 인한 오류 해결 및 extends로 타입 확장
3. 다양한 배열 메서드들을 활용하여 퀴즈 리스트 재가공
4. 틀린 문항 시각적으로 표현하기

### 아쉬운 부분
1. 이전 문제, 다음 문제로 이동하여 문제 푸는 순서를 선택할 수 있도록 하기 구현 x
2. vuex 사용으로 인해서 새로고침 시 오류 발생
3. 문제유형 빈값, uncategorized를 재가공하지 않았던 점
4. cors 문제를 일부 해결 하였으나 typescript 활용을 잘 못하여 로컬데이터로 작업한 점
5. 한번에 너무 많이 새로운 걸 적용해보려고 하면 잘 안 될 수 있다는 점

#### typescript 관련
1. axios로 가지고 온 data를 변수에 할당을 못하고 있음
2. 로컬로 작업을 하려고 해도 타입지정을 어떻게 해줘야 할지 모르겠음
3. indexable type 문제
4. extends로 객체타입 확장

### script setup 방식 문제

https://router.vuejs.org/guide/advanced/composition-api.html
https://www.reddit.com/r/vuejs/comments/qumhzq/composition_api_with_vuerouter_problem/
https://github.com/vuejs/vue-router/issues/3760

vue-router 가 script setup 방식에서는 작동이 되지 않음