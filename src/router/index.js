import { createRouter, createWebHistory } from 'vue-router';
import MaterialsList from '../views/MaterialList.vue';
import Login from '../components/Login.vue';
import AddMaterial from '@/views/AddMaterial.vue';
const routes = [
  {
    path: '/',
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
