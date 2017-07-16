<template>
  <div class="container">
    <mu-tabs :value="activeTab" @change="handleTabChange">
      <mu-tab value="search" icon="search" title="搜索"/>
      <mu-tab value="home" icon="restore" title="电影"/>
      <mu-tab value="hot" icon="favorite" title="电视剧"/>
    </mu-tabs>
    <transition>
      <router-view></router-view>
    </transition>
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
      activeTab: 'home'
    }
  },
  methods: {
    handleTabChange (activeTab) {
      let pathName = activeTab
      this.activeTab = activeTab
      if (activeTab === 'home') {
        pathName = '/'
      }
      this.$router.push(pathName)
    }
  }
}
</script>
