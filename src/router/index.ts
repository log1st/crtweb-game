import { createRouter, createWebHashHistory } from 'vue-router';

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/results',
      name: 'results',
      component: () => import(/* webpackChunkName: 'results' */ '@/pages/results/index.vue'),
    },
    {
      path: '/',
      name: 'game',
      component: () => import(/* webpackChunkName: 'results' */ '@/pages/game/index.vue'),
    },
  ],
});
