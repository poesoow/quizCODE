<template>
  <router-view/>
  <QuizapiView />
</template>

<script lang="ts">
import QuizapiView from '@/views/QuizapiView.vue'

export default{
  components: {
    QuizapiView
  }
}
</script>