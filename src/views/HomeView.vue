<template>
  <div class="w-full flex justify-center items-center h-full">
    <div class="mx-auto w-10/12 lg:w-6/12 flex flex-wrap items-center">
      <form @submit.prevent>
        <div class="w-full bg-white rounded-lg p-5 flex gap-x-5 flex-wrap justify-center">
          <input @keyup.enter="NameChk" @input="koreanchk" v-model="userName" type="text" class="border pl-4 py-2 rounded-md shadow-md outline-none basis-full sm:basis-5/12">
          <button @click="NameChk" class="btn-primary text-sm sm:text-base bg-blue-500 hover:bg-blue-700 focus:ring-blue-400 sm:py-0 basis-full sm:basis-3/12 mt-5 sm:mt-0">시작하기</button>
          <div class=" mt-4 text-xs sm:text-sm font-bold"><span v-if="userName != ''" class="block mb-2">{{ userName }}님 반갑습니다.</span> 문제 유형은 {{ selectRandom === '0' ? '기본값' : '랜덤' }}이고, {{ selectType }}카테고리를 선택하였으며, 총 {{ dataList.length }}개의 문제 중 {{ selectCount }}문제를 선택하였습니다.</div>
        </div>
      </form>
      <div class="w-full bg-white rounded-lg p-5 mt-5 flex justify-between items-center flex-wrap">
        <div class="flex justify-around flex-wrap items-center basis-full xl:basis-4/12">
          <p class="btn-primary sm:text-sm text-xs bg-green-500 hover:bg-green-700 focus:ring-green-400 basis-5/12 text-center">랜덤설정</p>
          <select v-model="selectRandom" class="border rounded basis-6/12 py-1 text-center">
            <option value="0">기본</option>
            <option value="1">랜덤</option>
          </select>
        </div>
        <div class="flex justify-around flex-wrap items-center basis-full xl:basis-4/12 my-5 xl:my-0">
          <p class="btn-primary sm:text-sm text-xs bg-green-500 hover:bg-green-700 focus:ring-green-400 basis-5/12 text-center">문제유형</p>
          <select v-model="selectType" class="border rounded basis-6/12 py-1 text-center">
            <option value="전체">전체 ({{ dataList.length }}문제)</option>
            <option v-for="(e, index) in uniqueTypes" :key="e" :value="e"> {{ e }} ({{ cateCount[index] }}문제)</option>
          </select>
        </div>
        <div class="flex justify-around flex-wrap items-center basis-full xl:basis-4/12">
          <p class="btn-primary sm:text-sm text-xs bg-green-500 hover:bg-green-700 focus:ring-green-400 basis-5/12 text-center">개수설정</p>
          <select v-model="selectCount" class="border rounded basis-6/12 py-1 text-center">
            <option v-for="e in cateList.length" :key="e" :value="cateList.length">{{ e }}문제</option>
          </select>
        </div>
      </div>
      <div class="error fixed bg-white left-1/2 top-[48%] -translate-x-1/2 -translate-y-1/2 z-50 border rounded-lg duration-700 transition-all w-3/4 sm:w-2/4 lg:w-1/6  opacity-0 invisible">
        <h3 class="bg-gray-100 p-2 pl-4">경고창</h3>
        <p class="p-4 py-6">{{ errorMsg }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'; // 타입스크립트에서 꼭 필요한 부분
import QuizList from '@/assets/quizlist.json'; // typescript 에서는 json 파일 사용하기 위해 tsconfig.json 파일에 "resolveJsonModule": true 추가 필요
import { RouteLocationRaw } from 'vue-router';

interface Quiz {
  id: number,
  question: string,
  answer: string,
  view: {
    number1: string,
    number2: string,
    number3: string,
    number4: string
  },
  type:  string,
  hint: string
}

export default defineComponent({
  name: 'HomeView',
  data() {
    return {
      errorMsg: '(test)이름을 입력해주세요',
      userName: '',
      dataList: [] as Quiz[],
      selectRandom: '0',
      selectType: '전체',
      selectCount: 1,
    }
  },
  components: {
  },
  methods: {
    koreanchk() {
      const regex = /^[가-힣]*$/
      if(!regex.test(this.userName)) {
        this.userName = this.userName.replace(/[^가-힣]*/, '')
      }
    },
    /*  :string | undefined */
    NameChk() {
      if(!this.userName){
        const errorEl = document.querySelector('.error')

        errorEl?.classList.remove('invisible', 'opacity-0', 'top-[48%]')
        errorEl?.classList.add('top-1/2', 'opacity-1')
        setTimeout(() => {
          errorEl?.classList.remove('top-1/2', 'opacity-1')
          errorEl?.classList.add('invisible', 'opacity-0', 'top-[48%]')
        }, 2500)
      }else{
        const route : RouteLocationRaw = {
          name : "QuizView",
          query: {
            userName: this.userName,  // 홈뷰에서 이름 쓴걸로 라우터로 넘기기 위해
            selectRandom: this.selectRandom, // 랜덤인지 아닌지
            selectType: this.selectType, // 타입
            selectCount: this.selectCount // 문항 수
          }, 
          replace: false // true 이전페이지 지우기(뒤로가기 비활성화)
        }
         this.$router.push(route)
      }
    }
  },
  computed: {
    // 특정 속성을 추출해서 새로운 배열을 만들기 위해 Set 객체를 사용
    // 중복된 값을 허용하지 않는 데이터 집합 > 새로운 배열로 반환
    // 원하는 배열에서 중복된 갑을 제거하고 유일한 값을 새로운 배열로 생성
    uniqueTypes() :string[] {
      return [...new Set(this.dataList.map((e)=>e.type))]
    },
    cateCount() :number[] {
      return this.uniqueTypes.map((e)=>{
        return this.dataList.filter((item)=>{
          return e === item.type
        }).length
      })
    },
    cateList() :Quiz[] {
      return this.dataList.filter((e)=>{
        if(this.selectType !== '전체'){
          return e.type === this.selectType
        }else {
          return e.type
        }
      })
    }
  },
  created(){
    this.dataList = QuizList.QuizList as Quiz[]
  },
  mounted(){
    document.querySelector('input')?.focus()
  }
})
</script>
