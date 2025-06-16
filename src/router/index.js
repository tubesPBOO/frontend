import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from '../views/LandingPage.vue';
import Login from '../views/Login.vue';
import MaterialsList from '../views/MaterialList.vue';
import AddMaterial from '../views/AddMaterial.vue';
import GeneralRegister from '../views/GeneralRegister.vue';
import RegisterCustomer from '../views/RegisterCustomer.vue';
import RegisterTukang from '../views/RegisterTukang.vue';
import CustomerList from '../views/CustomerList.vue';
import TukangList from '../views/TukangList.vue';
import CustomerProfile from '../views/CustomerProfile.vue';
import DashboardAdmin from '../views/DashboardAdmin.vue';
import HomePage from '@/views/HomePage.vue';
import Payment from '@/views/Payment.vue';
import DashboardTukang from '@/views/DashboardTukang.vue';
import ProfileTukang from '@/views/ProfileTukang.vue';
import EditProfileTukang from '@/views/EditProfileTukang.vue';
import ProfileCustomer from '../views/ProfileCustomer.vue';
import EditProfileCustomer from '../views/EditProfileCustomer.vue';
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
    path: '/HomePage',
    name: 'HomePage',
    component: HomePage
  },
  {
    path: '/payment',
    name: 'Payment',
    component: Payment
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
  },
  {
    path: '/Dashboard/Admin',
    name: 'Dashboard Admin',
    component: DashboardAdmin
  },
  {
    path: '/Dashboard/Tukang',
    name: 'Dashboard Tukang',
    component: DashboardTukang
  },
  {
    path: '/Profile/Tukang',
    name: 'Profile Tukang',
    component: ProfileTukang
  },
  {
    path: '/Profile/Tukang/Edit',
    name: 'Edit Profile Tukang',
    component: EditProfileTukang
  },
  {
    path: '/customer/profile',
    name: 'ProfileCustomer',
    component: ProfileCustomer,
    meta: { requiresAuth: true }
  },
  {
    path: '/customers',
    name: 'CustomerList',
    component: CustomerList
  },
  {
    path: '/customer/:name',
    name: 'CustomerProfile',
    component: CustomerProfile
  },
  {
    path: '/tukang',
    name:'TukangList',
    component: TukangList
  },
  {
    path: '/materials/edit',
    name: 'EditMaterial',
    component: () => import('@/views/EditMaterial.vue')
  },
  {
    path: '/customer/edit-profile',
    name: 'EditProfileCustomer',
    component: () => import('../views/EditProfileCustomer.vue')
  },
  {
    path: '/order/add',
    name: 'AddOrder',
    component: () => import('@/views/AddOrder.vue')
  },
  {
    path: '/orders/details',
    name: 'CustomerOrderDetails',
    component: () => import('@/views/CustomerOrderDetails.vue')
  },
  {
    path: '/orders',
    name: 'CustomerOrderList',
    component: () => import('@/views/CustomerOrderList.vue')
  },
  {
    path: '/tukang/orders',
    name: 'TukangOrderList',
    component: () => import('@/views/TukangOrderList.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
