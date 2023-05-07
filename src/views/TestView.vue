<template>
  <div class="w-full flex items-center justify-center flex-wrap h-full">
    <div class="mx-auto w-10/12 lg:w-7/12 flex items-center flex-wrap relative">
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
        <div>{{ current + 1 }}번 문제</div>
        <p class="text-base sm:text-xl">{{ selectQuizs[current].question }}</p>
        <ul
          class="mt-5 flex flex-wrap justify-between" >
          <li
          v-for="(answer, key, index) in selectQuizs[current].answers" :key="key"
          @click="selectValue(answer as string, key, current)"
          class="cursor-pointer font-bold basis-full lg:basis-[49%] rounded-lg mb-3 border p-3 text-sm hover:border-blue-500 hover:text-blue-500 duration-500">
          <template v-if="answer">
              <span>보기{{ index + 1 }}</span>
              <span class="break-all text-center pl-2">{{ answer }}</span>
            </template>
            </li>
        </ul>
        <!--
          선택을 나중에 다시 할 수 있도록 하려면????
          <button @click="current--">다음문제</button>
          <button @click="current++">다음문제</button>
        -->
      </div>
      <!-- 결과 영역 -->
      <div v-else class="w-full ">
        <div class="mx-auto flex items-center flex-wrap">
          <div class="text-xl">
            <p>정답개수 : {{ correctCount() }}개 {{ resultScore() }}점</p>
            <button
              @click="OpenAnswernote"
              v-if="isAnswerNote === false && Number(resultScore()) !== 100"
              class="text-base">틀린문항 확인하기</button>
          </div>
          <div
            v-if="isAnswerNote === true"
            class="bg-white rounded-lg my-10 p-10 basis-full question">
            <div>{{ answerCurrent + 1 }}번 문제</div>
            <p class="text-base sm:text-xl">{{ answerNote()[answerCurrent].question }}</p>
            <ul
              class="mt-5 flex flex-wrap justify-between" >
              <li
              v-for="(answer, key, index) in answerNote()[answerCurrent].answers" :key="key"
              class="font-bold basis-full lg:basis-[49%] rounded-lg mb-3 border p-3 text-sm duration-500">
              <template v-if="answer">
                <span>보기{{ index + 1 }}</span>

                <template v-for="(correctAnswer, key2, index2) in answerNote()[answerCurrent]['correct_answers']" :key="key2">
                  <span
                    v-if="index == index2"
                    :class="[correctAnswer == 'true' && 'text-red-500 ', answerNote()[answerCurrent].selectValue == answer && 'text-indigo-500'] "
                    class="break-all text-center px-2">
                    {{ answer }}
                    </span>
                </template>

              </template>
                </li>
            </ul>
            <button v-if="answerCurrent < answerNote().length - 1" @click="answerCurrent++">다음문제 확인</button>
          </div>
        </div>
      </div>
      <!-- 문제 다시 풀기 -->
      <button @click="restart()" class="btn-primary absolute right-1 bottom-1 text-sm sm:text-base bg-blue-500 hover:bg-blue-700 focus:ring-blue-400 sm:py-0 mt-5 sm:mt-0">다시 풀기</button>
    </div>
  </div>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import JSConfetti from 'js-confetti'

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
  result?: string | boolean;
  no?: number;
}

export default defineComponent({
  name: 'TestView',
  data() {
    return {
      userName: this.$route.query.userName,
      selectRandom: this.$route.query.selectRandom,
      selectDiffculty: this.$route.query.selectDiffculty,
      selectCate: this.$route.query.selectCate,
      limitCount: this.$route.query.limitCount,
      selectCount: this.$route.query.selectCount,
      limitQuizs: this.$store.state.limitQuizs,
      current: 0,
      userSelects: [] as string[],
      isAnswerNote: false,
      answerCurrent: 0,
    }
  },
  computed: {
    progress(): number {
      return Math.floor((this.current / Number(this.selectCount)) * 100)
    },
    // 퀴즈 문제 랜덤 및 선택한 개수만큼 선택
    selectQuizs(): QuizType[] {
      if(this.selectRandom == "1"){
        return this.limitQuizs.slice().sort(() => Math.random() - 0.5).slice(0, Number(this.selectCount))
      } else {
        return this.limitQuizs.slice().sort().slice(0, Number(this.selectCount))
      }
    },
    // 사용자 선택항목을 넣기
    resultQuiz(): UserResult[] {
      let i = 0
      return Array.from(this.selectQuizs, (quiz) => ({
        ...quiz,
        selectValue: '',
        result: '',
        no: ++i,
      }))
    },
  },
  methods: {
    selectValue(value :string, key: string , index: number) :void {
      const correctAnswers = this.resultQuiz[index]['correct_answers']
      // console.log(correctAnswers)
      this.resultQuiz[index].selectValue = value
      this.resultQuiz[index].result = correctAnswers[`${key}_correct`]
      // 굳이 안넣어도 되긴하는데...
      this.userSelects.push(value)
      // 다음문제를 위해서
      this.current++;
      // 100점인경우에만
      if (Number(this.resultScore()) == 100) {
        const jsConfetti = new JSConfetti()
        jsConfetti.addConfetti()
      }
    },
    // 정답 개수
    correctCount(): number {
      return this.resultQuiz.filter((quiz) => quiz.result === "true").length
    },
    // 결과 점수 백점 만점
    resultScore(): number {
      const count = this.correctCount()
      const total = this.resultQuiz.length
      return Math.floor((count / total) * 100)
    },
    OpenAnswernote() {
      this.isAnswerNote = true
    },
    // 사용자 틀린 문제
    answerNote(): UserResult[] {
      return this.resultQuiz.filter((quiz) => {
        return quiz.result == "false"
      })
    },
    restart() {
      this.resultQuiz.forEach((requiz)=>{
        requiz.result = ''
        requiz.selectValue= ''
        return requiz
      })
      this.isAnswerNote = false

      this.current = 0
    }
  },
})
</script>

<style scoped>
  .question ul li:empty{
    display: none;
  }
</style>