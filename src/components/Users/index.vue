<template>
 <div>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    <el-breadcrumb-item>用户列表</el-breadcrumb-item>
  </el-breadcrumb>
  <el-table :data="userList"
             border
             style="width: 100%">
    <el-table-column type="index"
                     width="50">
    </el-table-column>
    <el-table-column prop="username"
                     label="姓名"
                     width="180">
    </el-table-column>
    <el-table-column prop="email"
                     label="邮箱"
                     width="180">
    </el-table-column>
    <el-table-column prop="mobile"
                     label="电话">
    </el-table-column>
    <el-table-column prop="role_name"
                     label="角色">
    </el-table-column>
    <el-table-column prop="mg_state"
                     label="状态">
        <!-- 作用域插槽 -->
        <template slot-scope="scope">
           <el-switch v-model="scope.row.mg_state"
              active-color="#13ce66"
              inactive-color="#ff4949">
           </el-switch>
         </template>
    </el-table-column>
    <el-table-column prop="address"
                     label="操作">
        <template slot-scope="scope">           
          <el-row>
            <el-button type="primary" 
                       icon="el-icon-edit" 
                       circle
                       @click="edit(scope.row.id)"></el-button>
            <el-button type="danger" 
                       icon="el-icon-delete" 
                       circle></el-button>
            <el-button type="success" 
                       icon="el-icon-setting" 
                       circle></el-button>
          </el-row>
        </template>
    </el-table-column>
  </el-table>

   <!--
      @size-change pagesize 改变时触发
      @current-change pagenum改变时触发
      current-page 当前页码
      page-sizes 设置每页显示的条数
      total 总计路数
     -->
  <el-pagination @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="queryParams.pagenum"
                :page-sizes="[1, 2, 3, 4]"
                :page-size="queryParams.pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
    </el-pagination>
 </div>
</template>

<script>
export default {
  name: 'users',
  data () {
    return {
      userList: [],
      queryParams: {
        query: '',
        pagenum: 1,
        pagesize: 10
      },
      total: 0
    }
  },
  created () {
    this.getUserList()
  },
  methods: {
    async getUserList () {
      const { data: res } = await this.$http.get('users', { params: this.queryParams })
      this.userList = res.data.users
      this.total = res.data.total
    },
    edit (id) {
      alert(id)
    },
    handleSizeChange (pagesize) {
      this.queryParams.pagesize = pagesize
      this.getUserList()
    },
    handleCurrentChange (currentpage) {
      this.queryParams.pagenum = currentpage
      this.getUserList()
    }
  }
}
</script>

<style lang="less" scoped>
  .el-table{
    margin-top: 15px;
    margin-bottom: 15px;
  }
</style>
