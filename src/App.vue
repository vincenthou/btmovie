<template>
  <div>
    <el-menu :default-active="activeIndex" mode="horizontal" @select="navigate">
      <el-menu-item index="1">
        <router-link to="/">最新</router-link>
      </el-menu-item>
      <el-menu-item index="2">
        <router-link to="search">搜索</router-link>
      </el-menu-item>
    </el-menu>
    <router-view></router-view>
  </div>
</template>

<style>

</style>


<script>
export default {
  name: 'app',
  data () {
    return {
      activeIndex: '1'
    }
  },
  methods: {
    navigate () {
      console.log(arguments)
    }
  }
}
</script>

<style>

</style>
