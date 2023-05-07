<template>
  <div class="w-full flex justify-center items-center h-full">
    <div class="mx-auto w-10/12 lg:w-6/12 flex flex-wrap items-center">
      <!-- info 영역 -->
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
          <strong class="text-xl text-blue-800">{{ selectCount }}</strong>문제를 선택하였습니다.</div>
      </div>
      <!-- 선택 영역 -->
      <div class="w-full bg-white rounded-lg p-5 mt-5 flex justify-between items-center flex-wrap">
        <div class="flex justify-around flex-wrap items-center basis-full xl:basis-6/12 mb-5">
          <label for="random-select" class="btn-primary sm:text-sm text-xs bg-green-500 hover:bg-green-700 focus:ring-green-400 basis-4/12 text-center">문제 순서</label>
          <select v-model="selectRandom" id="random-select" class="border rounded basis-5/12 py-1 text-center">
            <option value="0">기본</option>
            <option value="1">랜덤</option>
          </select>
        </div>
        <div class="flex justify-around flex-wrap items-center basis-full xl:basis-6/12 mb-5">
          <label for="difficulty-select" class="btn-primary sm:text-sm text-xs bg-green-500 hover:bg-green-700 focus:ring-green-400 basis-4/12 text-center">난이도</label>
          <select @change="selectCount = limitCount" v-model="selectDiffculty" id="difficulty-select" class="border rounded basis-5/12 py-1 text-center">
            <option v-for="(difficulty, index) in difficultyList.sort()" :key="index" :value="difficulty"> {{ difficulty }}</option>
          </select>
        </div>
        <div class="flex justify-around flex-wrap items-center basis-full xl:basis-6/12 mb-5">
          <label for="type-select" class="btn-primary sm:text-sm text-xs bg-green-500 hover:bg-green-700 focus:ring-green-400 basis-4/12 text-center">문제유형</label>
          <select  @change="selectCount = limitCount" v-model="selectCate" id="type-select" class="border rounded basis-5/12 py-1 text-center">
            <option v-for="(count, key) in cateCount" :key="count" :value="key"> {{ key }}</option>
          </select>
        </div>
        <div class="flex justify-around flex-wrap items-center basis-full xl:basis-6/12 mb-5">
          <label for="count-select" class="btn-primary sm:text-sm text-xs bg-green-500 hover:bg-green-700 focus:ring-green-400 basis-4/12 text-center">개수설정</label>
          <select v-model="selectCount" id="count-select" class="border rounded basis-5/12 py-1 text-center">
            <option v-for="e in limitCount" :key="e" :value="e">{{ e }}문제</option>
          </select>
        </div>
      </div>
      <!-- 이름없는 경우 팝업창 -->
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

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from '@/store'

/* 임시작업용 */
import tempoList from '../assets/temporaryQuiz.json'
import { RouteLocationRaw } from 'vue-router';

// import axios from 'axios';

// const base_url = 'https://quizapi.io/api/v1/questions'
// const appkey = 'TMjrFdFuQYVWxiY4mKRAttBF5OBJuaGXbJImn1AA'
// /* https://cors-anywhere.herokuapp.com/ */
// /* https://nyang-in.tistory.com/272 */
// /* https://cors.bridged.cc/ */
// const cors_url = 'https://proxy.cors.sh/'

interface QuizType {
  id: number;
  question: string;
  description: undefined | null;
  category: string;
  answers: {
    answer_a: string;
    answer_b: string;
    answer_c: string;
    answer_d: string;
    answer_e?: string;
    answer_f?: string;
  };
  multiple_correct_answers: string;
  difficulty: string;
  }

  export default defineComponent({
    name: 'HomeView',
    setup() {
      const store = useStore()

      store.state.count
    },
    data() {
      return {
        selectCate: 'Code',
        selectDiffculty: 'Easy',
        selectRandom: 0,
        selectCount: 10,
        userName: '',
        selectQuizList: [],
        quizsList: [] as QuizType[]
      }
    },
    computed: {
      // 문제유형 배열
      // 빈 값이 있어서 filter 한번 걸치고 map 문 적용
      cateLists() : string[]{
        return [...new Set(this.quizsList.filter((quiz : QuizType) => quiz && quiz.category).map((quiz : QuizType) => quiz.category))];
      },
      // 문제유형별 개수 객체
      cateCount(): { [key: string] : number }  {
        /* Indexable 타입 관련 문제 https://velog.io/@shin6403/Typescript-JS%EB%8A%94-%EC%A0%95%EB%A7%90-%EC%A2%8B%EC%9D%80-%EC%95%84%EC%9D%B4%EC%98%80%EA%B5%AC%EB%82%98feat.-Indexable */
        type IndexableList = string[]

        const cates: IndexableList = Array.from(this.quizsList, (quiz) => (quiz.category))
        return cates.reduce((acc, cate) => {
          acc[cate] = (acc[cate] || 0) + 1
          return acc
        }, {})
      },
      // 문제난이도 배열
      difficultyList() :string[] {
        return [...new Set(this.quizsList.filter((quiz: QuizType) => quiz && quiz.difficulty).map((quiz: QuizType) => quiz.difficulty))]
      },
      // 필터로 사용
      filter(): { [key: string]: string | number } {
        return {
          category : this.selectCate,
          difficulty: this.selectDiffculty,
        }
      },
      // 선택한 문제들
      limitQuizs(): QuizType[] {
        // 같은 문항 제거
        const uniqueQuizs = [...new Map(this.quizsList.map((quiz)=>[quiz.id, quiz])).values()]
        // 사용자가 선택한 필터 적용
        return uniqueQuizs.filter((quiz)=>{
          for (var key in this.filter) {
            if (quiz[key] === undefined || quiz[key] != this.filter[key])
              return false;
          }
          return true;
        })
      },
      // 선택 가능 최대 문항 수
      limitCount(): number {
        return this.limitQuizs.length
      },
      test(): QuizType[] {
        const sort = this.quizsList.slice().sort((quizA, quizB) => quizA.id - quizB.id)
        return [... new Map(sort.map((m) => [m.id, m])).values()]

      }
    },
    methods: {
      NameChk(){
        if (!this.userName) {
          /* document querSelector 말고 ref로 활용하는방법도 시도해보기 */
          const errorEl = document.querySelector('.error')

          errorEl?.classList.remove('invisible', 'opacity-0', 'top-[48%]')
          errorEl?.classList.add('top-1/2', 'opacity-1')
          setTimeout(() => {
            errorEl?.classList.remove('top-1/2', 'opacity-1')
            errorEl?.classList.add('invisible', 'opacity-0', 'top-[48%]')
          }, 2500)
        } else {
          this.QuizStart();
        }
      },
      QuizStart() {
        this.$store.state.limitQuizs = this.limitQuizs

        const route: RouteLocationRaw = {
          name: "TestView",
          query: {
            selectRandom: this.selectRandom,
            userName: this.userName,
            selectDiffculty: this.selectDiffculty,
            selectCate: this.selectCate,
            limitCount: this.limitCount,
            selectCount: this.selectCount
          },
          replace: false // true 이전페이지 지우기(뒤로가기 비활성화)
        }
        this.$router.push(route)
      }
    },
    created(){
      // 임시용
      this.quizsList = tempoList.quizlists as QuizType[];
      // //   /* https://bobbyhadz.com/blog/typescript-http-request-axios */

      // async function getQuizLists() :Promise<string | object> {
      //   try {
      //   const { data, status } = await axios.get<QuizType[]>(
      //     `${cors_url}${base_url}/?apiKey=${appkey}`,
      //     {
      //       headers: {
      //         Accept: 'application/json',
      //         'x-cors-api-key': 'temp_2425c259f56599af91548f4d77b54a8b'
      //       },
      //     },
      //   );
      //   console.log(data)
      //   // 👇️ "response status is: 200"
      //   console.log('response status is: ', status);

      //   return data;
      // } catch (error) {
      //   if (axios.isAxiosError(error)) {
      //     console.log('error message: ', error.message);
      //     return error.message;
      //   } else {
      //     console.log('unexpected error: ', error);
      //     return 'An unexpected error occurred';
      //   }
      // }
      // }


      // // string | QuizType[] string 인 경우 때문에 아래코드가 안되는데 어떻게 해야하나...
      // // console.log(typeof getQuizLists())
      // // if(typeof getQuizLists() === "object"){
      //   // console.log(true)
      //   this.quizsList = getQuizLists()
      // // }

    }
  })



//   /* &limit=20&category=${categoryList[7]}&difficulty=easy&tags=Linux */

</script>
