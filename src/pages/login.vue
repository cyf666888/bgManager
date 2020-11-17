<template>
  <div class="login">
    <el-form
      :model="loginForm"
      :rules="rules"
      ref="loginForm"
      label-width="100px"
      class="loginForm"
    >
    <el-form-item><h2>欢迎登录</h2></el-form-item>
      <el-form-item label="用户名" prop="username" >
        <el-input v-model="loginForm.username" placeholder="请输入用户名" clearable></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
          <el-input
          v-model="loginForm.password"
          show-password
          clearable
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
       <el-form-item>
        <el-button type="primary" @click="login('loginForm')">登录</el-button>
      </el-form-item>
    </el-form>
      

  </div>
</template>

<script>
import {getUserLogin} from '../utils/axios'
import {mapActions} from 'vuex'
export default {
  data() {
    return {
      //表单输入参
      loginForm: {
        username: "",
        password: ""
      },
      //规则验证
      rules: {
        //用户名验证
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 2, max: 15, message: "长度在 2 到 15 个字符", trigger: "blur" }
        ],
        //密码验证
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 18, message: "长度在 6 到 18 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {

    ...mapActions(['changeUserInfoAction']),
    //登录
    login(refName) {
      //console.log(this.$refs[formName],'formDOM')
      //validate 验证
      this.$refs[refName].validate(valid => {
        if (valid) {
          //登录逻辑
          //调取登录接口
          getUserLogin(this.loginForm)
          .then(res=>{
            // console.log(res);
            if(res.data.code==200){
              this.$message.success(res.data.msg);
              // sessionStorage.setItem('userInfo',JSON.stringify(res.data.list));
              // 登录信息放入状态层管理
              this.changeUserInfoAction(res.data.list);
              this.$router.push('/home');
            }else{
              this.$message.error(res.data.msg)
            }
          })
          
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  },

};
</script>

<style lang="stylus" scoped>
@import '../stylus/index.styl';
.login
  width 100vw 
  height 100vh
  background $fristBgColor
  .loginForm
    width 320px
    position absolute
    left 50% 
    top 50% 
    transform translate(-50%,-50%)
</style>
