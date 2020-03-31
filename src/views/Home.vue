<template>
  <div>
    <el-button type="danger"
               @click="logout">登出</el-button>
  </div>
</template>

<script>
export default {
  name: 'home',
  methods: {
    logout () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    }
  }
}
</script>

<style>
</style>
