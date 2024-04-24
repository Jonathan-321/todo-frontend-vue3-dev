import { createRouter, createWebHistory } from "vue-router";

import Login from "./views/Login.vue";
import AddUser from "./views/AddUser.vue";
import ItemUpdate from "./views/ItemUpdate.vue";
import AddItem from "./views/AddItem.vue";
import TodoList from "./views/TodoLists.vue";
import AddList from "./views/AddList.vue";
import EditList from "./views/EditTodo.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: Login,
    },
    {
      path: "/lists",
      name: "lists",
      component: TodoList,
    },
    {
      path: "/add",
      name: "addList",
      component: AddList,
    },
    {
      path: '/register',
      name: 'register',
      component: AddUser
    },
    {
      path: "/edit/:id",
      name: "editList",
      component: EditList,
      props: true,
    },

    {
      path: '/add-item',
      name: 'addItem',
      component: AddItem  
    },

    {
      path: '/item/:id',
      name: 'itemUpdate',
      component: ItemUpdate,
      props: true
    },
  ],
});

export default router;