<template>
  <!-- el-card小容器 可以理解为div 卡片 -->
  <el-card class="box">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索框 -->
    <el-row class="searchBox">
      <el-col>
        <el-input @clear="getAllUsers()" clearable class="searchInput" placeholder="请输入内容" v-model="query">
          <el-button @click="searchUser()" slot="append" icon="el-icon-search"></el-button>
          <!-- <el-button slot="append" icon="el-icon-search"></el-button> -->
        </el-input>
        <el-button type="primary">添加按钮</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <!-- tableData:[{data:?,name:?,address:?}]
    el-table-column 控制的列
      label 控制的是表头
      prop的值 控制的是该列中每一行单元格的内容
    -->
    <el-table :data="list" style="width: 100%">
      <el-table-column prop="id" label="#" width="80"></el-table-column>
      <el-table-column prop="username" label="姓名" width="100"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="140"></el-table-column>
      <el-table-column prop="mobile" label="电话" width="140"></el-table-column>
      <!-- 过滤器fmtdata
        1. v-bind 后面
        2{{msg | 名字}}
      -->
      <!-- 1.思路 直接给prop赋值 不行-->
      <!-- <el-table-column prop="create_time | fmtdate" label="创建日期" width="200"></el-table-column> -->
      <!-- 2.思路 可以实现效果 但是error -->
      <!-- <el-table-column prop="create_time" label="创建日期" width="200">
        {{create_time | fmtdate}}
      </el-table-column> -->
      <!-- 3.单元格内容不是prop的值，希望{{}}的结果->
        如果单元格内容不是prop的值，需要给单元格内容的外层加template,
        此时,外层数据和内层数据有联系吗？没联系
        外层的list.对象.create_time
        template 有一个属性slot-scope="外层数据"
      -->
      <!-- 3.总结：
        前提：单元格的内容不是prop的值，
        3.1 给单元格内容外层加template
        3.2 给template设置slot-scope
        3.3 slot-scope的值自动绑定为外层数据el-table ：data="list"
        3.4 在template内部通过list.row 自动取出数组list中每个对象
        3.5 list.row.属性create_time
        注意：row是固定写法
      -->
      <el-table-column prop="create_time" label="创建日期" width="200">
        <template slot-scope="list">
          <!-- 内层list.row 表示的是list的每个对象 -->
          {{ list.row.create_time | fmtdate}}
        </template>
      </el-table-column>
      <!-- 前提：单元格内容是一个组件，不是prop的值 -->
      <!-- 处理：
      1.将el-table-column标签中的prop=""属性删除
      2.在el-table-column标签中添加template标签
      3.在template标签中添加slot-scope="scope"
        在element-ui中switch开关的基本用法的代码将el-switch标签放在template标签里
      -->
      <el-table-column label="用户状态" width="120">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </template>
      </el-table-column>
      <!--
        步骤：
          1.将el-table-column标签中的prop的属性删除(单元格内容是一个组件)
          2.添加template标签，并给template标签添加 slot-scope="scope"
          3.element-ui的button按钮的基本用法代码的最后的代码的一段el-button复制到template标签中，保留type的属性为primary、danger、success值的标签
          4.调节按钮大小和 颜色：给3个el-button标签添加属性size="mini"和plain
      -->
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" circle size="mini" plain></el-button>
          <el-button type="danger" icon="el-icon-delete" circle size="mini" plain></el-button>
          <el-button type="success" icon="el-icon-check" circle size="mini" plain></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="2"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      // 搜索时的关键字
      query: '',
      // 分页功能 -> 前提接口必须支持分页->通常在接口url参数中类似page的参数名
      pagenum: 1,
      pagesize: 2,
      total: -1,
      // 15条 每页条数pagesize=2 -> 8页
      // 1-2 3-4 5-6 ...
      // pagenum
      // 表格数据
      list: []
    }
  },
  // 获取首屏数据写在created中，也可以写在mounted中
  created () {
    this.getTableData()
  },
  methods: {
    // 清空时获取所有用户
    getAllUsers () {
      // 此时 query 查询参数已经是''
      this.getTableData()
    },
    // 搜索用户
    searchUser () {
      // 输入框组件 -> 在组件文本清空时 -> 做一些事儿
      // query 数据默认''
      this.pagenum = 1
      this.getTableData()
    },
    // 分页相关的方法
    // 每页2条 -> 每页4条 -> 按照4条发送请求
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pagenum = 1
      this.pagesize = val
      this.getTableData()
    },
    // 当前1页 -> 点击2页 -> 获取第二页数据
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      // 根据新页码发送请求
      this.pagenum = val
      this.getTableData()
    },
    async getTableData () {
      // this.$http
      // 模板字符串`${}`
      // const per = {name: 'abc'}
      // `${name}`  -> abc
      // 请求头
      // {
      //   // contentType: 'text/html';
      //   // Authorization: ? 正确用户的token
      // }

      // 设置请求头？
      // 设置发送请求时的请求头 -> axios库 -> 找axios中有没有可以设置headers头部的API -> 看axios文档
      // axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
      const AUTH_TOKEN = localStorage.getItem('token')
      // console.log(AUTH_TOKEN)
      this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN
      const res = await this.$http.get(`users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`)
      // console.log(res)
      const {data, meta: {msg, status}} = res.data
      if (status === 200) {
        this.total = data.total
        this.list = data.users
        // console.log(this.list)
      }
    }
  }
}
</script>

<style>
.searchBox {
  margin-top: 20px;
}
.searchInput {
  width: 400px;
}
</style>
