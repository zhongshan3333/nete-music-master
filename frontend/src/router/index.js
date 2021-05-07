import Vue from 'vue';
import VueRouter from 'vue-router';
import Layout from '../views/layout';
import Discovery from '../views/music/discovery';

Vue.use(VueRouter);

const routes = [
  {
    path: '/mv-detail/:id',
    name: 'MVDetail',
    component: () => import('@/views/video/mv-detail.vue'),
    props: true,
  },
  {
    path: '/video-detail/:id',
    name: 'VideoDetail',
    component: () => import('@/views/video/video-detail.vue'),
    props: true,
  },
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    children: [
      {
        path: '/discovery',
        name: 'discovery',
        component: Discovery,
      },
      {
        path: '/radio',
        name: 'radio',
        component: () => import('@/views/PlayList.vue'),
      },
      {
        path: '/video',
        name: 'video',
        component: () => import('@/views/video'),
      },
      {
        path: '/playlist',
        name: 'playlist',
        component: () => import('@/views/PlayList.vue'),
        props: true,
      },
      {
        path: '',
        redirect: { name: 'discovery' },
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
