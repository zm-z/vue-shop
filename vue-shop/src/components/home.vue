<template>
  <div class="home">
    <el-container>
     <!-- 头部 -->
     <el-header>
       <i class="el-icon-star-off">后台管理系统</i>
       <el-button type="button" @click="clear" style="float:right;">退出</el-button>
     </el-header>
     <!-- 主题区域 -->
    <el-container>
      <!-- 主题左侧 -->
      <el-aside width="200px">
        <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router>
      <!-- 一级菜单 -->
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>用户管理</span>
        </template>
        <!-- 二集菜单 -->
      <el-menu-item index="users">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
      </el-menu-item>
      </el-submenu>
       <!-- 一级菜单 -->
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>权限管理</span>
        </template>
        <!-- 二集菜单 -->
      <el-menu-item index="2-1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>角色列表</span>
        </template>
      </el-menu-item>
      <el-menu-item index="Rights">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>权限列表</span>
        </template>
      </el-menu-item>
      </el-submenu>
       <!-- 一级菜单 -->
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>商品管理</span>
        </template>
        <!-- 二集菜单 -->
      <el-menu-item index="3-1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>商品列表</span>
        </template>
      </el-menu-item>
      <el-menu-item index="3-2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>分类参数</span>
        </template>
      </el-menu-item>
      <el-menu-item index="3-3">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>商品分类</span>
        </template>
      </el-menu-item>
      </el-submenu>
       <!-- 一级菜单 -->
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>订单管理</span>
        </template>
        <!-- 二集菜单 -->
      <el-menu-item index="4-1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
      </el-menu-item>
      </el-submenu>
       <!-- 一级菜单 -->
      <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>数据统计</span>
        </template>
        <!-- 二集菜单 -->
      <el-menu-item index="5-1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
      </el-menu-item>
      </el-submenu>
    </el-menu>
      </el-aside>
      <!-- 主题右侧 -->
      <el-main>
        
        <!-- 占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
   </el-container>
  </div>
</template>

<script>
export default {
  data(){
    return{
      menulist:[]
    }
  },
  created() {
    this.getMenuList()
  },
  methods:{
    clear(){
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    handleOpen(key, keyPath) {
        console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
        console.log(key, keyPath);
    },
    getMenuList() {
      this.axios.post('/api/getMenuList').then(res=>{
        //console.log(res)

      })
    }

  },
  
}
</script>

<style scoped>
.el-header{
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.el-aside{
  background-color: #333744;
}
.el-main{
  background-color: #eaedf1;
}
.el-container{
  height: 100%;
}
.home{
  height: 100%;
}
</style>