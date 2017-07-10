<template>
  <div class="post">
    <div class="loading" v-if="loading">
      Loading...
    </div>

    <div v-if="error" class="error">
      {{ error }}
    </div>

    <ul v-if="movies.length" class="content">
      <li v-for="movie in movies">
        <h2>{{ movie.title }}</h2>
        <p>{{ movie.tag }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      loading: false,
      movies: [],
      error: null
    }
  },
  created () {
    this.fetchData()
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    fetchData () {
      this.error = this.movies = null
      this.loading = true
      axios.get('/static/latest.json')
        .then(resp => {
          this.loading = false
          this.movies = resp.data
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this page only -->
<style scoped>

</style>
