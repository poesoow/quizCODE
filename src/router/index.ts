import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import QuizView from '../views/QuizView.vue'
import QuizapiView from '../views/QuizapiView.vue'
import TestView from '../views/TestView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/quiz',
    name: 'QuizView',
    component: QuizView,
    props: route => ({
      userName: route.query.userName,
      selectRandom: route.query.selectRandom,
      selectType: route.query.selectType,
      selectCount: route.query.selectCount
    })
  },
  {
    path: '/quizapi',
    name: 'QuizapiView',
    component: QuizapiView
  },
  {
    path: '/test',
    name: 'TestView',
    component: TestView,
    props: route => ({
      userName: route.query.userName,
      selectDiffculty: route.query.selectDiffculty,
      selectCate: route.query.selectCate,
      selectLimit: route.query.selectLimit
    })
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
