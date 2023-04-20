<template>
  <div class="w-full flex justify-center items-center h-full">
    <div class="mx-auto w-10/12 lg:w-6/12 flex flex-wrap items-center">
      <div class="w-full bg-white rounded-lg p-5 flex gap-x-5 flex-wrap justify-center">
        <input @input="koreanchk" v-model="userName" type="text" class="border pl-4 py-2 rounded-md shadow-md outline-none basis-full sm:basis-5/12">
        <button @click="NameChk" class="btn-primary text-sm sm:text-base bg-blue-500 hover:bg-blue-700 focus:ring-blue-400 sm:py-0 basis-full sm:basis-3/12 mt-5 sm:mt-0">시작하기</button>
        <div v-if="userName.length > 2" class=" mt-4 text-xs sm:text-sm font-bold">{{ userName }}님 반갑습니다. 총 {{ dataList.QuizList.length }}개의 문제가 준비되어있습니다.</div>
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

export default defineComponent({
  name: 'HomeView',
  data() {
    return {
      errorMsg: '(test)이름을 입력해주세요',
      userName: '',
      dataList: QuizList,
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
          query: {userName: this.userName}, // 홈뷰에서 이름 쓴걸로 라우터로 넘기기 위해
          replace: false // true 이전페이지 지우기(뒤로가기 비활성화)
        }
         this.$router.push(route)
      }
    }
  }
})
</script>
