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



최대 20개
난이도는 상중하
항상랜덤으로만 가능
카테고리 다 나오는지 확인하고 스타일 작업 하기

선택 가능 항목 : 
개수, -> selectoption 말고 input range 형식으로 
난이도, 
카테고리

문제 영역으로 들어가서는 
새로시작하기 -> 새로 랜덤하게 생성
다시 풀어보기 -> 기존 문제 다시 풀어보기
지난 문제 다시 풀어보기 -> 문제들을 브라우저 local strorage 에 저장하여 지난 문제들도 다시 풀어볼 수 있도록 하기

맞은 개수, 점수 제공 + 틀린 문제 맞은 문제 시각적으로 보여주기

### typescript 문제
1. api axios로 가지고 온 data를 변수에 할당을 못하고 있음
2. 로컬로 작업을 하려고 해도 타입지정을 어떻게 해줘야 할지 모르겠음

### script setup 방식 문제

https://router.vuejs.org/guide/advanced/composition-api.html
https://www.reddit.com/r/vuejs/comments/qumhzq/composition_api_with_vuerouter_problem/
https://github.com/vuejs/vue-router/issues/3760

vue-router 가 script setup 방식에서는 작동이 되지 않음