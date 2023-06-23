import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: () => import("../views/Home.vue"),
    },
    {
      path: "/register",
      component: () => import("../views/Register.vue"),
    },
    {
      path: "/sign-in",
      component: () => import("../views/SignIn.vue"),
    },
    {
      path: "/diaries",
      component: () => import("../views/Diaries.vue"),
    },
    {
      path: "/diaries/new",
      component: () => import("../views/NewDiary.vue"),
    },
    {
      path: "/diaries/:id",
      component: () => import("../views/Diary.vue"),
      props: true,
    },
    {
      path: "/:pathMatch(.*)*",
      component: () => import("../views/NotFound.vue"),
    }
  ],
});

export default router;
