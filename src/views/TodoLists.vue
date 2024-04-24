<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import todoServices from '../services/TodoServices.js';

const router = useRouter();
const todoLists = ref([]);
const currentUser = ref({
  firstName: '',
  lastName: ''
});
const message = ref('');

onMounted(() => {
  console.log('loading lists');
  loadTodoLists();
  getCurrentUser();
});

function loadTodoLists() {
  todoServices.getLists()
    .then(response => {
      console.log(response.data);
      todoLists.value = response.data.lists;
      message.value = '';
    })
    .catch(error => {
      message.value = 'Error: ' + error.code + ':' + error.message;
      console.log(error);
    });
}

function addList() {
  router.push({ name: 'addList' });
}

function deleteList(listId) {
  todoServices.deleteList(listId)
    .then(() => {
      loadTodoLists();
    })
    .catch(error => {
      message.value = 'Error: ' + error.code + ':' + error.message;
      console.log(error);
    });
}

function getCurrentUser() {
  todoServices.getUser()
    .then(response => {
      // currentUser.value = response.data.user;
      console.log(response.data)

      currentUser.value.firstName = response.data.user.firstName;
      currentUser.value.lastName = response.data.user.lastName;
    })
    .catch(error => {
      message.value = 'Error: ' + error.code + ':' + error.message;
      console.log(error);
    });
}

function logout() {
  todoServices.logoutUser()
    .then(() => {
      localStorage.removeItem('token');
      router.push({ name: 'login' });
    })
    .catch(error => {
      message.value = 'Error: ' + error.code + ':' + error.message;
      console.log(error);
    });
}
</script>

<template>
  <div>
    <h2>Todo Lists</h2>
    <div class="block-center">
      <p>
        Hi, <span>{{ currentUser.firstName }} {{ currentUser.lastName }}</span>
        (<a href="#" @click.prevent="logout">Logout</a>)
      </p>
      <button @click="addList">Add</button>
    </div>
    <h3>{{ message }}</h3>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="list in todoLists" :key="list.id">
          <td>
            <router-link :to="{ name: 'editList', params: { id: list.id } }">
              {{ list.name }}
            </router-link>
          </td>
          <td>
            <button @click="deleteList(list.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>