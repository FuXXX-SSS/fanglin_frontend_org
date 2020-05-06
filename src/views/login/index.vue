<!-- 登录 -->
<template>
    <div class="box">
        <div class="logo">
            <div class="logo1">
                <h3>芳邻机构管理后台</h3>

                <el-collapse-transition>
                    <div v-if="isShow">
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
                                          @keyup.enter.native="onIndex"
                                ></el-input>
                            </el-form-item>
                        </el-form>

                        <el-button class="but"
                                   @click="onIndex"
                                   :loading="isLoading"
                                   @keyup.enter="onIndex"
                                   :disabled="isdisabled">{{login}}
                        </el-button>

                    </div>
                </el-collapse-transition>
                <el-collapse-transition>

                    <div v-if="!isShow" class="change">
                        <el-form :model="ruleForm" :rules="newRules" ref="ruleForm"
                                 class="demo-ruleForm">
                            <el-form-item label="" prop="age">
                                <el-input
                                        v-model="ruleForm.age"
                                        placeholder="请输入手机号/"
                                ></el-input>
                            </el-form-item>
                            <!--                            <el-form-item label="" prop="oldPass">-->
                            <!--                                <el-input-->
                            <!--                                        v-model="ruleForm.oldPass"-->
                            <!--                                        autocomplete="off"-->
                            <!--                                        placeholder="请输入旧密码"-->
                            <!--                                ></el-input>-->
                            <!--                            </el-form-item>-->
                            <el-form-item label="" prop="pass">
                                <el-input
                                        v-model="ruleForm.pass"
                                        autocomplete="off"
                                        placeholder="请输入登录密码"
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="" prop="checkPass">
                                <el-input
                                        v-model="ruleForm.checkPass"
                                        autocomplete="off"
                                        placeholder="请确认登录密码"
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="" prop="checkCode">
                                <el-input
                                        v-model="ruleForm.checkCode"
                                        autocomplete="off"
                                        style=""
                                        placeholder="请输入验证码"
                                        class="codeSend"
                                >
                                    <template slot="append">
                                        <el-button type="primary" class="send" @click="sendCode" :disabled="isDisabled">
                                            {{codeText}}
                                        </el-button>
                                    </template>
                                </el-input>


                            </el-form-item>

                        </el-form>

                        <el-button class="but"
                                   @click="submitForm('ruleForm')"
                                   :loading="isLoading"
                                   @keyup.enter="submitForm('ruleForm')"
                                   :disabled="isdisabled">提交
                        </el-button>
                    </div>
                </el-collapse-transition>
                <div class="passWords" @click="changeWords">{{changeText}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    import {menuInfo, privilege, managerUserDetail, verification} from '@http/managerUser'
    import {instInfo} from '@http/inst'

    export default {
        components: {},
        data() {
            var checkAge = (rule, value, callback) => {
                console.log(value);
                if (!value) {
                    return callback(new Error('账号不能为空'));
                } else {
                    callback();
                }
            };
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.ruleForm.checkPass !== '') {
                        this.$refs.ruleForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                loginData: {
                    username: "",
                    password: "",
                },
                ruleForm: {
                    pass: '',
                    checkPass: '',
                    checkCode: '',
                    age: ''
                },
                login: '登录',
                changeText: '忘记密码',
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
                },
                newRules: {
                    pass: [
                        {validator: validatePass, trigger: 'blur'}
                    ],
                    checkPass: [
                        {validator: validatePass2, trigger: 'blur'}
                    ],
                    age: [
                        {validator: checkAge, trigger: 'blur'}
                    ],
                    checkCode: {
                        trigger: "blur",
                        required: true,
                        message: "验证码不能为空"
                    }, oldPass: {
                        trigger: "blur",
                        required: true,
                        message: "旧密码不能为空"
                    },
                },
                codeText: '发送',
                isShow: true,
                isDisabled: false,
            };
        },
        watch: {},
        methods: {
            async onIndex() {
                let _this = this
                _this.$refs.loginFrom.validate(valid => {
                    if (valid) {
                        _this.$store.dispatch("user/getLogin", this.loginData)
                            .then(() => {
                                return new Promise((resolve, reject) => {
                                    menuInfo()
                                        .then(res => {
                                            if (res && res.code === 1000) {
                                                sessionStorage.setItem("routeData", JSON.stringify(res.data));
                                                return new Promise((resolve, reject) => {
                                                    instInfo().then(res2 => {
                                                        _this.$store.dispatch("user/getInfo", res2.data)
                                                        sessionStorage.setItem("InfoData", JSON.stringify(res2.data));
                                                        _this.$tools.$mes('登录成功', 'success')
                                                        _this.isLoading = false
                                                        _this.login = '登录'
                                                        _this.$router.push({
                                                            path: "/index"
                                                        });
                                                    })
                                                })

                                            }

                                        })
                                        .catch(err => reject(err));
                                });
                            })
                            .catch(err => {
                            });
                    } else {
                        return false;
                    }
                });
            },
            switchChange() {
                this.$store.dispatch("Switch/switchChange", this.value1)
            },
            changeWords() {
                this.isShow = !this.isShow
                this.isShow ? this.changeText = '忘记密码' : this.changeText = '登录账号'
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        return new Promise((resolve, reject) => {
                            let obj = {
                                code: this.ruleForm.checkCode,
                                newPassword: this.ruleForm.checkPass,
                                // oldPassword: this.ruleForm.oldPass,
                                phone: this.ruleForm.age,
                                userType: 1,
                            }
                            forgotpassword(obj)
                                .then(res => {
                                    if (res.code === 1000)
                                        this.$tools.$mes('修改密码成功', 'success')
                                    this.isShow = true
                                })
                                .catch(err => reject(err));
                        });
                    } else {
                        return false;
                    }
                });
            },
            async sendCode() {
                let _this = this
                if (this.ruleForm.age !== "") {
                    let obj = {
                        userType: 1,
                        type: 1,
                        phone: this.ruleForm.age,
                    }

                    _this.codeText = 60;
                    var interval = setInterval(function () {
                        _this.codeText -= 1;
                        _this.isDisabled = true;
                        if (_this.codeText === 0) {
                            _this.isDisabled = false;
                            _this.codeText = '发送'
                            clearInterval(interval);
                        }
                        //do whatever here..
                    }, 1000);
                    // _this.codeText
                    let res = verification(obj)
                } else {
                    _this.$tools.$mes('手机号不能为空', 'error')
                    return false
                }
            }
        },
        created() {
            sessionStorage.clear()
        }
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

    .passWords {
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        color: #606266;
        display: inline-block;
        height: 40px;
        line-height: 40px;
        outline: 0;
        padding: 0 15px;
        -webkit-transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
        transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
        width: 100%;
        font-size: 14px;
        text-align: right;

        &:hover {
            color: #409EFF;
            cursor: pointer;
        }
    }

    .box /deep/ .el-input-group__append {
        background-color: #0099ff;
        color: #fff;
        border-radius: 0 30px 30px 0;
        border-color: rgba(255, 255, 255, 0.2);;
    }

    .box /deep/ .codeSend {
        .el-input__inner {
            border-radius: 50px 0 0 50px;
            border-right: none;
        }
    }

    .el-button.is-disabled:hover {
        background: transparent;
    }

    .change /deep/ .el-input__inner {
        height: 40px;
    }
</style>
