import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Posts from "../views/Posts.vue";
import PostformModify from "../views/PostformModify.vue";
import Postform from "../views/Postform.vue";

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
    path: "/postform",
    name: "Postform",
    component: Postform,
    meta: {
      needsAuth: true
    }
  },
  {
    path: "/postform/:id",
    name: "PostformModify",
    component: PostformModify,
    props: true,
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
  if (to.fullPath === '/posts' || to.fullPath === '/postform') {
    if (!sessionStorage.getItem('token')) {
      next('/');
    }
  }
  next();
});

export default router;
