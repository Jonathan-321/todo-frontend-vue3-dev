<script>

export default {

  data() {

    return {
      isLoading: true,
    };

  },

  mounted() {
    // Simulate loading delay
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);

  },

};

</script> <template>
  <div id="app">

    <nav v-if="!isLoading" class="navbar shadow">

      <!-- Navigation menu code -->

      <ul class="nav-links">

      </ul>

    </nav>

    <div v-else class="loading">

      <p>Loading...</p>

    </div>

    <router-view v-if="!isLoading" />

  </div>

</template>