<template>
  <div>
    <el-container class="home_container">
      <el-header>
        <div>
          <img src="@/assets/logo.png"
               alt="logo"
               width="60px"
               height="50px">
          <span>Shop-manager电商后台系统</span>
        </div>
        <el-button type="danger"
                   @click="logout">退出</el-button>
      </el-header>
      <el-container>
        <el-aside :width="isCollapse?'60px':'200px'">
          <el-radio-group v-model="isCollapse"
                          style="margin-bottom: 20px;">
            <el-radio-button :label="false">展开</el-radio-button>
            <el-radio-button :label="true">收起</el-radio-button>
          </el-radio-group>

          <el-menu default-active="1-1"
                   background-color="#373d41"
                   text-color="#fff"
                   :unique-opened="true"
                   :collapse="isCollapse"
                   :collapse-transition="false">
            <el-submenu :index="menu.id+''"
                        v-for="menu in menuList"
                        :key="menu.id">
              
              <template slot="title">
                <i :class="iconsObj.menu.id"></i>
                <span slot="title">{{menu.authName}}</span>
              </template>
              
              <el-menu-item :index="subMenu.id+''"
                          v-for="subMenu in menu.children"
                          :key="subMenu.id">
                
                <template slot="title">
                <i class="el-icon-location"></i>
                <span slot="title">{{subMenu.authName}}</span>
              </el-submenu> 
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      isCollapse: false,
      menuList: [],

      // 左侧导航栏的菜单图标
      iconsObj:{
        125: 'el-icon-user',
        103: 'el-icon-unlock',
        101: 'el-icon-s-goods',
        102: 'el-icon-s-order',
        145: 'el-icon-s-data'
      }
    }
  },
  async created () {
    const { data: res } = this.$http.get('/api/private/v1/menus')
    if (res.meta.status !== 200) {
      this.$msg.error(res.meta.msg)
      return
    }
    this.menuList = res.data
  },
  methods: {
    logout () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped>
.home_container {
  height: 100%;
}
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 20px;
    }
  }
}
.el-aside {
  background-color: #373d41;
  height: 1000px;
  .el-menu {
    background-color: #373d41;
  }
}
</style>
