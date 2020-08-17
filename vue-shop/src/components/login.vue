<template>
<div class="all">
  <div class="login">
    <div class="box">
      <img src="../assets/logo.png" />
    </div>
    <div class="main">
    <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="账号" prop="username">
          <el-input type="password" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</div>
  
</template>

<script>
export default {
       data() {
      return {
        ruleForm: {
          username: '',
          password: ''
        },
        rules: {
          username: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 8, max: 14, message: '长度在 8 到 14 个字符', trigger: 'blur' }
          ],
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let that=this
            this.axios.post('/api/login',{
              username:that.ruleForm.username,
              password:that.ruleForm.password
            }).then(res=>{
              if(res.data.length){
              that.$message('登录成功')
              //console.log(res.data[0].id)
              window.sessionStorage.setItem('token',res.data[0].id)
              that.$router.push({name:'home'})
              }else{
                this.$message('登陆失败');
              }
            })
            
            
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
};
</script>
<style scoped>
.box {
  position: absolute;
  height: 50px;
  width: 50px;
  background-color: azure;
  border-radius: 50%;
  overflow: hidden;
  margin-left: 150px;
  margin-top: -20px;
  padding: 2px;
}
img {
  width: 100%;
  height: 100%;
}
.login {
  width: 350px;
  height: 240px;
  background-color: cornsilk;
}
.main{
    position: absolute;
    margin-left: -20px;
    margin-top: 30px;
    width: 300px;
}
.all{
  width: 100%;
  height: 100%;
  background-color: aqua;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
