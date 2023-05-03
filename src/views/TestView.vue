<template>
  <div class="w-full flex items-center justify-center flex-wrap h-full">
    {{ selectQuizs }}
    <div class="mx-auto w-10/12 lg:w-7/12 flex items-center flex-wrap">
      <!-- 문제진행률(프로그레스 바) -->
      <div class="h-5 bg-gray-300 basis-full relative rounded-lg">
        <!-- 문제 진행 시 0/4 로 표현 문제종료시 숨기기 -->
        <p v-if="true" class="absolute right-2 -top-5 text-xs">{{ 1 + 1 }} / {{ 1 }}</p>
        <p v-else class="absolute right-2 -top-5 text-xs">종료</p>
        <p class="absolute right-2 top-0.5 text-xs">{{ 10 }}%</p>
        <!-- :style="{width: progress + '%'}" 이렇게 적을수도 있음 -->
        <div class="h-5 rounded-lg bg-blue-300 transition-all duration-500" :style="`width: 10%`"></div>
      </div>
      <h3 class="font-bold basis-full text-center text-indigo-500 text-xl sm:text-2xl lg:text-3xl mt-10 bg-white rounded-lg p-5">{{ '이름' }}<span class="text-black">님 {{ true ? '반갑습니다.' : '고생하셨습니다.'}}</span></h3>
      <!-- 문제영역 -->
      <div 
        v-if="true"
        class="bg-white rounded-lg my-10 p-10 basis-full">
        <div>{{ 1 }}번 문제</div>
        <p class="text-base sm:text-xl">{{ 1 }}</p>
        <ul class="mt-5 flex flex-wrap justify-between">
          <li 
            class="cursor-pointer font-bold basis-full lg:basis-[49%] rounded-lg mb-3 border p-3 text-sm hover:border-blue-500 hover:text-blue-500 duration-500">
            <span>보기{{ 1 }}: </span>
            <span class="break-all text-center">{{ 1 }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>

</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TestView',
  data() {
    return {
      userName: this.$route.query.userName,
      selectDiffculty: this.$route.query.selectDiffculty,
      selectCate: this.$route.query.selectCate,
      selectLimit: this.$route.query.selectLimit,
      selectQuizs: this.$route.query.selectQuizs
    }
  },
})
</script>