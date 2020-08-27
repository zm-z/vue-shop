<template>
  <div class="roles">
       <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{path:'/home'}"> 首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
      </el-breadcrumb>
      <el-card style="margin-top:10px">
          <el-row>
              <el-button type="primary">添加角色</el-button>
          </el-row>
          <el-table :data="roleslist">
          <!-- 展开列 -->
          <el-table-column type="expand">
              <template slot-scope="scope">
                  {{scope.row}}
              </template>
          </el-table-column>
          <!-- 索引列 -->
          <el-table-column type="index" label="#"></el-table-column>
          <el-table-column label="角色名称" prop="name"></el-table-column>
          <el-table-column label="描述" prop="desc"></el-table-column>
          <el-table-column label="操作">
          <template v-slot="scope">
           <el-tooltip class="item" effect="dark" content="编辑" placement="top-start">
           <el-button type="primary" icon="el-icon-edit" @click="edit(scope.row.id)"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="查看" placement="top-start">
           <el-button type="warning" icon="el-icon-share" @click="look(scope.row.id)"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top-start">
           <el-button type="anger" icon="el-icon-delete" @click="del(scope.row.id)"></el-button>
          </el-tooltip>
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
            roleslist:[],
        }
    },
    created(){
        this.getroleslist()
    },
    methods:{
        async getroleslist(){
            const {data : res}=await this.axios.post("/api/getroleslist")
            this.roleslist=res
        }
    },
}
</script>

<style>

</style>