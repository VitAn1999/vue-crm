import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import fb from "firebase/app";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { auth: true },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login.vue"),
    meta: { layout: "empty-layout" },
  },
  {
    path: "/registration",
    name: "Registration",
    component: () => import("@/views/Registration.vue"),
    meta: { layout: "empty-layout" },
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("@/views/Profile.vue"),
    meta: { auth: true },
  },
  {
    path: "/categories",
    name: "Categories",
    component: () => import("@/views/Categories.vue"),
    meta: { auth: true },
  },
  {
    path: "/detail-record/:id",
    name: "Detail-record",
    component: () => import("@/views/DetailRecord.vue"),
    meta: { auth: true },
  },
  {
    path: "/history",
    name: "History",
    component: () => import("@/views/History.vue"),
    meta: { auth: true },
  },
  {
    path: "/planning",
    name: "Planning",
    component: () => import("@/views/Planning.vue"),
    meta: { auth: true },
  },
  {
    path: "/record",
    name: "Record",
    component: () => import("@/views/Record.vue"),
    meta: { auth: true },
  },
  {
    path: "*",
    name: "Unknow-page",
    component: () => import("@/views/UnknowPage.vue"),
    meta: { auth: true },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const currentUser = fb.auth().currentUser;
  const requireAuth = to.matched.some((view) => view.meta.auth);
  if (!currentUser && requireAuth) {
    next("/login?message=login");
  } else {
    next();
  }
});

export default router;
