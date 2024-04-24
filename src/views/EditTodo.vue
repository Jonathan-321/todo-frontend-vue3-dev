<script>


import todoServices from "../services/TodoServices.js";
export default {
  data() {
    return {
      listId: null,
      name: '',
      nameError: false,
      currentUser: {
        firstName: '',
        lastName: ''
      },
      todoItems: []
    }
  },
  mounted() {
    this.listId = this.$route.params.id
    this.loadTodoItems()
    this.getListName()
    this.getCurrentUser()
  },
  methods: {
    submitForm() {
      if (!this.name) {
        this.nameError = true
        return
      }

      this.nameError = false

      const data = { id: this.listId, name: this.name }
      todoServices.updateList(this.listId, data)
        .then(() => {
          this.pageMessage = 'List Updated'
        })
        .catch(error => {
          this.pageMessage = `Error: ${error.statusText}`
        })
    },
    deleteList() {
      todoServices.deleteList(this.listId)
        .then(() => {
          this.$router.push({ name: 'lists' })
        })
        .catch(error => {
          this.pageMessage = `Error: ${error.statusText}`
        })
    },
    goToLists() {
      this.$router.push({ name: 'lists' })
    },
    getListName() {
      todoServices.getList(this.listId)
        .then(response => {
          this.name = response.data.list.name
        })
        .catch(error => {
          this.pageMessage = `Error: ${error.statusText}`
        })
    },
    loadTodoItems() {
      todoServices.getListItems(this.listId)
        .then(response => {
          this.todoItems = response.data.items
        })
        .catch(error => {
          console.error('Error loading todo items:', error)
        })
    },
    updateItemState(itemId, state) {
      const data = { id: itemId, state: state ? 'complete' : 'in-progress' }
      todoServices.updateListItem(this.listId, itemId, data)
        .then(() => {
          console.log('Todo item updated')
        })
        .catch(error => {
          console.error('Error updating todo item:', error)
        })
    },
    updateItem(itemId) {
      this.$router.push({ name: 'itemUpdate', query: { listId: this.listId, itemId} })
    },
    deleteItem(itemId) {
      todoServices.deleteListItem(this.listId, itemId)
        .then(() => {
          this.loadTodoItems()
        })
        .catch(error => {
          console.error('Error deleting item:', error)
        })
    },
    addItem() {
      this.$router.push({ name: 'addItem', query: { listId: this.listId }})
    },
    
    getCurrentUser() {
      todoServices.getUser()
        .then(response => {

          this.currentUser.firstName = response.data.user.firstName;
          this.currentUser.lastName = response.data.user.lastName;
        })
        .catch(error => {
          console.error('Error getting current user:', error)
        })
    },


    logout() {
      todoServices.logoutUser()
        .then(() => {
          localStorage.removeItem('token')
          this.$router.push({ name: 'login' })
        })
        .catch(error => {
          console.error('Error logging out:', error)
        })
    }
  }
}
</script>

<template>
  <div>
    <h2>Todo List Update</h2>
    <div class="block-center">
      <p>Hi, <span>{{ currentUser.firstName }} {{ currentUser.lastName }}</span> (<a href="#" @click.prevent="logout">Logout</a>)</p>
      <p><span class="error-head">* required field.</span></p>
      <p><span id="page-message">Enter fields and click Save</span></p>
      <form @submit.prevent="submitForm">
        <input type="hidden" v-model="listId" />
        Name: <input type="text" v-model="name" />
        <span v-if="nameError" class="error">*</span>
        <br /><br />
        <button type="submit">Update</button>
        <button type="button" @click="deleteList">Delete</button>
        <button type="button" @click="goToLists">Lists</button>
      </form>
    </div>
    <h3>Todo List Items</h3>
    <table>
      <thead>
        <tr>
          <th>Complete</th>
          <th>Name</th>
          <th>Description</th>
          <th>State</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in todoItems" :key="item.id">
          <td><input type="checkbox" :id="`item${item.id}`" v-model="item.state" @change="updateItemState(item.id, item.state)" /></td>
          <td>{{ item.name }}</td>
          <td>{{ item.description }}</td>
          <td :id="`fitem${item.id}`">{{ item.state }}</td>
          <td>
            <button @click="updateItem(item.id)">Update</button>
            <button @click="deleteItem(item.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <form @submit.prevent="addItem">
      <input type="hidden" v-model="listId" />
      <button type="submit">Add Item</button>
    </form>
  </div>
</template>


