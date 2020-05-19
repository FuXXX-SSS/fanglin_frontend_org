<template>
    <div>
        <div class="main" v-if="isShow">
            <div class="my-block">
                <div class="sub-title">志愿者管理</div>

                <el-form
                        :inline="true"
                        :model="formData"
                        size="small"
                        class="demo-form-inline"
                >
                    <el-form-item label="昵称">
                        <el-input v-model="formData.keyword" placeholder="昵称"></el-input>
                    </el-form-item>
                    <el-form-item label="性别">
                        <el-select v-model="formData.gender" placeholder="请选择性别">
                            <el-option label="男" value=1></el-option>
                            <el-option label="女" value=0></el-option>
                            <el-option label="未知" value=-1></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="手机号">
                        <el-input v-model="formData.phone" placeholder="手机号"
                                  onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')"></el-input>
                    </el-form-item>
                    <el-form-item class="options">
                        <el-button @click="formData = {},init()" size="medium">重 置
                        </el-button>
                        <el-button type="primary" size="medium" @click="init()">查 询</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="my-block">

                <el-table :data="tableData.records" border>
                    <el-table-column type="index" label="序号" width="50"/>

                    <el-table-column prop="name" label="用户头像">
                        <template slot-scope="scope">
                            <img :src="scope.row.avatar" min-width="70" height="70"/>
                        </template>
                    </el-table-column>
                    <el-table-column prop="nickname" label="昵称"/>
                    <el-table-column prop="gender" label="性别">
                        <template slot-scope="scope">
                            {{ scope.row.gender === 1 ? "男" : scope.row.gender === 0 ? '女':'未知' }}
                        </template>
                    </el-table-column>

                    <el-table-column prop="phone" label="手机号"/>
                    <el-table-column prop="city" label="城市"/>
                    <el-table-column prop="cert" label="是否认证">
                        <template slot-scope="scope">
                            {{ scope.row.cert ? "是" :'否' }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="joinTime" label="加入时间"/>
                    <el-table-column prop="inviteNum" label="邀请人数"/>
                    <el-table-column prop="serviceDuration" label="服务时长"/>
                    <el-table-column prop="serviceTime" label="服务次数"/>
                    <el-table-column prop="score" label="评分"/>
                    <el-table-column prop="userStatus" label="状态" width="150px">
                        <template slot-scope="scope">
                            {{ scope.row.userStatus===1 ? "开通" :'关闭' }}
                        </template>
                        <!--                        <template slot-scope="scope">-->
                        <!--                            <el-switch-->
                        <!--                                    v-model="scope.row.userStatus"-->
                        <!--                                    @change="change(scope.row)"-->
                        <!--                                    active-text="开通"-->
                        <!--                                    inactive-text="关闭">-->
                        <!--                            </el-switch>-->
                        <!--                        </template>-->

                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button
                                    @click="Godetail(scope.row)"
                                    type="text"
                                    size="small"
                            >查看详情
                            </el-button
                            >
                        </template>
                    </el-table-column>
                </el-table>

                <pagination :total="total" @pageChange="pageChange"/>
            </div>
        </div>


        <div class="detail" v-else>
            <Deatail @Godetail="Godetail" :userInfo="userInfo"/>
        </div>
        <el-dialog
                title="设置支付密码"
                :visible.sync="dialogVisible"
                width="30%"
                center
                :showClose="false"
                :close-on-click-modal="false"
                :close-on-press-escape="false"
        >
            <el-form
                    :inline="false"
                    :model="formData2"
                    size="small"
                    class="demo-form-inline"
                    label-width="130px"
                    :rules="rules2"
                    ref="formData2"
            >
                <el-form-item label="注册手机号 : ">
                    <div style="text-align: left">{{formData2.instphone||'无'}}</div>
                </el-form-item>
                <el-form-item label="短信验证码 : " prop="setCode">
                    <el-input v-model="formData2.setCode"
                              clearable
                              autocomplete="off"
                    >
                        <template slot="append">
                            <el-button type="warning" class="send" @click="loginClick(2)" :disabled="disabled2">
                                {{setText}}
                            </el-button>
                        </template>
                    </el-input>

                </el-form-item>

                <el-form-item label="新密码 : " prop="setWord">
                    <input type="password" name="password" style="position: fixed;left: -9999px;">
                    <el-input v-model="formData2.setWord"
                              type="password"
                              maxlength="6"
                              show-word-limit
                              clearable
                              autocomplete="off"
                              onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')"
                    />
                </el-form-item>
                <el-form-item label="再次输入：" prop="setNew">
                    <input type="password" name="password" style="position: fixed;left: -9999px;">
                    <el-input v-model="formData2.setNew"   type="password"
                              maxlength="6"
                              clearable
                              autocomplete="off"
                              onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')"
                              show-word-limit></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                                    <el-button type="danger" size="medium"
                                               @click="submitForm('formData2',2)">保存</el-button>

         </span>
        </el-dialog>

    </div>
</template>

<script>
    import pagination from '@com/el-pagination'
    import Deatail from './teamDetail'
    import {userList} from '@http/user'
    import {verification, resetpassword} from '@http/managerUser'
    import {login} from '@http/managerUser'
    import md5 from "js-md5";
    import {instInfo} from '@http/inst'

    export default {
        name: "index",
        data() {
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
                isShow: true,
                formData: {pageNum: 1, pageSize: 10, type: 1},
                tableData: {records: []},
                pageData: {},
                userInfo: {},
                total: 0,
                dialogVisible: true,
                formData2: {
                    loginCode: '',
                    loginWord: '',
                    loginNew: '',
                    setCode: '',
                    setWord: '',
                    setNew: '',
                },
                setText: '立即获取',
                count: "",
                timer: null,
                disabled2: false,
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
            }
        },
        components: {
            pagination,
            Deatail
        },

        methods: {
            Godetail(data) {
                this.isShow = !this.isShow
                this.userInfo = data
                this.$router.push({
                    name: "volunteerDetail",
                });
                this.$store.dispatch('baseData/setVolunteer', data)
                sessionStorage.setItem("volunteerData", JSON.stringify(data));
            },
            async init() {

                let res = await userList(this.formData)
                let {total, list} = res.data
                this.tableData.records = list
                this.total = total
            },
            pageChange(item) {
                this.formData.pageNum = item.page_index;
                this.formData.pageSize = item.page_limit;
                this.init()
            },
            //一 ；置支付密码
            isAdmin() {
                this.formData2.setCode=null
                this.formData2.setNew=''
                this.formData2.setWord=''
                console.log(this.formData2.setCode);
                let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
                let InfoData = JSON.parse(sessionStorage.getItem("InfoData"));
                if (InfoData.admin && InfoData.setWalletPwd) {
                    this.dialogVisible = false
                    this.init()
                    return false
                } else {
                    this.$tools.$mes('未设置支付密码，无权限操作，请联系超级管理员', 'warning')
                    this.formData2.instphone = userInfo.instPhone

                    function geTel(tel) {
                        var reg = /^(\d{3})\d{4}(\d{4})$/;
                        return tel.replace(reg, "$1****$2");
                    }

                    if (this.formData2.instphone !== undefined) {
                        this.formData2.instphone = geTel(this.formData2.instphone)
                    }
                    this.dialogVisible = true
                }

            },
            // 二；验证码
            async loginClick(type) {
                let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
                let phone = ''
                let codeType = ''
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

                            vm.disabled2 = true
                            vm.setText = `${vm.count}s秒后重新获取`

                        } else {
                            vm.disabled2 = false
                            vm.setText = '立即获取'
                            clearInterval(vm.timer)
                            vm.timer = null
                        }

                    }, 1000)
                    this.$tools.$mes('短信验证码发送成功', 'success')
                }

            },
            // 三；设置
            async submitForm(formName, type) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let obj = {}
                        if (type === 2) {
                            obj = {
                                code: this.formData2.setCode,
                                newPassword: md5(`${this.formData2.setNew}fanglin`),
                                type: 6,
                            }
                        }
                        return new Promise((resolve, reject) => {
                            resetpassword(obj).then(res => {
                                if (res && res.code === 1000) {
                                    this.$tools.$mes('设置成功', 'success')
                                    setTimeout(()=>{
                                        return new Promise((resolve, reject) => {
                                            instInfo()
                                                .then(res => {
                                                    if (res.code === 1000) {
                                                        const {data} = res;
                                                        sessionStorage.setItem("InfoData", JSON.stringify(data));
                                                        sessionStorage.setItem("token", '123');
                                                        this.isAdmin()
                                                        resolve();
                                                    }
                                                })
                                                .catch(err => reject(err));
                                        })
                                    },500)

                                }
                            }).catch(error => reject(error))
                        })
                    } else {
                        return false;
                    }
                });
            },

        },
        created() {
            this.isAdmin()
            // this.init()
        },
    }
</script>

<style scoped>

</style>
