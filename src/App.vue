<template>
  <div class="container">
    <mu-bottom-nav :value="bottomNav" @change="handleChange">
      <mu-bottom-nav-item value="search" title="搜索" icon="search"/>
      <mu-bottom-nav-item value="home" title="最新" icon="restore"/>
      <mu-bottom-nav-item value="hot" title="最热" icon="favorite"/>
    </mu-bottom-nav>
    <transition>
      <router-view></router-view>
    </transition>
    <mu-back-top/>
  </div>
</template>

<style>
  .container {
    overflow: hidden;
  }
</style>


<script>
export default {
  name: 'app',
  data () {
    return {
      bottomNav: 'home'
    }
  },
  methods: {
    handleChange (val) {
      this.bottomNav = val
      if (val === 'home') {
        val = '/'
      }
      this.$router.push(val)
    }
  }
}
</script>
