<script>
import todoServices from "../services/TodoServices.js";

export default {
  data() {
    return {
      name: '',
      nameError: false,
      currentUser: {
        firstName: '',
        lastName: ''
      },
      pageMessage: 'Enter fields and click Save'
    }
  },
  mounted() {
    this.getCurrentUser()
  },
  methods: {
    submitForm(e) {
      e.preventDefault()
      if (!this.name) {
        this.nameError = true
        return
      }
      this.nameError = false
      const data = { name: this.name }
      todoServices.addList(data)
        .then(response => {
          this.$router.push({ name: 'lists', query: { id: response.data.listId } })
        })
        .catch(error => {
          console.error('Error adding list:', error)
          this.pageMessage = 'Error adding list'
        })
    },
    getCurrentUser() {
      todoServices.getUser()
        .then(response => {
          this.currentUser = response.data.user
          console.log('Current user:', this.currentUser)
        })
        .catch(error => {
          console.error('Error getting current user:', error)
          this.pageMessage = 'Error getting current user'
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
          this.pageMessage = 'Error logging out'
        })
    }
  }
}
</script>

<template>
  <div>
    <h2>List Add</h2>
    <div class="block-center">
      <p>Hi, <span>{{ currentUser.firstName }} {{ currentUser.lastName }}</span> (<a href="#" @click.prevent="logout">Logout</a>)</p>
      <p><span>{{ pageMessage }}</span></p>
      <p><span class="error-head">* required field.</span></p>
      <form @submit.prevent="submitForm">
        Name: <input type="text" v-model="name" />
        <span v-if="nameError" class="error">*</span>
        <br /><br />
        <button type="submit">Save</button>
        <button type="button" @click="$router.push({ name: 'lists' })">Cancel</button>
      </form>
    </div>
  </div>
</template>