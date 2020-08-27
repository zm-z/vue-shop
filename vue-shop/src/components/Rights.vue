<template>
  <div class="rights">
      <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item > 首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 卡片图 -->
      <el-card style="margin-top:20px">
          <el-table :data="userlist">
          <el-table-column type="index" label="#"></el-table-column>
          <el-table-column label="权限名称" prop="name"></el-table-column>
          <el-table-column label="路径" prop="path"></el-table-column>
          <el-table-column label="权限等级" prop="level">
              <template slot-scope="scope">
                  <el-tag v-if="scope.row.level==='0'"> 一级</el-tag>
                  <el-tag type="success" v-else-if="scope.row.level==='1'">二级</el-tag>
                  <el-tag type="info" v-else>三级</el-tag>
              </template>
          </el-table-column>
          </el-table>
      </el-card>
  </div>
</template>

<script>
export default {
    data(){
        return{
            userlist:[],
        }
    },
    created(){
        this.getuserlist()
    },
    methods:{
        getuserlist(){
            this.axios.post('/api/getquanxian').then(res=>{
                this.userlist=res.data
            })
        },
    },

}
</script>

<style>

</style>