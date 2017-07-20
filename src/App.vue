<template>
  <div class="container">
    <mu-tabs :value="activeTab" @change="handleTabChange">
      <mu-tab value="search" icon="search" title="搜索"/>
      <mu-tab value="movies" icon="restore" title="电影"/>
      <mu-tab value="tvplays" icon="favorite" title="电视剧"/>
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
      activeTab: 'movies'
    }
  },
  methods: {
    handleTabChange (activeTab) {
      let pathName = activeTab
      this.activeTab = activeTab
      if (activeTab === 'movies') {
        pathName = '/'
      }
      this.$router.push(pathName)
    }
  }
}
</script>
