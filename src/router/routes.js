const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/Index.vue") }]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue")
  },
  {
    path: "/pag2",
    component: () => import("../pages/pag2")
  },
  {
    path: "/login",
    component: () => import("../pages/users/usuario.vue")
  },
  {
    path: "/cadastro",
    component: () => import("../pages/users/cadastro.vue")
  }
];

export default routes;
