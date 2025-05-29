import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from '../views/LandingPage.vue';
import Login from '../components/Login.vue';
import MaterialsList from '../views/MaterialList.vue';
import AddMaterial from '../views/AddMaterial.vue';

const routes = [
  {
    path: '/',
    name: 'LandingPage',
    component: LandingPage
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/materials',
    name: 'MaterialsList',
    component: MaterialsList
  },
  {
    path: '/materials/add',
    name: 'AddMaterial',
    component: AddMaterial
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
