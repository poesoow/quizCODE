import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import TrainingView from '../views/TraningView.vue'
import trainingQuizView from '../views/TrainingquizView.vue'
import HomeView from '../views/HomeView.vue'
import TestView from '../views/TestView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/training',
    name: 'TrainingView',
    component: TrainingView,
  },
  {
    path: '/trainingquiz',
    name: 'TrainingquizView',
    component: trainingQuizView,
    props: route => ({
      userName: route.query.userName,
      selectRandom: route.query.selectRandom,
      selectCate: route.query.selectCate,
      selectCount: route.query.selectCount,
    })
  },
  {
    path: '/',
    name: 'HomeView',
    component: HomeView,
  },
  {
    path: '/test',
    name: 'TestView',
    component: TestView,
    props: route => ({
      selectRandom: route.query.selectRandom,
      userName: route.query.userName,
      selectDiffculty: route.query.selectDiffculty,
      selectCate: route.query.selectCate,
      limitCount: route.query.limitCount,
      selectCount: route.query.selectCount,
    })
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
