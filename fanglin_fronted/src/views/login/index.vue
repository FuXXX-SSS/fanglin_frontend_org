<!-- 登录 -->
<template>
    <div class="box">
        <div class="logo">
            <div class="logo1">
                <h3>芳邻管理后台</h3>
                <el-form :model="loginData" status-icon :rules="rules" ref="loginFrom">
                    <el-form-item prop="username">

                        <el-input v-model="loginData.username"
                                  placeholder="请输入手机号/用户名"
                                  class="username"
                        ></el-input>
                    </el-form-item>
                    <el-form-item prop="password">

                        <el-input v-model="loginData.password"
                                  placeholder="请输入登录密码"
                                  type="password"
                        ></el-input>
                    </el-form-item>
                </el-form>

                <el-button class="but" @click="onIndex" :loading="isLoading" :disabled="isdisabled">{{login}}
                </el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import {menuInfo, privilege} from '@http/managerUser'

    export default {
        components: {},
        data() {
            return {
                loginData: {
                    username: "",
                    password: "",
                },
                login: '登录',
                isLoading: false,
                isdisabled: false,
                value1: false,
                rules: {
                    username: {
                        trigger: "blur",
                        required: true,
                        message: "用户名不能为空"
                    },
                    password: {
                        trigger: "blur",
                        required: true,
                        message: "密码不能为空"
                    }
                }
            };
        },
        methods: {
            async onIndex() {
                let _this = this
                _this.$refs.loginFrom.validate(valid => {
                    if (valid) {
                        this.$tools.$mes('登录成功', 'success')
                        this.isLoading = false
                        this.login = '登录'
                        // let res  = menuInfo()
                        // console.log(res);
                        sessionStorage.setItem("token",'123');
                        _this.$router.push({
                        // path: this.$route.query.redirect || "/index"
                        path: "/index"
                    });
                    //     _this.$store.dispatch("user/getLogin", this.loginData)
                    //         .then(() => {
                    //             return new Promise((resolve, reject) => {
                    //                 menuInfo(1)
                    //                     .then(res => {
                    //                         console.log(res);
                    //                         if (res && res.code === 1000) {
                    //                             this.$tools.$mes('登录成功', 'success')
                    //                             this.isLoading = false
                    //                             this.login = '登录'
                    //                             // let res  = menuInfo()
                    //                             // console.log(res);
                    //                         }
                    //                         _this.$router.push({
                    //                             // path: this.$route.query.redirect || "/index"
                    //                             path: "/index"
                    //                         });
                    //                     })
                    //                     .catch(err => reject(err));
                    //
                    //             });
                    //
                    //         })
                    //         .catch(err => {
                    //             console.log(err);
                    //         });
                    // } else {
                    //     return false;
                    }
                });


                setTimeout(() => {
                    // _this.$router.push({
                    //     name: 'index'
                    // }, 1500)
                })
                // var userInfo = {
                //     account: 'admin',
                //     password: 'e456776aa7ce341c7e60a624a0a7b8e8',
                //     type: 0,
                // };
                // this.isLoading = true
                // this.isdisabled = true
                // this.login = '登录中'
                // let res = await login(userInfo)
                // if (res && res.code === 1000) {
                //     this.$tools.$mes('登录成功', 'success')
                //     this.isLoading = false
                //     this.isdisabled = false
                //     this.login = '登录'
                //     // let res  = menuInfo()
                //     // console.log(res);
                // }
                // const {data}  =res
                // console.log(data);
                // sessionStorage.setItem(
                //     "userAccessInfo",
                //     JSON.stringify(data)
                // );
                // let _this = this
                // setTimeout(() => {
                //     _this.$router.push({
                //         name: 'index'
                //     }, 1500)
                // })
            },
            switchChange() {
                this.$store.dispatch("Switch/switchChange", this.value1)
            }
        },

    };
</script>
<style lang="less" scoped>
    @bg: #FFFFFF !important;
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

            h3 {
                text-align: center;
                height: 23px;
                font: 20px "microsoft yahei", Helvetica, Tahoma, Arial, "Microsoft jhengHei", sans-serif;
                color: #FFFFFF;
                line-height: 20px;
                padding: 0 0 33px 0;
                font-weight: bold;
                letter-spacing: 13px;
            }
        }

        .switch {
            text-align: center;
            margin-top: 30px;
        }
    }

    .box /deep/ .el-input__icon {
        height: 109%;
        font-size: 17px;
        color: @bg;

    }

    .box /deep/ .el-input__inner {
        background-color: transparent;
        border-radius: 50px;
        border-color: rgba(255, 255, 255, 0.2);
        height: 50px;
        color: @bg;
        padding-left: 50px;
    }

    .box /deep/ .el-input__prefix {
        left: 17px;
    }

    .box /deep/ .el-switch__label {
        color: #fff;
    }

    .box /deep/ .el-switch__label.is-active {
        color: #409EFF;
    }
</style>