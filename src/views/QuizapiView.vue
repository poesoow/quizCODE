<template>
  <div class="w-full flex justify-center items-center h-full">
    {{ cateLists }}
      <div class="mx-auto w-10/12 lg:w-6/12 flex flex-wrap items-center">
        <form @submit.prevent>
          <div class="w-full bg-white rounded-lg p-5 flex gap-x-5 flex-wrap justify-center">
            <input v-model="userName" type="text" class="border pl-4 py-2 rounded-md shadow-md outline-none basis-full sm:basis-5/12">
            <button class="btn-primary text-sm sm:text-base bg-blue-500 hover:bg-blue-700 focus:ring-blue-400 sm:py-0 basis-full sm:basis-3/12 mt-5 sm:mt-0">시작하기</button>
            <div class=" mt-4 text-xs sm:text-sm font-bold"><span class="block mb-2">{{ "방문자" }}님 반갑습니다.</span> 문제 유형은 {{ true ? '기본값' : '랜덤' }}이고, {{ selectCate }}유형을 선택하였으며, 총 {{ 10 }}개의 문제 중 {{ selectLimit }}문제를 선택하였습니다.</div>
          </div>
        </form>
        <div class="w-full bg-white rounded-lg p-5 mt-5 flex justify-between items-center flex-wrap">
          <div class="flex justify-around flex-wrap items-center basis-full xl:basis-4/12">
            <label for="random-select" class="btn-primary sm:text-sm text-xs bg-green-500 hover:bg-green-700 focus:ring-green-400 basis-5/12 text-center">랜덤설정</label>
            <select id="random-select" class="border rounded basis-6/12 py-1 text-center">
              <option value="0">기본</option>
              <option value="1">랜덤</option>
            </select>
          </div>
          <div class="flex justify-around flex-wrap items-center basis-full xl:basis-4/12 my-5 xl:my-0">
            <label for="type-select" class="btn-primary sm:text-sm text-xs bg-green-500 hover:bg-green-700 focus:ring-green-400 basis-5/12 text-center">문제유형</label>
            <select v-model="selectCate" id="type-select" class="border rounded basis-6/12 py-1 text-center">
              <!-- <option v-for="(cate, index) in cateLists.sort()" :key="index" :value="cate"> {{ cate }}</option> -->
            </select>
          </div>
          <div class="flex justify-around flex-wrap items-center basis-full xl:basis-4/12">
            <label for="count-select" class="btn-primary sm:text-sm text-xs bg-green-500 hover:bg-green-700 focus:ring-green-400 basis-5/12 text-center">개수설정</label>
            <select v-model="selectLimit" id="count-select" class="border rounded basis-6/12 py-1 text-center">
              <option v-for="e in 20" :key="e" :value="e">{{ e }}문제</option>
            </select>
          </div>
        </div>
        <div class="error fixed bg-white left-1/2 top-[48%] -translate-x-1/2 -translate-y-1/2 z-50 border rounded-lg duration-700 transition-all w-3/4 sm:w-2/4 lg:w-1/6  opacity-0 invisible">
          <h3 class="bg-gray-100 p-2 pl-4">필수</h3>
          <p class="p-4 py-6">{{ "에러메세지" }}</p>
        </div>
      </div>
    </div>


  <div>
    <h2>{{ selectCate }}</h2>
    <h2>{{ selectDiffculty }}</h2>
    <h2>{{ selectLimit }}</h2>
    <hr>
    
    <hr>
    <ul>
      <li @click="selectDiffculty = difficulty" v-for="difficulty in difficultyList" :key="difficulty">{{ difficulty }}</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
// import { ref, onMounted, computed, ComputedRef } from 'vue'
import { ref, onMounted } from 'vue'

const base_url = 'https://quizapi.io/api/v1/questions'
const appkey = 'TMjrFdFuQYVWxiY4mKRAttBF5OBJuaGXbJImn1AA'
/* https://cors-anywhere.herokuapp.com/ */
/* https://nyang-in.tistory.com/272 */
/* https://cors.bridged.cc/ */
const cors_url = 'https://proxy.cors.sh/'

type difficultyType = 'Easy' | 'Medium' | 'Hard'
type limitType = number


const difficultyList :difficultyType[] = ['Easy', 'Medium', 'Hard']

const selectCate = ref<string>('Code')
const selectDiffculty = ref<difficultyType | ''>('')
const selectLimit = ref<limitType>(20)
// let selectTags = ref<string>('') // tag 는 사용 생각해보기
const userName = ref<string>('')

/* 임시작업용 */
// import tempoList from '../assets/temporaryQuiz.json'
// const quizsList = ref(tempoList)

// 문제유형 배열
// const cateLists: ComputedRef<string[]> = computed(() => {
//   return [...new Set(quizsList.value.map((list) => list.category))].map(category => category === '' ? '기타' : category)
// })





onMounted(() => {
  /* &limit=20&category=${categoryList[7]}&difficulty=easy&tags=Linux */

  axios.get(`${cors_url}${base_url}/?apiKey=${appkey}`, {
    headers: {
      'x-cors-api-key': 'temp_2425c259f56599af91548f4d77b54a8b',
    }
  }).then((res) => {
    console.log(res)
    //   const cateLists: ComputedRef<string[]> = computed(() => {
    //   return [...new Set(res.data.map((list) => list.category))].map(category => category === '' ? '기타' : category)
    // })
  })
    .catch((error) => {
      console.log(error);
    })
})





</script>
