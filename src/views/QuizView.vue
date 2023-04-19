<template>
  <div class="w-full flex items-center justify-center flex-wrap h-full">
    <div class="mx-auto w-10/12 lg:w-7/12 flex items-center flex-wrap">
      <!-- 문제진행률(프로그레스 바) -->
      <div class="h-5 bg-gray-300 basis-full relative rounded-lg">
        <!-- 문제 진행 시 0/4 로 표현 문제종료시 숨기기 -->
        <p v-if="current != dataList.QuizList.length" class="absolute right-2 -top-5 text-xs">{{ current + 1 }} / {{ dataList.QuizList.length }}</p>
        <p v-else class="absolute right-2 -top-5 text-xs">종료</p>
        <p class="absolute right-2 top-0.5 text-xs">{{ progress }}%</p>
        <!-- :style="{width: progress + '%'}" 이렇게 적을수도 있음 -->
        <div class="h-5 rounded-lg bg-blue-300 transition-all duration-500" :style="`width: ${progress}%`"></div>
      </div>
      <!-- 문제영역 -->
      <div 
        v-if="current < dataList.QuizList.length"
        class="bg-white rounded-lg my-10 p-10 basis-full">
        <div>{{ current + 1 }}번 문제</div>
        <p class="text-base sm:text-xl">{{ dataList.QuizList[current].question }}</p>
        <ul class="mt-5 flex flex-wrap justify-between">
          <li 
            @click="current++; SelectValue(quiz)"
            v-for="(quiz, key, index) in dataList.QuizList[current].view" :key="key"
            class="cursor-pointer font-bold basis-full lg:basis-[49%] rounded-lg mb-3 border p-3 text-sm hover:border-blue-500 hover:text-blue-500 duration-500">
            <span>보기{{ index + 1 }}: </span>
            <span class="break-all text-center">{{ quiz }}</span>
          </li>
        </ul>
        <div class="flex justify-between items-center flex-wrap">
          <button 
            @click="hintcount--; hintshow()"
            class="btn-primary bg-green-400 hover:bg-green-600 basis-4/12 sm:basis-2/12">힌트 : {{ hintcount }}</button>
          <p v-if="ishint">{{ dataList.QuizList[current].hint }}</p>
          {{ ishint }}
        </div>
      <!-- 다음문제 이전문제 구현해보기
      <button @click="[current++]">다음문제</button> -->
      </div>
      <div v-else>끝</div>
    </div>
  </div>


</template>

<script lang="ts">
import { defineComponent } from 'vue'
import QuizList from '@/assets/quizlist.json';

export default defineComponent({
  name: 'QuizView',
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
      hintcount: 2,
      ishint: false,
    }
  },
  computed: {
    progress() :number {
      return Math.floor((this.current / this.dataList.QuizList.length) * 100)
      // floor - 소수점 나머지를 내림
      // ceil - 올림
      // round - 반올림
    }
  },
  methods: {
    SelectValue(e : string) {
      // console.log(e)
      // this.userSelect.push(e as string) // as 의 역할이 뭐지????
      this.userSelect.push(e)
      console.log(this.userSelect)
    },
    hintshow() {
      if(!this.ishint) { // false 인 경우에만 동작하도록 해서 다시 여러번 클릭 하더라도 사라지지 않음
        return this.ishint = !this.ishint
      }
    }
  }
})
</script>

<style scoped>

</style>