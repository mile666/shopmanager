<template>
  <div class="login-wrap">
    <el-form class="login-form" label-position="top" label-width="80px" :model="formdata">
      <h2>用户登录</h2>
      <el-form-item label="用户名">
        <el-input v-model="formdata.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formdata.password"></el-input>
      </el-form-item>
      <el-button @click.prevent="handlelogin()" class="login-btn" type="primary">登录</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formdata: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    // 发起登录请求
    async handlelogin () {
      // 目前代码：异步的结果res在一个函数里面获取的
      // 目的：res的获取是同步的
      const res = await this.$http.post(`login`, this.formdata)
      // console.log(res)
      const {
        data: {
          data: {token},
          meta: {msg, status}
        }
      } = res

      if (status === 200) {
        // console.log('login---success')
        // 提示：token值目前不需要关心，将来要用，把token永久存储
        // session/cookie/localStorage(Html5新特性)
        // localStorage.setItem(key名:要存储的数据 )
        localStorage.setItem('token', token)
        // 渲染home.vue <- 改标识/ <- js代码编程导航$router
        this.$router.push({
          name: 'home'
        })
      } else {
        // 用户名/密码错误
        this.$message.error(msg)
      }
      /**
          .then((res) => {
          // console.log(res)
          const {
            data: {
              data,
              meta: {msg, status}
            }
          } = res
          if (status === 200) {
            console.log('login---success')
            // 渲染home.vue <- 改标识/ <- js代码编程导航$router
            this.$router.push({
              name: 'home'
            })
          } else {
            // 用户名/密码错误
            // console.log('login---errr')
            // console.log(msg)
            this.$message.error(msg)
          }
        })
        .catch(err => {
          console.log(err)
        })
         */
    }
  }
}
</script>

<style>
  .login-wrap{
    height: 100%;
    background-color: #324152;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .login-form {
    background-color: #fff;
    width:400px;
    border-radius: 5px;
    padding: 30px;
  }
  .login-btn{
    width: 100%;
  }
</style>
