<template>

  <div class="auth-container" >
  <div class="block-center">
    <h2>User Add</h2>
      <p><span id="page-message">Enter fields and click Save</span></p>
      <p><span class="error-head">* required field.</span></p>
      <form @submit.prevent="submitForm">
        First Name: <input type="text" v-model="firstName">
        <span v-if="firstNameErr" class="error">*</span>
        <br><br>
        Last Name: <input type="text" v-model="lastName">
        <span v-if="lastNameErr" class="error">*</span>
        <br><br>
        Username: <input type="text" v-model="username">
        <span v-if="usernameErr" class="error">*</span>
        <br><br>
        Password: <input type="password" v-model="password">
        <span v-if="passwordErr" class="error">*</span>
        <br><br>
        <button type="submit">Save</button>
      </form>
      <button @click="$router.push({name: 'login'})">Cancel</button>
    </div>
  </div>
</template>

<script>
import todoServices from '../services/TodoServices.js'

export default {
  data() {
    return {
      firstName: '',
      lastName: '',
      username: '',
      password: '',
      firstNameErr: false,
      lastNameErr: false,
      usernameErr: false,
      passwordErr: false
    }
  },
  methods: {
    submitForm() {
      if (!this.firstName || !this.lastName || !this.username || !this.password) {
        this.firstNameErr = !this.firstName
        this.lastNameErr = !this.lastName
        this.usernameErr = !this.username
        this.passwordErr = !this.password
        return
      }

      const data = {
        firstName: this.firstName,
        lastName: this.lastName,
        username: this.username,
        password: this.password
      }

      todoServices.addUser(data)
        .then(() => {
          this.$router.push({name: 'login'})
        })
        .catch(error => {
          console.error('Error registering user:', error)
          this.pageMessage = 'Error: ' + error.message
        })
    }
  }
}
</script>

<style scoped>

.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.block-center {
  text-align: center;
  max-width: 400px;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

h2 {
  margin-top: 0;
}

form {
  margin-bottom: 20px;
}

input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

input[type="submit"],
button {
  padding: 10px 20px;
  background-color: #000;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

input[type="submit"]:hover,
button:hover {
  background-color: #333;
}

.error {
  color: red;
  font-size: 12px;
}

.error-head {
  color: red;
  font-size: 14px;
}

a {
  color: #000;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

</style>


  
