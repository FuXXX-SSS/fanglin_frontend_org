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
                    </el-form-item><el-form-item label="性别">
                    <el-input v-model="formData.keyword2" placeholder="性别"></el-input>
                </el-form-item><el-form-item label="手机号">
                    <el-input v-model="formData.keyword3" placeholder="手机号"></el-input>
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
                    <el-table-column prop="name" label="用户头像">
                        <template slot-scope="scope">
                            <img :src="scope.row.avatar" min-width="70" height="70"/>
                        </template>
                    </el-table-column>
                    <el-table-column prop="nickname" label="昵称"/>
                    <el-table-column prop="gender" label="性别">
                        <template slot-scope="scope">
                            {{ scope.row.gender === 1 ? "男" : scope.row.gender == 2 ? '女':'未知' }}
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
    </div>
</template>

<script>
    import pagination from '@com/el-pagination'
    import Deatail from './teamDetail'
    import {userList} from '@http/user'

    export default {
        name: "index",
        data() {
            return {
                isShow: true,
                formData: {pageNum: 1, pageSize: 10},
                tableData: {records: []},
                pageData: {},
                userInfo: {},
                total: 0,

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
            },
            async init() {
                let obj = {
                    pageSize: this.formData.pageSize,
                    pageNum: this.formData.pageNum,
                    keyword: this.formData.keyword,
                    type:1
                }
                let res = await userList(obj)
                let {total, list} = res.data
                this.tableData.records = list
                this.total = total
            },
            pageChange(item) {
                this.formData.pageNum = item.page_index;
                this.formData.pageSize = item.page_limit;
                this.init()
            },

        },
        created() {
            this.init()
        }
    }
</script>

<style scoped>

</style>