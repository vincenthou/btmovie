<template lang="jade">
div.ui.container
  h1 {{msg}}
  movies
</template>

<script>
import Movies from './components/movies.vue'
export default {
  data () {
    return {

    }
  },
  components: {
    Movies
  }
}
</script>

<style lang="stylus">
font-stack = Helvetica, sans-serif
primary-color = #999

body
  font 100% font-stack
  color primary-color
</style>
