<template>
  <div class="post">
    <mu-toast v-if="hasDataLoadErr" message="没有找到好电影"/>
    <mu-toast v-if="hasCopyErr" message="复制地址失败"/>
    <mu-toast v-if="hasCopySuccess" message="复制地址成功"/>
    <div class="loading" v-if="isLoaded">
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
              <mu-chip backgroundColor="yellow300">{{movie.score}}</mu-chip>
              <mu-divider class="action-divider"/>
              <mu-raised-button label="原始详情页面" target="__blank" a:href="movie.link" primary/>
              <mu-raised-button label="复制下载地址" primary
                v-clipboard:copy="movie.paths.join('\n')"
                v-clipboard:success="onCopySuccess"
                v-clipboard:error="onCopyError"/>
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
  .action-divider {
    margin: 10px 0;
  }
</style>

<script>
import axios from 'axios'
const MOVIE_COL = 4

export default {
  data () {
    return {
      isLoaded: false,
      movieRows: [],
      hasDataLoadErr: false,
      hasCopySuccess: false,
      hasCopyErr: false
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
      axios.get(`/btmovie/static/${this.$route.name}.json`)
        .then(resp => {
          this.loading = false
          // Sort with score
          let rows = resp.data.sort((one, another) => another.score - one.score)
            .reduce((rows, item, index, items) => {
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
            this.showToast('hasDataLoadErr')
          }
        })
    },
    onCopySuccess () {
      this.showToast('hasCopySuccess')
    },
    onCopyError () {
      this.showToast('hasCopySuccess')
    },
    showToast (field) {
      this[field] = true
      if (this.toastTimer) clearTimeout(this.toastTimer)
      this.toastTimer = setTimeout(() => { this[field] = false }, 2000)
    }
  }
}
</script>
