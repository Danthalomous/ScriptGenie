import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue';
import ProfileDetailsView from '../views/ProfileDetailsView.vue';
import ScriptGenieViewWAccount from '../views/ScriptGenieWAccountView.vue'
import ScriptGenieViewWOAccount from '../views/ScriptGenieWOAccountView.vue'
import store from '../stores/index';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileDetailsView,
      meta: { requiresAuth: true }, // meta field for authentication check
    },
    {
      path: '/script-genie-w-account',
      name: 'script-genie-w-account',
      params: {
        selectedSport: null,
      },
      component: ScriptGenieViewWAccount,
      meta: { requiresAuth: true }, // meta field for authentication check
    },
    {
      path: '/script-genie-wo-account',
      name: 'script-genie-wo-account',
      params: {
        selectedSport: '',
      },
      component: ScriptGenieViewWOAccount,
    }
  ]
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters.isAuthenticated;

  if (to.matched.some((record) => record.meta.requiresAuth) && !isAuthenticated) {
    // If the route requires authentication and the user is not authenticated, check local storage for token
    const token = localStorage.getItem('authToken');
    if (token) {
      // If token exists in local storage, set it in Vuex store and proceed to the route
      store.commit('setAuthToken', token);
      next();
    } else {
      // If token does not exist in local storage, redirect to home
      next('/');
    }
  } else {
    next();
  }
});

export default router;
