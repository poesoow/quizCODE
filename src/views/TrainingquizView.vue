<template>
  <div class="w-full flex items-center justify-center flex-wrap h-full">
    <div class="mx-auto w-10/12 lg:w-7/12 flex items-center flex-wrap">
      <!-- 문제진행률(프로그레스 바) -->
      <div class="h-5 bg-gray-300 basis-full relative rounded-lg">
        <!-- 문제 진행 시 0/4 로 표현 문제종료시 숨기기 -->
        <p v-if="current != Number(selectCount)" class="absolute right-2 -top-5 text-xs">{{ current + 1 }} / {{ selectCount }}</p>
        <p v-else class="absolute right-2 -top-5 text-xs">종료</p>
        <p class="absolute right-2 top-0.5 text-xs">{{ progress }}%</p>
        <!-- :style="{width: progress + '%'}" 이렇게 적을수도 있음 -->
        <div class="h-5 rounded-lg bg-blue-300 transition-all duration-500" :style="`width: ${progress}%`"></div>
      </div>
      <h3 class="font-bold basis-full text-center text-indigo-500 text-xl sm:text-2xl lg:text-3xl mt-10 bg-white rounded-lg p-5">{{ userName }}<span class="text-black">님 {{ current < Number(selectCount) ? '반갑습니다.' : '고생하셨습니다.'}}</span></h3>
      <!-- 문제영역 -->
      <div
        v-if="current < Number(selectCount)"
        class="bg-white rounded-lg my-10 p-10 basis-full">
        <div>{{ current + 1 }}번 문제</div>
        <p class="text-base sm:text-xl">{{ selectQuestion[current].question }}</p>
        <ul class="mt-5 flex flex-wrap justify-between">
          <li
            @click="current++; SelectValue(e); isHintUse = false"
            v-for="(e, index) in randomView[current]" :key="index"
            class="cursor-pointer font-bold basis-full lg:basis-[49%] rounded-lg mb-3 border p-3 text-sm hover:border-blue-500 hover:text-blue-500 duration-500">
            <span>보기{{ index + 1 }}: </span>
            <span class="break-all text-center">{{ e[1] }}</span>
          </li>
        </ul>
        <div class="flex justify-between items-center flex-wrap">
          <button
            @click="useHint()"
            class="btn-primary bg-green-400 hover:bg-green-600 basis-4/12 sm:basis-2/12 text-sm">힌트 : {{ hintCount }}</button>
          <p v-if="isHintUse">{{ selectQuestion[current].hint }}</p>
          <p v-else-if="hintCount < 1">힌트를 모두 소진 하였습니다.</p>
          <router-link to="/" class="btn-primary bg-green-400 hover:bg-green-600 basis-4/12 sm:basis-2/12 text-center text-sm">처음으로</router-link>
        </div>
      <!-- 다음문제 이전문제 구현해보기
      <button @click="[current++]">다음문제</button> -->
      </div>
      <div v-else>{{ hitNumber() }}개 맞음 {{ resultScore }}점
        <router-link to="/" class="btn-primary bg-green-400 hover:bg-green-600 basis-4/12 sm:basis-2/12 text-center text-sm">처음으로</router-link>
      </div>
    </div>
  </div>


</template>

<script lang="ts">
import { defineComponent } from 'vue'
import QuizList from '@/assets/quizlist.json';

interface QuizType {
  id: number,
  question: string,
  answer: string,
  view: {
    number1: string,
    number2: string,
    number3: string,
    number4: string,
  }
  type: string,
  hint: string
}

export default defineComponent({
  name: 'trainingQuizView',
  data() {
    return {
      dataList: QuizList,
      current: 0,
      userSelect: [] as string[],
      /* Type Assertion 변수명 as 변경할 타입
      as 키워드는 유니온 타입 같은 복잡한 타입을 하나의 정확한 타입으로 줄일 때 사용
      단, 하나의 타입 일 때 사용시 에러 발생
      as 타입은 타입실드 임시해제용
      1. 왜 타입 에러가 나는지 모를때 임시로 해결하기위해 사용하거나
      2. 내가 어떤 타입의 데이터가 들어올지 확실히 알고 있을 때 에러를 방지 하기 위해 사용
      */
      hintCount : 3,
      isHintUse: false,
      userName: this.$route.query.userName, // router 로 받은 유저이름
      selectRandom: this.$route.query.selectRandom,
      selectType: this.$route.query.selectType,
      selectCount: this.$route.query.selectCount,
      MaxCount: 0
    }
  },
  computed: {
    progress() :number {
      return Math.floor((this.current / Number(this.selectCount)) * 100)
      // floor - 소수점 나머지를 내림
      // ceil - 올림
      // round - 반올림
    },
    resultScore() :number {
      return Math.floor((this.hitNumber() / Number(this.selectCount)) * 100)
    },
    // 보기 랜덤하게
    // map 문으로 퀴즈별로 함수가 돌아감
    // 퀴즈항목이 객체타입이라서 entries로 배열타입으로 변경시켜줌
    // 배열 매세드인 sort를 이용하여 정렬하는데 Math.random 메서드를 사용하여 랜덤하게 정렬시킴.
    randomView(): Array<Array<string[]>> {
      return this.selectQuestion.map((e, index)=>{
        return Object.entries(this.selectQuestion[index].view).sort(()=> Math.random() - 0.5)
      })
    },
    selectQuestion() :QuizType[] {
      return this.dataList.QuizList.filter((e) => {
        if (this.selectType !== '전체') {
          return e.type === this.selectType
        } else {
          return e.type
        }
      })
    }
  },
  methods: {
    SelectValue(e : string[]) {
      // console.log(e)
      // this.userSelect.push(e as string) // as 의 역할이 뭐지????
      this.userSelect.push(e[1])
      // console.log(this.userSelect)
    },
    useHint() :void {
      if(this.isHintUse){return} // 힌트를 클릭하여 true 상태이면 함수 실행 안되도록 함
      if(this.hintCount < 1){return} // 누적힌트수가 1보다 작아지면 함수 실행 안되도록 함
      this.hintCount--
      // this.hintUse = this.hintUse === false ? true : false
      this.isHintUse = true
    },
    hitNumber() :number {
      return this.selectQuestion.filter((e, index)=>{
        return e.answer === this.userSelect[index]
      }).length
    },
    questionCount() {
      this.MaxCount = this.selectQuestion.filter((e) => {
        if (this.selectType !== '전체') {
          return e.type === this.selectType
        } else {
          return e.type
        }
      }).length
    }
  },
  created(){
    if (Number(this.selectRandom) != 0) {
      this.selectRandom = '1'
    }
    // 퀴즈 문제 랜덤
    if(this.selectRandom === "1"){
      this.dataList.QuizList.sort(()=>Math.random() - 0.5)
    }
    this.questionCount()
    // 문항 수 임의로 늘릴수 없도록
    if(Number(this.selectCount) > this.MaxCount) {
      this.selectCount = this.MaxCount.toString();
    }

  }
})
</script>

<style scoped>

</style>