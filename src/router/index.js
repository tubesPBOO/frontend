import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from '../views/LandingPage.vue';
import Login from '../views/Login.vue';
import MaterialsList from '../views/MaterialList.vue';
import AddMaterial from '../views/AddMaterial.vue';
import GeneralRegister from '../views/GeneralRegister.vue';
import RegisterCustomer from '../views/RegisterCustomer.vue';
import RegisterTukang from '../views/RegisterTukang.vue';

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
  },
  {
    path: '/register/customer',
    name: 'RegisterCustomer',
    component: RegisterCustomer
  },
  {
    path: '/register/tukang',
    name: 'RegisterTukang',
    component: RegisterTukang
  },
  {
    path: '/register',
    name: 'Register',
    component: GeneralRegister
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
