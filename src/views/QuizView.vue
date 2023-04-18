<template>
  <div v-if="current < dataList.QuizList.length">
    계속진행중 {{ current+1 }}번 문제
    {{ dataList.QuizList[current] }}
    <p>{{ dataList.QuizList[current].question }}</p>
    <ul>
      <li v-for="(quiz, key, index) in dataList.QuizList[current].view" :key="key">
        {{index+1}} {{ quiz }}
      </li>
    </ul>
    <button @click="[current++]">버튼</button>
  </div>
  <div v-else>끝</div>
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
    }
  },
})
</script>

<style scoped>

</style>