<template>
    <div class="service">
        <div class="main" v-if="isShow">
            <div class="my-block block_bot">
                <div class="sub-title" style="margin-bottom: 40px">
                    <div style="display: inline-block">账户管理</div>
                    <el-button type="danger" style="float: right" @click="add">新增</el-button>
                </div>
            </div>
            <div class="my-block">
                <el-table :data="tableData.records" border>
                    <el-table-column type="index" label="序号" width="50"/>

                    <el-table-column prop="account" label="用户名"/>
                    <el-table-column prop="name" label="名字"/>
                    <el-table-column prop="phone" label="联系电话"/>
                    <el-table-column prop="privilegeVOList" label="权限">
                        <template slot-scope="scope">
                            <div v-if="scope.row.privilegeVOList!==null" style="display: inline-block">
                                <div v-for="(item,index) in scope.row.privilegeVOList" :key="index+1"
                                     style="display: inline-block;margin-right: 10px">
                                    {{item.name}}
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
                <pagination :total="total" @pageChange="pageChange"/>
            </div>
        </div>

        <div class="my-block" v-else>
            <div class="sub-title">新增账户</div>
            <el-form
                    :model="ruleForm"
                    status-icon
                    :rules="rules"
                    ref="ruleForm"
                    :inline="true"
                    size="small"
                    class="demo-form-inline"
                    label-position="left"
                    label-width="80px"
            >
                <el-form-item label="账户名称" prop="account">
                    <el-input v-model="ruleForm.account" placeholder="请输入账户名称"></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="ruleForm.name" placeholder="请输入姓名"></el-input>
                </el-form-item>
                <br>
                <el-form-item label="密码" prop="pass">
                    <el-input type="password" v-model="ruleForm.pass" autocomplete="off" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="password">
                    <el-input type="password" v-model="ruleForm.password" autocomplete="off"
                              placeholder="请确认密码"></el-input>
                </el-form-item>
                <br>
                <el-form-item label="联系方式">
                    <el-input v-model="ruleForm.phone" placeholder="请输入联系方式"></el-input>
                </el-form-item>
                <br>

                <el-form-item label="权限">
                    <div v-for="(item,index) in cities" :key="index">
                        <el-form-item :label="ruleForm.labelName">
                            <el-checkbox-group
                                    v-model="ruleForm.privilegeIdList"
                                    @change="Change"
                            >
                                <el-checkbox
                                        v-for="city in item.privilegeItems"
                                        :label="city.id"
                                        :key="city.id">
                                    {{city.privilegeName}}
                                </el-checkbox>
                            </el-checkbox-group>

                        </el-form-item>
                    </div>

                </el-form-item>
            </el-form>
            <el-row type="flex" class="row-bg" justify="center" style="padding-bottom: 20px">
                <el-col :span="3">
                    <el-button @click="submitForm('ruleForm')" size="medium" type="danger">保存
                    </el-button>
                </el-col>
                <el-col :span="3">
                    <el-button type="info" size="medium" @click="isShow=true">取消</el-button>

                </el-col>
            </el-row>

        </div>
    </div>
</template>

<script>
    import pagination from '@com/el-pagination'
    import {managerUserList, privilege, managerUserAdd} from '@http/managerUser'
    import md5 from 'js-md5'

    export default {
        name: "index",
        data() {
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.ruleForm.pass !== '') {
                        this.$refs.ruleForm.validateField('password');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                console.log(value);
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                isShow: true,
                ruleForm: {
                    account: '',
                    name: '',
                    password: '',
                    privilegeIdList: [],
                    phone: ''
                },
                checkedCities: [],
                cities: [],
                tableData: {
                    records: []
                },
                rules: {
                    pass: [
                        {validator: validatePass, trigger: 'blur', required: true,}
                    ],
                    password: [
                        {validator: validatePass2, trigger: 'blur', required: true,}
                    ],
                    account: {
                        trigger: "blur",
                        required: true,
                        message: "账户名称不能为空"
                    },
                    name: {
                        trigger: "blur",
                        required: true,
                        message: "姓名不能为空"
                    },
                },
                total: 0,
                formData: {
                    pageNum: 1, pageSize: 10
                },
            }
        },
        methods: {

            Change(value) {
                let checkedCount = value.length;
            },
            pageChange(item) {
                this.formData.pageNum = item.page_index;
                this.formData.pageSize = item.page_limit;
                this.init()
            },
            async init() {
                let res = await managerUserList(this.formData)
                console.log(res.data);
                let {total, list} = res.data
                if (res && res.data !== null) {
                    this.tableData.records = list
                    this.total = total
                }
            },
            async add() {
                let res = await privilege()
                this.cities = res.data
                this.isShow = !this.isShow
            },
            async submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.ruleForm.password = md5(this.ruleForm.password + "fanglin")
                        return new Promise((resolve, reject) => {
                            managerUserAdd(this.ruleForm)
                                .then(res => {
                                    if (res.code === 1000) {
                                        this.$tools.$mes('新增用户成功', 'success')
                                        this.isShow=true
                                        this.init()
                                    } else {
                                        this.$tools.$mes(res.data.msg, 'error')
                                    }
                                })
                                .catch(err => reject(err));
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
        },
        components: {
            pagination,
        },
        created() {
            this.init()
        }
    }
</script>

<style scoped>
    .el-col-12 {
    }
</style>
