<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>{{level1}}</el-breadcrumb-item>
    <el-breadcrumb-item>{{level2}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
// 封装函数的技巧
// 1.把重复代码当成函数体
// 2.把变化的量当成函数的形参
export default {
  name: 'cusBread',
  data () {
    return {
      // level1: '权限管理',
      // level2: '权限列表'
    }
  },
  // level1和level2的值来源于外部,但是data的数据的值来源于自己本身
  // 此时，要把数据声明写在选项props
  // 1.props的选项
  // 2.props的值可以是字符串数组
  // 3.level1和level2的用法和data数据用法一样 -> {{level1}}
  // 4.props特点值来源于外部，声明了level1和level2
  // 5.level1和level2就是将来用组件时的标签属性 <自定义标签 level1="">
  // 6.level1和level2在使用组件时 赋值
  props: ['level1', 'level2']
}
</script>

<style>

</style>
