<template>
  <div class="post">
    <mu-toast v-if="error" message="没有找到好电影"/>
    <div class="loading" v-if="loading">
      <mu-circular-progress :size="40"/>
    </div>
    <div class="movies-wrapper">
      <mu-grid-list cell-height="570">
        <mu-grid-tile v-for="movie, index in movies" :key="index">
          <img :src="movie.poster">
          <span slot="title">{{movie.title}}</span>
          <span slot="subTitle">{{movie.year}} - {{movie.tag}} - {{movie.type}}</span>
        </mu-grid-tile>
      </mu-grid-list>
    </div>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this page only -->
<style scoped>
  .movies-wrapper {
    margin: 10px auto;
    width: 800px;
  }
</style>

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
          if (error) {
            this.error = true
            if (this.error) clearTimeout(this.toastTimer)
            this.toastTimer = setTimeout(() => { this.error = false }, 2000)
          }
        })
    }
  }
}
</script>
