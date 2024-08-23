const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      // LES ROUTES VERS SUPER ADMIN
      {
        path: "/Main",
        component: () => import("pages/Admin/MyDash.vue"),
        children: [
          { path: "", redirect: "/Dash" },
          {
            path: "/Dash",
            component: () => import("pages/Admin/DashSet.vue"),
          },
          { path: "/Das", component: () => import("pages/Admin/DashSet.vue") },
        ],
      },
      // LES ROUTES VERS LA GESTION CHARROI
      {
        path: "/Ch",
        component: () => import("pages/gestionCharroi/CharroiPage.vue"),
        children: [
          { path: "", redirect: "/Child1" },
          {
            path: "/Child1",
            component: () => import("pages/gestionCharroi/ChaContent.vue"),
          },
          {
            path: "/Child2",
            component: () => import("pages/gestionCharroi/AllAgent.vue"),
          },
          {
            path: "/Child3",
            component: () => import("pages/gestionCharroi/GestionVehicule.vue"),
          },
          {
            path: "/Child4",
            component: () => import("pages/gestionCharroi/VehiculeMouve.vue"),
          },
          {
            path: "/Child5",
            component: () =>
              import("pages/gestionCharroi/GestionReparation.vue"),
          },
          // Add more child routes as needed
        ],
      },
      // LES ROUTES VERS LA GESTION STOCK
      {
        path: "/St",
        component: () => import("pages/gestionStock/StockPage.vue"),
        children: [
          { path: "", redirect: "/Stock" },
          {
            path: "/Stock",
            component: () => import("pages/gestionStock/StockContent.vue"),
          },
          {
            path: "/Pieces",
            component: () => import("pages/gestionStock/PiecesContent.vue"),
          },
          // Add more child routes as needed
        ],
      },
    ],
  },
  // Always leave this as last one, but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
