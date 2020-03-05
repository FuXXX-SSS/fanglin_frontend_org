<!-- 登录 -->
<template>
  <div class="box">
    <div class="iocn">logo</div>
    <div class="logo">
      <div class="logo1">
        <el-input v-model="username" placeholder="请输入手机号/用户名" class="username" clearable></el-input>
        <el-input v-model="password" placeholder="请输入登录密码" show-password class="password"></el-input>
        <el-button class="but" @click="onIndex">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    onIndex() {
      console.log(this.username, this.password, 11111111);
      var data = {
        adminAccount: this.username,
        password: this.password
      };
    
    }
  },

};
</script>
<style  lang="less" scoped>
.box {
   width: 100vw;
  height: 100vh;
  background: url("../../assets/register.png");
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .iocn {
    color: white;
    font-size: 60px;
  }
  .logo {
    width: 406px;
    height: 304px;
    background: white;
    border-radius: 10px;
    margin-top: 60px;
    display: flex;
    // justify-content: center;
    align-items: center;
    flex-direction: column;
    .logo1 {
      width: 356px;
      margin-top: 50px;
      .username {
        width: 356px;
        height: 48px;
      }
      .password {
        width: 356px;
        height: 48px;
        margin-top: 20px;
      }
      .but {
        width: 356px;
        height: 48px;
        background: #0099ff;
        font-size: 16px;
        color: white;
        margin-top: 40px;
        border-radius: 4px;
      }
    }
  }
}
</style>