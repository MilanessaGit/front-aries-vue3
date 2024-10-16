import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/auth/Login.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {requireAuth: true}
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
      meta: {requireAuth: true}
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {redirectIfAuth: true}
    }
  ]
})

// Guards
router.beforeEach((to, from, next) => {
  //console.log("From:", from);
  //console.log("To:", to);
  let token = localStorage.getItem("access_token");

  if (to.meta.requireAuth) {
    if (!token) { // Si no tenemos token
      return next({name: 'Login'}) //entonces redireccion a /login
    }
    return next();// Si tienes token puedes pasar next()
  }

  if (to.meta.redirectIfAuth && token) { //Si ya tienes el token y el otro valor es true
    return next({name: 'about'}) // entonces redirection a /about(Perfil) xq ya estas logueado ya no entras mas a /login
  }

  return next();

});

export default router
