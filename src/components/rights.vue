<template>
  <el-card class="box">
    <!-- 面包屑 -->
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb> -->
    <!-- 目的:简化代码，希望用法 -->
    <cus-bread level1="权限管理" level2="权限列表"></cus-bread>
    <el-button class="btn" type="primary">添加角色</el-button>
    <!-- 表格 -->
    <el-table height="450px" :data="list" style="width: 100%">
      <el-table-column type="index" label="#" width="160"></el-table-column>
      <el-table-column prop="authName" label="权限名称" width="200"></el-table-column>
      <el-table-column prop="path" label="路径" width="200"></el-table-column>
      <el-table-column label="层级" width="200">
        <template slot-scope="scope">
          <span v-if="scope.row.level==='0'"> 一级 </span>
          <span v-if="scope.row.level==='1'"> 二级 </span>
          <span v-if="scope.row.level==='2'"> 三级 </span>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  },
  created () {
    this.getTableData()
  },
  methods: {
    // 获取表格数据
    async getTableData () {
      // // axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
      // const AUTH_TOKEN = localStorage.getItem('token')
      // this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN;
      const res = await this.$http.get(`rights/list`)
      // console.log(res)
      const {meta: {status, msg}, data} = res.data
      if (status === 200) {
        console.log('请求发起----')
        this.list = data
      }
    }
  }
}
</script>

<style>
.box {
  height: 100%;
}
.btn {
  margin-top: 20px;
}
</style>
