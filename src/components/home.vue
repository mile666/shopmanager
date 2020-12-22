<template>
  <el-container class="container">
    <el-header>
      <el-row>
        <el-col :span="4">
          <img src="@/assets/logo.png" alt="图片加载失败">
        </el-col>
        <el-col :span="19" class="middle">
          <h2>电商后台管理系统</h2>
        </el-col>
        <el-col :span="1">
          <!-- <div class="grid-content bg-purple">
          </div> -->
          <a href="#" @click.prevent="handleLoginout()" class="loginout">退出</a>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside class="aside" width="200px">
        <!-- 导航 -->
        <!-- router -> 开启路由模式，点击对应的导航，当前的path就是激活导航的index值 -->
        <el-menu default-active="1" :router="true" :unique-opened="true">
          <!-- 用户管理 -->
          <el-submenu :index="item1.order+''" v-for="(item1, i) in menus" :key="item1.id">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item1.authName}}</span>
            </template>
            <el-menu-item :index="item2.path+''" v-for="(item2, i) in item1.children" :key="item2.id">
              <i class="el-icon-menu"></i>
              {{item2.authName}}
            </el-menu-item>
          </el-submenu>
          <!-- 权限管理 -->
          <!-- <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item index="roles">
              <i class="el-icon-menu"></i>
              角色列表
            </el-menu-item>
            <el-menu-item index="rights">
              <i class="el-icon-menu"></i>
              权限列表
            </el-menu-item>
          </el-submenu> -->
          <!-- 商品管理 -->
          <!-- <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item index="1-1">
              <i class="el-icon-menu"></i>
              商品列表
            </el-menu-item>
            <el-menu-item index="1-1">
              <i class="el-icon-menu"></i>
              分类参数
            </el-menu-item>
            <el-menu-item index="1-1">
              <i class="el-icon-menu"></i>
              商品分类
            </el-menu-item>
          </el-submenu> -->
          <!-- 订单管理 -->
          <!-- <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item index="1-1">
              <i class="el-icon-menu"></i>
              订单列表
            </el-menu-item>
          </el-submenu> -->
          <!-- 数据统计 -->
          <!-- <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>数据统计</span>
            </template>
            <el-menu-item index="1-1">
              <i class="el-icon-menu"></i>
              数据报表
            </el-menu-item>
          </el-submenu> -->
        </el-menu>
      </el-aside>
      <el-main class="main">
        <!-- 提供容器 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      menus: []
    }
  },
  // 如果用户没有登录, /标识匹配到时 不能进入home.vue -> 显示login.vue
  // if(有没有正确的token){渲染home.vue}
  // if(没有token){改Login,显示login.vue}
  // 代码位置 -> 在渲染home.vue之前  home.vue渲染完毕时 -> mounted()
  // beforeMount(){?}
  beforeMount () {
    // console.log('beforMount------')
    // if (!localStorage.getItem('token')) {
    //   this.$router.push({
    //     name: 'login'
    //   })
    // }
  },
  created () {
    this.getMenus()
  },
  methods: {
    // 获取菜单
    async getMenus () {
      // 角色为超管 -> 超管的token -> 请求菜单
      // admin登录 -> 主管 -> 所有权限 -> 主管的token 
      const res = await this.$http.get(`menus`)
      const {meta: {status, msg}, data} = res.data
      if (status === 200) {
        this.menus = data
        console.log(this.menus)
      }
    },
    // 退出
    handleLoginout () {
      // 1.清除token
      localStorage.clear()
      // 2.跳转到login
      this.$router.push({
        name: 'login'
      })
      // 提示
      this.$message.warning('退出成功')
    }
  }
}
</script>

<style>
.container {
  height: 100%;
  background: #b3c0d1;
}
.middle {
  text-align: center;
  line-height: 60px;
}
.aside {
  /* background: red; */
}
.main {
  background: gray;
}
.loginout {
  line-height: 60px;
  text-decoration: none;
}
</style>
