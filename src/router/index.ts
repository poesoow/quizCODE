import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import QuizView from '../views/QuizView.vue'
import QuizapiView from '../views/QuizapiView.vue'
import TestView from '../views/TestView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/training',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/trainingquiz',
    name: 'QuizView',
    component: QuizView,
    props: route => ({
      userName: route.query.userName,
      selectRandom: route.query.selectRandom,
      selectCate: route.query.selectCate,
      selectCount: route.query.selectCount,
    })
  },
  // 스스로
  {
    path: '/',
    name: 'QuizapiView',
    component: QuizapiView,
  },
  {
    path: '/test',
    name: 'TestView',
    component: TestView,
    props: route => ({
      userName: route.query.userName,
      selectDiffculty: route.query.selectDiffculty,
      selectCate: route.query.selectCate,
      selectLimit: route.query.selectLimit,
      selectQuizs: route.query.selectQuizs
    })
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
