<template>
    <div>
      <h2>Update Todo Item</h2>
      <div class="block-center">
        <p><span id="page-message">Enter item details and click Save</span></p>
        <p><span class="error-head">* required field.</span></p>
        <form @submit.prevent="submitForm">
          <input type="hidden" v-model="listId" />
          <input type="hidden" v-model="itemId" />
          Item Name: <input type="text" v-model="itemName" />
          <span v-if="itemNameError" class="error">*</span>
          <br /><br />
          Item Description: <textarea v-model="itemDescription"></textarea>
          <span v-if="itemDescriptionError" class="error">*</span>
          <br /><br />
          State:
          <select v-model="state">
            <option value="in-progress">In Progress</option>
            <option value="complete">Complete</option>
          </select>
          <br /><br />
          <button type="submit">Save</button>
          <button type="button" @click="cancelUpdate">Cancel</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import todoServices from '../services/TodoServices.js'
  
  export default {
    data() {
      return {
        listId: '',
        itemId: '',
        itemName: '',
        itemDescription: '',
        state: '',
        itemNameError: false,
        itemDescriptionError: false
      }
    },
    mounted() {
      this.listId = this.$route.query.listId;
      this.itemId = this.$route.query.itemId;
      console.log('listId:', this.listId);
      console.log('itemId:', this.itemId);
      this.getItemDetails()
    },
    methods: {
      getItemDetails() {
        todoServices.getListItems(this.listId)
          .then(response => {
            const item = response.data.item
            this.itemName = item.name
            this.itemDescription = item.description
            this.state = item.state
          })
          .catch(error => {
            console.error('Error fetching item details:', error)
          })
      },
      submitForm() {
        if (!this.itemName) {
          this.itemNameError = true
          return
        }
        if (!this.itemDescription) {
          this.itemDescriptionError = true
          return
        }
  
        this.itemNameError = false
        this.itemDescriptionError = false
  
        const data = {
          name: this.itemName,
          description: this.itemDescription,
          state: this.state
        }
  
        todoServices.updateListItem(this.listId, this.itemId, data)
          .then(() => {
            this.$router.push({ name: 'editList', params: { id: this.listId } })
          })
          .catch(error => {
            console.error('Error updating todo item:', error)
          })
      },
      cancelUpdate() {
        this.$router.push({ name: 'editList'})
      }
    }
  }
  </script>
