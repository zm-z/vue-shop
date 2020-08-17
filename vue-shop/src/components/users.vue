<template>
  <div class="users">
  <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item > 首页</el-breadcrumb-item>
  <el-breadcrumb-item>用户管理</el-breadcrumb-item>
  <el-breadcrumb-item>拥护列表</el-breadcrumb-item>
</el-breadcrumb>
<el-card style="margin-top:20px">
    <!-- 搜索 -->
<div style="margin-top: 15px;">
  <el-input placeholder="请输入内容" style="width:250px" v-model="search">
    <template slot="append">搜索</template>
  </el-input>
   <el-button type="primary" @click="dialogVisible=true">添加用户</el-button>
</div>
    <el-table :data="newuserlist" stripe>
      <el-table-column label="姓名" prop="username" width="80px"></el-table-column>
      <el-table-column label="邮箱" prop="email" width="120px"></el-table-column>
      <el-table-column label="电话" prop="mobile"></el-table-column>
      <el-table-column label="角色" prop="role_name"></el-table-column>
      <el-table-column label="状态" prop="state">
        <!-- 使用插槽 -->
          <template v-slot="scope">
						<el-switch v-model="scope.row.state" @change="stateChange(scope.row)"></el-switch>
					</template>
      </el-table-column>
      <el-table-column label="操作" width="250px">
        <template v-slot="scope">
           <el-tooltip class="item" effect="dark" content="编辑" placement="top-start">
           <el-button type="primary" icon="el-icon-edit" @click="edit(scope.row.id)"></el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="查看" placement="top-start">
           <el-button type="warning" icon="el-icon-share"></el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="删除" placement="top-start">
           <el-button type="anger" icon="el-icon-delete" @click="del(scope.row.id)"></el-button>
        </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
</el-card>
   <!-- 添加用户弹出框 -->
   <el-dialog
  title="添加用户信息"
  :visible.sync="dialogVisible"
  width="50%"
  :before-close="handleClose">
  <!-- 主体信息 -->
  <el-form :model="numberValidateForm" status-icon ref="numberValidateForm" label-width="100px" class="demo-ruleForm">
  <el-form-item
    label="用户名"
    prop="username"
    :rules="[
      { required: true, message: '用户名不能为空'},
    ]"
  >
    <el-input type="text" v-model.number="numberValidateForm.username" autocomplete="off" class="demo-dynamic"></el-input>
  </el-form-item>
  <el-form-item
    label="邮箱"
    prop="email"
    :rules="[
      { required:true, message: '请输入邮箱地址', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
    ]"
  >
    <el-input type="email"  v-model.number="numberValidateForm.email" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item
    label="电话"
    prop="mobile"
    :rules="[
      { required: true, message: '电话不能为空'},
      { type: 'number', message: '电话格式不对'},
      
    
    ]"
  >
    <el-input type="text" v-model.number="numberValidateForm.mobile" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item
    label="别名"
    prop="role_name"
    :rules="[
      { required: true, message: '别名不能为空'},
      //{ type: 'number', message: '邮箱格式不对'}
    ]"
  >
    <el-input type="text" v-model.number="numberValidateForm.role_name" autocomplete="off"></el-input>
  </el-form-item>
</el-form>
  <span slot="footer" class="dialog-footer" style="margin-right:40%">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="adduser('dynamicValidateForm')">确 定</el-button>
  </span>
</el-dialog>
<!-- 修改 -->
<el-dialog title="用户信息" :visible.sync="update">
  <el-form
        :model="newlist"
        status-icon
        :rules="rules"
        ref="newlist"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="账号" prop="username">
          <el-input type="password" v-model="newlist.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input type="email" v-model="newlist.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input  v-model="newlist.mobile" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="别名" prop="role_name">
          <el-input  v-model="newlist.role_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('newlist')">确定</el-button>
          <el-button @click="update=false">取消</el-button>
        </el-form-item>
      </el-form>
</el-dialog>

  </div>
</template>

<script>
export default {
  created(){
      this.getMenuList()
    },
  data() {
      //  var validatePass = (rule, value, callback) => {
      //   if (value === '') {
      //     callback(new Error('请输入密码'));
      //   } else {
      //     callback();
      //   }
      // };
      return {
          userlist:[],
          search:'',
          dialogVisible: false,
          update:false,
          //添加用户
           numberValidateForm: {
          username: '',
          email:'',
          mobile:'',
          role_name:'',
        },
        //修改
        newlist:{
          username: '',
          email:'',
          mobile:'',
          role_name:'',
        },
         rules: {
          username: [
            { required: true, message: '请输入名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          email: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { type:'email', message: '格式不对', trigger: 'blur' }
          ],
          mobile:[
            { required: true, message: '请输入电话', trigger: 'blur' },
            
          ],
          role_name:[
            { required: true, message: '请输入电话', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
        }
      }
    },
     methods: {

      getMenuList() {
      this.axios.post('/api/getMenuList').then(res=>{
        //console.log(res.data)
        this.userlist=res.data
      })
    },
    //监听switch状态改变
       stateChange(userinfo){
         var that=this
        this.axios.post('/api/stateChange',{id:userinfo.id,state:userinfo.state})
        .then(res=>{
        })
       },
       //把添加用户窗口×掉
       handleClose(done) {
        this.$confirm('确认取消？')
          .then(_ => {
            done();
            
          })
          .catch(_ => {});
      },

      //用户添加
      adduser(numberValidateForm){
         
             this.axios.post('/api/adduser',this.numberValidateForm)
            .then(res=>{
             this.dialogVisible=false
             this.getMenuList()
          
        }); 
      },

      //修改
      edit(id){
        this.update=true
        console.log(id)
        console.log(this.numberValidateForm)
        this.axios.post('/api/update').then(res=>{
          console.log(res)
          
        })
      },

      //删除
      del(id){
        //console.log(id)
        this.axios.post('/api/deluser',{id:id}).then(res=>{
          //console.log(res)
          this.getMenuList()
        })
      },

      //
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$message('更改成功')
            this.update=false
          this.getMenuList()
              }else{
                this.$message('更改失败');
              }
            })
            
      }
          } ,
        
  
   
    computed:{
      //实现搜索功能
      newuserlist:function(){
      return this.userlist.filter((list)=>{
        return list.username.match(this.search)
      
      })
       },
       
    }

}
</script>

<style scoped>
.el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>