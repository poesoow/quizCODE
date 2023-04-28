<template>
  <div class="w-full flex justify-center items-center h-full">
    <!-- <button @click="getQuizLists()">퀴즈 api 호출</button> -->
      <div class="mx-auto w-10/12 lg:w-6/12 flex flex-wrap items-center">
        <form @submit.prevent>
          <div class="w-full bg-white rounded-lg p-5 flex gap-x-5 flex-wrap justify-center">
            <input 
              @keyup.enter="NameChk"
              v-model="userName" type="text" 
              placeholder="이름을 입력해주세요"
              class="border pl-4 py-2 rounded-md shadow-md outline-none basis-full sm:basis-5/12"
            />
            <button 
              @click="NameChk"
              class="btn-primary text-sm sm:text-base bg-blue-500 hover:bg-blue-700 focus:ring-blue-400 sm:py-0 basis-full sm:basis-3/12 mt-5 sm:mt-0">
              시작하기
            </button>
            <div class=" mt-4 text-xs sm:text-sm font-bold">
              <span class="block mb-2">
                <strong>{{ userName === '' ? '방문자' : userName }}</strong>님 반갑습니다.
              </span> 문제 난이도는 
              <strong class="text-xl text-blue-800">{{ selectDiffculty }}</strong>이고, 
              <strong class="text-xl text-blue-800">{{ selectCate }}</strong>유형을 선택하였으며, 총 {{ quizsList.length }}개의 문제 중 
              <strong class="text-xl text-blue-800">{{ selectLimit }}</strong>문제를 선택하였습니다.</div>
          </div>
        </form>
        <div class="w-full bg-white rounded-lg p-5 mt-5 flex justify-between items-center flex-wrap">
          <div class="flex justify-around flex-wrap items-center basis-full xl:basis-4/12">
            <label for="difficulty-select" class="btn-primary sm:text-sm text-xs bg-green-500 hover:bg-green-700 focus:ring-green-400 basis-5/12 text-center">난이도</label>
            <select v-model="selectDiffculty" id="difficulty-select" class="border rounded basis-6/12 py-1 text-center">
              <option v-for="(difficulty, index) in difficultyList.sort()" :key="index" :value="difficulty"> {{ difficulty }}</option>
            </select>
          </div>
          <div class="flex justify-around flex-wrap items-center basis-full xl:basis-4/12 my-5 xl:my-0">
            <label for="type-select" class="btn-primary sm:text-sm text-xs bg-green-500 hover:bg-green-700 focus:ring-green-400 basis-5/12 text-center">문제유형</label>
            <select v-model="selectCate" id="type-select" class="border rounded basis-6/12 py-1 text-center">
              <option v-for="(cate, index) in cateLists.sort()" :key="index" :value="cate"> {{ cate }}</option>
            </select>
          </div>
          <div class="flex justify-around flex-wrap items-center basis-full xl:basis-4/12">
            <label for="count-select" class="btn-primary sm:text-sm text-xs bg-green-500 hover:bg-green-700 focus:ring-green-400 basis-5/12 text-center">개수설정</label>
            <select v-model="selectLimit" id="count-select" class="border rounded basis-6/12 py-1 text-center">
              <option v-for="e in 20" :key="e" :value="e">{{ e }}문제</option>
            </select>
          </div>
        </div>
        <!-- -->
        <div 
          class="error fixed bg-white left-1/2 top-[48%] -translate-x-1/2 -translate-y-1/2 z-50 border rounded-lg duration-700 transition-all w-3/4 sm:w-2/4 lg:w-1/6 opacity-0 invisible">
          <h3 class="bg-gray-100 p-2 pl-4"></h3>
          <p class="p-4 pt-8 pb-12">{{ userName === '' && '이름없이 진행하시겠습니까?' }}</p>
          <button 
            @click="QuizStart"
            class="btn-primary absolute right-1 bottom-1 text-sm sm:text-base bg-blue-500 hover:bg-blue-700 focus:ring-blue-400 sm:py-0 mt-5 sm:mt-0">
            시작하기
          </button>
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">
// import axios from 'axios';
import { ref, computed, ComputedRef, watch } from 'vue'
import { RouteLocationRaw, useRouter, useRoute, LocationQueryRaw  } from 'vue-router';

// const base_url = 'https://quizapi.io/api/v1/questions'
// const appkey = 'TMjrFdFuQYVWxiY4mKRAttBF5OBJuaGXbJImn1AA'
// /* https://cors-anywhere.herokuapp.com/ */
// /* https://nyang-in.tistory.com/272 */
// /* https://cors.bridged.cc/ */
// const cors_url = 'https://proxy.cors.sh/'

type difficultyType = 'Easy' | 'Medium' | 'Hard'
type limitType = number

//type QuizCount = number;

const selectCate = ref<string>('Code')
const selectDiffculty = ref<difficultyType>('Easy')
const selectLimit = ref<limitType>(20)
// let selectTags = ref<string>('') // tag 는 사용 생각해보기
const userName = ref<string>('')

/* 타입지정을 어떻게 해줘야 동작을 하는 것인지... axios로 데이터 받아올때 타입지정이 필요해서 꼭 로컬에서도 먼저 성공해야 할거 같은데... */
// type QuizType = {
//   id: number;
//   question: string
//   description? : null
//   answers: {
//     [key :string]: string,
//   },
//   category: string;
//   correct_answer: string;
//   correct_answers: { 
//     [key: string]: string;
//   }
//   difficulty: string
//   explanation?: null
//   multiple_correct_answers: string
//   tags?: [{name: string}]
//   tip?: null
// };

// type GetQuizsResponse = {
//   data: QuizType[];
// };

/* 임시작업용 */
import tempoList from '../assets/temporaryQuiz.json'
// const quizsList = ref<GetQuizsResponse>(tempoList)
const quizsList = ref(tempoList)

// 문제유형 배열
const cateLists: ComputedRef<unknown[] | string[]>  = computed(() => {
  return [...new Set(quizsList.value.map((list) => list.category))].map(category => category === '' ? '기타' : category)
})
// 문제난이도 배열
const difficultyList: ComputedRef<unknown[] | string[]> = computed(() => {
  return [...new Set(quizsList.value.map((list) => list.difficulty))]
})


// 퀴즈 api 호출로 변수에 저장해서 사용하기 시도 중
// let testData : QuizType[];


//   /* &limit=20&category=${categoryList[7]}&difficulty=easy&tags=Linux */
//   /* https://bobbyhadz.com/blog/typescript-http-request-axios */
/* onmounted 되면 함수 실행되도록 수정 필요 */
//   async function getQuizLists() {
//       try {
//       // 👇️ const data: GetUsersResponse
//       const { data, status } = await axios.get<GetQuizsResponse>(
//         `${cors_url}${base_url}/?apiKey=${appkey}`,
//         {
//           headers: {
//             // Accept: 'application/json',
//             'x-cors-api-key': 'temp_2425c259f56599af91548f4d77b54a8b'
//           },
//         },
//       );

//       // console.log(JSON.stringify(data, null, 4));
//       console.log(data)
//       // 👇️ "response status is: 200"
//       console.log('response status is: ', status);
      
//       testData = data;

//       return data;
//     } catch (error) {
//       if (axios.isAxiosError(error)) {
//         console.log('error message: ', error.message);
//         return error.message;
//       } else {
//         console.log('unexpected error: ', error);
//         return 'An unexpected error occurred';
//       }
//     }
//   }
  
  function NameChk() {
    if (!userName.value) {
      /* document querSelector 말고 ref로 활용하는방법도 시도해보기 */
       const errorEl = document.querySelector('.error')

      errorEl?.classList.remove('invisible', 'opacity-0', 'top-[48%]')
      errorEl?.classList.add('top-1/2', 'opacity-1')
      setTimeout(() => {
        errorEl?.classList.remove('top-1/2', 'opacity-1')
        errorEl?.classList.add('invisible', 'opacity-0', 'top-[48%]')
      }, 2500)
    } else {
      QuizStart();
    }    
  }

  function QuizStart(){
    console.log('퀴즈 스타트')


    const router = useRouter()
    const route = useRoute()

    function pushWithQuery(query: LocationQueryRaw | undefined) {
      router.push({
        name: 'QuizapiView',
        query: {
          ...route.query,
          ...query,
          // userName: userName,  // 홈뷰에서 이름 쓴걸로 라우터로 넘기기 위해
          // selectDiffculty: selectDiffculty, // 랜덤인지 아닌지
          // selectCate: selectCate, // 타입
          // selectLimit: selectLimit // 문항 수
        },
      })
    }
  }





</script>
