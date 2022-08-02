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
  }

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// router.beforeEach((to, from, next) => {
//   if (to.meta.needsAuth) {
//     next("/");
//   } else {
//     next();
//   }
// });

//router.beforeEach(async (to, from) => {
//  if (
//    // make sure the user is authenticated
//    !isAuthenticated &&
//    // ❗️ Avoid an infinite redirect
//    to.name !== '/'
//  ) {
//    // redirect the user to the login page
//    return { name: 'Login' }
//  }
//})

export default router;
