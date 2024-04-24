<template>
    <div>
      <h2>Add Todo Item</h2>
      <div class="block-center">
        <p><span id="page-message">Enter fields and click Save</span></p>
        <p><span class="error-head">* required field.</span></p>
        <form @submit.prevent="submitForm">
          <input type="hidden" v-model="listId" />
          Name: <input type="text" v-model="name" />
          <span v-if="nameError" class="error">*</span>
          <br /><br />
          Description: <textarea v-model="description"></textarea>
          <br /><br />
          State:
          <select v-model="state">
            <option value="in-progress">In Progress</option>
            <option value="complete">Complete</option>
          </select>
          <br /><br />
          <button type="submit">Save</button>
          <button type="button" @click="goBack">Cancel</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import todoServices from '../services/TodoServices.js'
 // console.log(this.$route.query.listId);

  export default {
    data() {
      return {
        listId: '',
        name: '',
        description: '',
        state: 'in-progress',
        nameError: false
      }
    },
    mounted() {
      this.listId = this.$route.query.listId
    },
    methods: {
      submitForm() {
        if (!this.name) {
          this.nameError = true
          return
        }
        this.nameError = false
        const data = {
          name: this.name,
          description: this.description,
          state: this.state
        }
        todoServices.addListItem(this.listId, data)
          .then(() => {
            this.$router.push({ name: 'editList', params : { id: this.listId } })
          })
          .catch(error => {
            console.error('Error adding todo item:', error)
          })
      },
      goBack() {
        this.$router.go(-1)
      }
    }
  }
  </script>
  