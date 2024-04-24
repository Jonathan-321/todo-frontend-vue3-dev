<template>
  <div class="auth-container">
    <div class="block-center">
      <h2>Login</h2>
      <p><span v-if="!errorMessage">Enter fields and click Login</span></p>
      <p><span class="error-head">* required field.</span></p>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      <form @submit.prevent="submitForm">
        Username: <input type="text" v-model="username">
        <span v-if="usernameErr" class="error">*</span>
        <br><br>
        Password: <input type="password" v-model="password">
        <span v-if="passwordErr" class="error">*</span>
        <br><br>
        <button type="submit">Login</button>
      </form>
      <p><router-link to="/register">Click to add new user</router-link></p>
    </div>
  </div>
</template>

<script>
import todoServices from '../services/TodoServices.js'

export default {
  data() {
    return {
      username: '',
      password: '',
      usernameErr: false,
      passwordErr: false,
      errorMessage: ''
    }
  },
  methods: {
    submitForm() {
      if (!this.username || !this.password) {
        this.usernameErr = !this.username
        this.passwordErr = !this.password
        return
      }
      const user = {
        username: this.username,
        password: this.password
      }
      todoServices.loginUser(user)
        .then(response => {
          if (response.data.success) {
            localStorage.setItem('token', response.data.token)
            this.$router.push({ name: 'lists' })
          } else {
            this.errorMessage = response.data.message 
          }
        })
        .catch(error => {
          console.error('Error:', error)
          this.errorMessage = 'An error occurred during login. Please try again.'
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
