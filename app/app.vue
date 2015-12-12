<template lang="jade">
div
  img(class="logo", src="./images/logo.png")
  h1 {{msg}}
  list
</template>

<script>
import List from './components/list.vue'
export default {
  data () {
    return {
      msg: 'Hello from vue-loader!'
    }
  },
  components: {
    List
  }
}
</script>

<style lang="stylus">
font-stack = Helvetica, sans-serif
primary-color = #999
body
  font 100% font-stack
  color primary-color
.logo
  width 40px
  height 40px
</style>
