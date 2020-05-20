<template>
    <div>
        <div class="my-block">
            <div class="sub-title">安全设置</div>
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form
                            :inline="false"
                            :model="formData"
                            size="small"
                            class="demo-form-inline"
                            label-width="130px"
                            :rules="rules"
                            ref="formData"
                    >
                        <p class="titleName">重置登录密码</p>
                        <el-form-item label="注册手机号 : ">
                            <div>{{formData.loginPhone||'无'}}</div>
                        </el-form-item>
                        <el-form-item label="短信验证码 : " prop="loginCode">
                            <el-input v-model="formData.loginCode">
                                <template slot="append">
                                    <el-button type="warning" class="send" @click="loginClick(1)" :disabled="disabled">
                                        {{loginText}}
                                    </el-button>
                                </template>
                            </el-input>
                        </el-form-item>
                        <el-form-item label="新密码 : " prop="loginWord">
                            <el-input v-model="formData.loginWord" v-enter-number type="password"

                                      maxlength="6"
                                      clearable
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="再次输入：" prop="loginNew">
                            <el-input v-model="formData.loginNew"  type="password"
                                      v-enter-number
                                      maxlength="6"
                                      clearable
                            ></el-input>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="center">
                <el-col :span="3">
                        <el-button type="danger" size="medium" @click="submitForm('formData',1)">保存</el-button>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form
                            :inline="false"
                            :model="formData2"
                            size="small"
                            class="demo-form-inline"
                            label-width="130px"
                            :rules="rules2"
                            ref="formData2"
                    >
                        <p class="titleName">重置钱包密码</p>

                        <el-form-item label="注册手机号 : ">
                            <div>{{formData2.instphone||'无'}}</div>
                        </el-form-item>
                        <el-form-item label="短信验证码 : " prop="setCode">
                            <el-input v-model="formData2.setCode">
                                <template slot="append">
                                    <el-button type="warning" class="send" @click="loginClick(2)" :disabled="disabled2">
                                        {{setText}}
                                    </el-button>
                                </template>
                            </el-input>

                        </el-form-item>

                        <el-form-item label="新密码 : " prop="setWord">
                            <el-input v-model="formData2.setWord" v-enter-number maxlength="6" type="password"
                                      clearable
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="再次输入：" prop="setNew">
                            <el-input v-model="formData2.setNew"  type="password" v-enter-number maxlength="6" clearable
                            ></el-input>
                        </el-form-item>
                    </el-form>

                </el-col>
            </el-row>

            <el-row type="flex" class="row-bg" justify="center">
                <el-col :span="3">
                    <el-button type="danger" size="medium" @click="submitForm('formData2',2)"
                               style="margin-bottom: 20px">保存
                    </el-button>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import {verification, resetWalletPwd, resetpassword} from '@http/managerUser'
    import md5 from "js-md5";

    export default {
        name: "teamDetail",
        data() {
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.formData.loginCode !== '') {
                        this.$refs.formData.validateField('loginNew');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.formData.loginWord) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            var validatePass3 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.formData2.setWord !== '') {
                        this.$refs.formData2.validateField('setNew');
                    }
                    callback();
                }
            };
            var validatePass4 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.formData2.setWord) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                formData: {
                    loginCode: '',
                    loginWord: '',
                    loginNew: '',
                    setCode: '',
                    setWord: '',
                    setNew: '',
                }, formData2: {
                    loginCode: '',
                    loginWord: '',
                    loginNew: '',
                    setCode: '',
                    setWord: '',
                    setNew: '',
                },
                rules: {
                    loginWord: [
                        {validator: validatePass, trigger: 'blur', required: true,}
                    ],
                    loginNew: [
                        {validator: validatePass2, trigger: 'blur', required: true,}
                    ],
                    loginCode: {
                        trigger: "blur",
                        required: true,
                        message: "验证码不能为空"
                    },

                },
                rules2: {
                    setCode: {
                        trigger: "blur",
                        required: true,
                        message: "验证码不能为空"
                    },
                    setWord: [
                        {validator: validatePass3, trigger: 'blur', required: true,}
                    ],
                    setNew: [
                        {validator: validatePass4, trigger: 'blur', required: true,}
                    ],
                },
                setText: '立即获取',
                loginText: '立即获取',
                count: "",
                timer: null,
                disabled: false,
                disabled2: false,
            };
        },
        components: {},
        methods: {
            async loginClick(type) {
                let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
                let phone = ''
                let codeType = ''
                if (userInfo.loginPhone) {
                    if (type === 1) {
                        phone = userInfo.loginPhone
                        codeType = 0
                    }
                } else {
                    this.$tools.$mes('无手机号码', 'warning')
                    return false
                }
                if (userInfo.instPhone) {
                    if (type === 2) {
                        phone = userInfo.instPhone
                        codeType = 6
                    }
                } else {
                    this.$tools.$mes('无手机号码', 'warning')
                    return false
                }

                let vm = this
                const time_count = 60
                vm.count = time_count
                let obj = {
                    type: codeType,
                    userType: 0,
                    phone: phone
                }
                let res = await verification(obj)
                if (res && res.code === 1000) {
                    vm.timer = window.setInterval(() => {
                        if (vm.count > 0 && vm.count <= time_count) {
                            vm.count--
                            if (type === 1) {
                                vm.disabled = true
                                vm.loginText = `${vm.count}s秒后重新获取`
                            } else {
                                vm.disabled2 = true
                                vm.setText = `${vm.count}s秒后重新获取`
                            }

                        } else {
                            if (type === 1) {
                                vm.disabled = false
                                vm.loginText = '立即获取'
                            } else {
                                vm.disabled2 = false
                                vm.setText = '立即获取'
                            }
                            clearInterval(vm.timer)
                            vm.timer = null
                        }

                    }, 1000)
                    this.$tools.$mes('短信验证码发送成功', 'success')
                }

            },
            async submitForm(formName, type) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let obj ={}
                        if (type === 2) {
                             obj = {
                                code: this.formData2.setCode,
                                newPassword: md5(`${this.formData2.setNew}fanglin`),
                                type: 6,
                            }
                        } else {
                             obj = {
                                code: this.formData.loginCode,
                                newPassword:  md5(`${this.formData2.loginNew}fanglin`),
                                type: 0,
                            }
                        }
                        return new Promise((resolve, reject) => {
                            resetpassword(obj).then(res => {
                                if (res && res.code === 1000) {
                                    this.$tools.$mes('修改成功', 'success')
                                }
                            }).catch(error => reject(error))
                        })
                    } else {
                        return false;
                    }
                });
            },
            init() {
                let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
                this.formData2.instphone = userInfo.instPhone
                this.formData.loginPhone = userInfo.loginPhone

                function geTel(tel) {
                    var reg = /^(\d{3})\d{4}(\d{4})$/;
                    return tel.replace(reg, "$1****$2");
                }

                if (this.formData2.instphone !== undefined) {
                    this.formData2.instphone = geTel(this.formData2.instphone)
                }
                if (this.formData.loginPhone !== undefined) {
                    this.formData.loginPhone = geTel(this.formData.loginPhone)
                }
            }
        },
        created() {
            this.init()
        }
    };
</script>
<style scoped lang="less">
    .titleName {
        font-weight: bold;
    }

    .demo-form-inline {
        margin-left: 15px;
    }

    .el-input-group__append button {
        color: #fff;
        background-color: #e6a23c;
        border-color: #e6a23c;
    }
</style>
