<!-- 登录 -->
<template>
  <div class="box">
    <div class="logo">
      <div class="logo1">
        <h3>芳邻管理后台</h3>
        <el-input v-model="username" placeholder="请输入手机号/用户名" class="username" clearable prefix-icon="el-icon-user-solid"></el-input>
        <el-input v-model="password" placeholder="请输入登录密码" type="password" class="password" clearable prefix-icon="el-icon-s-goods"></el-input>
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
      this.$router.push({
        name:'index'
      })
    }
  },

};
</script>
<style  lang="less" scoped>
  @bg:#FFFFFF !important;
.box {
   width: 100vw;
  height: 100vh;
  background: url("../../assets/back.jpg") no-repeat;
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  color: @bg;
  .iocn {
    color: white;
    font-size: 60px;
  }
  .logo {
    margin-top: 82px;
    width: 406px;
    height: 304px;
    border-radius: 10px;
    display: flex;
    // justify-content: center;
    align-items: center;
    flex-direction: column;
    .logo1 {
      width: 280px;
      margin-top: 50px;
      .username {
        height: 48px;
      }
      .password {
        height: 48px;
        margin-top: 20px;
      }
      .but {
        width: 280px;
        border-radius: 50px;
        height: 48px;
        background: #0099ff;
        font-size: 16px;
        color: white;
        margin-top: 40px;
        border: none;
      }
    }
    h3{
      text-align: center;
      height: 23px;
      font: 20px "microsoft yahei",Helvetica,Tahoma,Arial,"Microsoft jhengHei",sans-serif;
      color: #FFFFFF;
      line-height: 20px;
      padding: 0 0 33px 0;
      font-weight: bold;
      letter-spacing: 13px;
    }
  }
}
  .box /deep/  .el-input__icon{
    height: 109%;
    font-size: 17px;
    color: @bg;

  }
  .box /deep/ .el-input__inner{
    background-color: transparent;
    border-radius: 50px;
    border-color: rgba(255,255,255,0.2);
    height: 50px;
    color: @bg;
    padding-left: 50px;
  }
  .box /deep/ .el-input__prefix{
    left: 17px;
  }
</style>