import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Posts from "../views/Posts.vue";
import Newpost from "../views/Newpost.vue";
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/posts",
    name: "Posts",
    component: Posts,
    meta: {
      needsAuth: true
    }
  },
  {
    path: "/newpost",
    name: "Newpost",
    component: Newpost,
    meta: {
      needsAuth: true
    }
  }

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


router.beforeEach((to, from, next) => {
  if (to.fullPath === '/posts' || to.fullPath === '/newpost') {
    if (!sessionStorage.getItem('token')) {
      next('/');
    }
  }
  next();
});

export default router;
