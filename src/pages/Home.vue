<template>
  <div class="post">
    <mu-toast v-if="error" message="没有找到好电影"/>
    <div class="loading" v-if="loading">
      <mu-circular-progress :size="40"/>
    </div>
    <div class="movies-wrapper">
      <mu-row gutter class="movie-row" v-for="cols, rowIndex in movieRows" :key="rowIndex">
        <mu-col width="100" tablet="50" desktop="25" v-for="movie, colIndex in cols" :key="colIndex">
          <mu-card>
            <mu-card-media :title="movie.title" :subTitle="movie.type">
              <img height=500 :src="movie.poster">
            </mu-card-media>
            <mu-card-actions>
              <mu-chip>{{movie.year}}</mu-chip>
              <mu-chip>{{movie.tag}}</mu-chip>
              <mu-text-field disabled="true" v-model="path" fullWidth v-for="path, pathIndex in movie.paths" :key="pathIndex"/>
              <mu-raised-button label="原始详情页面" target="__blank" :href="movie.link" primary/>
            </mu-card-actions>
          </mu-card>
        </mu-col>
      </mu-row>
    </div>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this page only -->
<style scoped>
  .movies-wrapper {
    margin: 20px 10px;
  }
  .movie-row {
    padding-bottom: 10px; 
  }
</style>

<script>
import axios from 'axios'
const MOVIE_COL = 4

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
      this.error = this.movieRows = null
      this.loading = true
      axios.get('/static/latest.json')
        .then(resp => {
          this.loading = false
          console.log(resp.data)
          let rows = resp.data.reduce((rows, item, index, items) => {
            let rowIndex = ~~(index / MOVIE_COL)
            if (index % MOVIE_COL) {
              rows[rowIndex].push(item)
            } else {
              rows[rowIndex] = [item]
            }
            return rows
          }, [])
          this.movieRows = rows
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
