<template>
  <div>

    최대 20개<br>
    난이도는 상중하<br>
    항상랜덤으로만 가능<br>
    <br>
    카테고리 다 나오는지 확인하고 스타일 작업 하기
    <br>
    선택 가능 항목 : 
    개수, -> selectoption 말고 input range 형식으로 
    난이도, 
    카테고리
    <br>
    문제 영역으로 들어가서는 
    새로시작하기 -> 새로 랜덤하게 생성
    다시 풀어보기 -> 기존 문제 다시 풀어보기
    지난 문제 다시 풀어보기 -> 문제들을 브라우저 local strorage 에 저장하여 지난 문제들도 다시 풀어볼 수 있도록 하기

    맞은 개수, 점수 제공 + 틀린 문제 맞은 문제 시각적으로 보여주기



    <br>

    <h2>{{ selectCate }}</h2>
    <h2>{{ selectDiffculty }}</h2>
    <h2>{{ selectLimit }}</h2>
    {{ selectTags }}
    <hr>
    <ul>
      <li @click="selectCate = category" v-for="category in categoryList " :key="category">{{ category }}</li>
    </ul>
    <hr>
    <ul>
      <li @click="selectDiffculty = difficulty" v-for="difficulty in difficultyList" :key="difficulty">{{ difficulty }}</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { ref, onMounted} from 'vue'


const base_url = 'https://quizapi.io/api/v1/questions'
const appkey = 'cf5rtiNpfWzbQLR8koTel9nGLNlqWgit484Xt2o4'
const corsherokuapp_url = 'https://cors-anywhere.herokuapp.com/'

type categoryType = 'Linux' | 'DevOps' | 'Networking' | 'Programming' | 'Cloud' | 'Docker' | 'Kubernetes' | 'And lots more'
type difficultyType = 'Easy' | 'Medium' | 'Hard'
type limitType = number

const categoryList: categoryType[] = ['Linux', 'DevOps', 'Networking', 'Programming', 'Cloud', 'Docker', 'Kubernetes',  'And lots more']
const difficultyList :difficultyType[] = ['Easy', 'Medium', 'Hard']

let selectCate = ref<categoryType | ''>('')
let selectDiffculty = ref<difficultyType | ''>('')
let selectLimit = ref<limitType>(20)
let selectTags = ref<string>('')


// ref 로 배열 선언 하는 방법 찾아보기








onMounted(() => {
  // axios.post(`${base_url}/?apiKey=${appkey}&limit=10`)
  //   .then((res) => {
  //     console.log(res)
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   })
  
  /* 403 에러 떳는데... 시간이 지나서 된건가???? 왜... */
  axios({
  method: 'get',
  url: `${corsherokuapp_url}${base_url}/?apiKey=${appkey}&limit=10&category=${categoryList[7]}&difficulty=easy&tags=Linux`,
    }).then((res) => {
      // console.log(res.data)
      res.data.forEach(element => {
        console.log(element.category)
      });
    })
    .catch((error) => {
      console.log(error);
  })


})

</script>

<style scoped>

</style>