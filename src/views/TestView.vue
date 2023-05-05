<template>
  <div class="w-full flex items-center justify-center flex-wrap h-full">
    <div class="mx-auto w-10/12 lg:w-7/12 flex items-center flex-wrap">
      <button @click="current = 1">다시 시작</button>
      {{ current }} / {{ selectCount }}
      <!-- 문제진행률(프로그레스 바) -->
      <div class="h-5 bg-gray-300 basis-full relative rounded-lg">
        <!-- 문제 진행 시 0/4 로 표현 문제종료시 숨기기 -->
        <p
          v-if="current < Number(selectCount)"
          class="absolute right-2 -top-5 text-xs">
          {{ current }} / {{ selectCount }}
        </p>
        <p v-else class="absolute right-2 -top-5 text-xs">종료</p>
        <p class="absolute right-2 top-0.5 text-xs">{{ progress }}%</p>
        <!-- :style="{width: progress + '%'}" 이렇게 적을수도 있음 -->
        <div class="h-5 rounded-lg bg-blue-300 transition-all duration-500"
        :style="`width: ${progress}%`"></div>
      </div>
      <h3 class="font-bold basis-full text-center text-indigo-500 text-xl sm:text-2xl lg:text-3xl mt-10 bg-white rounded-lg p-5">
        {{ userName || '방문자' }}
        <span class="text-black">님
          {{ current < Number(selectCount) ? '반갑습니다.' : '고생하셨습니다.'}}
        </span>
      </h3>
      <!-- 문제영역 -->
      <div
        v-if="current < Number(selectCount)"
        class="bg-white rounded-lg my-10 p-10 basis-full question">
        <div>{{ current }}번 문제</div>
        <p class="text-base sm:text-xl">{{ selectQuizs[current].question }}</p>
        <ul
          class="mt-5 flex flex-wrap justify-between" >
          <li
          v-for="(answer, key, index) in selectQuizs[current].answers" :key="key"
          @click="current++; selectValue(answer as string)"
          class="cursor-pointer font-bold basis-full lg:basis-[49%] rounded-lg mb-3 border p-3 text-sm hover:border-blue-500 hover:text-blue-500 duration-500">
          <template v-if="answer">
              <span>보기 {{ index + 1 }}</span>
              <span class="break-all text-center pl-2">{{ answer }}</span>
            </template>
            </li>
        </ul>
      </div>
      {{ userSelects }}
      <br>
      {{ resultQuiz }}
      <button @click="current++">다음문제</button>
    </div>
  </div>

</template>

<script lang="ts">
import { defineComponent } from 'vue'

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

interface UserResult extends QuizType {
  selectValue?: string;
  result?: boolean;
}

export default defineComponent({
  name: 'TestView',
  data() {
    return {
      userName: this.$route.query.userName,
      selectDiffculty: this.$route.query.selectDiffculty,
      selectCate: this.$route.query.selectCate,
      limitCount: this.$route.query.limitCount,
      selectCount: this.$route.query.selectCount,
      limitQuizs: this.$store.state.limitQuizs,
      current: 1,
      userSelects: [] as string[]
    }
  },
  computed: {
    progress(): number {
      return Math.floor((this.current / Number(this.selectCount)) * 100)
    },
    // 퀴즈 문제 랜덤 및 선택한 개수만큼 선택
    selectQuizs(): QuizType[] {
      return this.limitQuizs
    },
    resultScore() :number {
      return Math.floor(1)
    },
    resultQuiz(): UserResult[] {
      return this.selectQuizs.slice()
    }
  },
  methods: {
    // selectValue(e :undefined):boolean{ return false},
    selectValue(value :string){
      this.userSelects.push(value)
    }
  },
  created() {
    console.log(1)


  },
})
</script>

<style scoped>
  .question ul li:empty{
    display: none;
  }
</style>