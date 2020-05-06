<template>
    <div>
        <div class="main" v-if="isShow">
            <div class="my-block">
                <div class="sub-title">加入申请列表</div>
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
                        <el-input v-model="formData.phone" placeholder="手机号" onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')"></el-input>
                    </el-form-item>
                    <el-form-item label="认证">
                        <el-select v-model="formData.cert">
                            <el-option label="是" value="true"></el-option>
                            <el-option label="否" value="false"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item class="options">
                        <el-button @click="formData = {pageNum: 1, pageSize: 10,type:0},init()" size="medium">重 置
                        </el-button>
                        <el-button type="primary" size="medium" @click="init()">查 询</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="my-block">
                <el-table :data="tableData.records" border>
                    <el-table-column type="index" label="序号" width="50"/>

                    <el-table-column prop="joinTime" label="申请时间"/>
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
                    <el-table-column prop="cert" label="是否认证">
                        <template slot-scope="scope">
                            {{ scope.row.cert ? "是" :'否' }}
                        </template>
                    </el-table-column>
                    <el-table-column label="擅长" prop="serviceCategories">
                        <template slot-scope="scope">
                            <div v-if="scope.row.serviceCategories!==null" style="display: inline-block">
                                <div v-for="(item,index) in scope.row.serviceCategories" :key="index+1"
                                     style="display: inline-block;margin-right: 10px">
                                    {{item.name}}
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="serviceDuration" label="服务时长"/>
                    <el-table-column prop="serviceTime" label="服务次数"/>
                    <el-table-column prop="score" label="评分"/>
                    <el-table-column prop="userStatus" label="状态" width="150px">
                        <template slot-scope="scope">
                            {{ scope.row.userStatus===1 ? "开通" :'关闭' }}
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button
                                    @click="check(scope.row,1)"
                                    type="text"
                                    size="small"
                            >同意
                            </el-button
                            >
                            <el-button
                                    @click="check(scope.row,2)"
                                    type="text"
                                    size="small"
                            >拒绝
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
    import {userList, userCheckGet} from '@http/user'

    export default {
        name: "index",
        data() {
            return {
                isShow: true,
                formData: {pageNum: 1, pageSize: 10,type:0},
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
            async check(data, type) {
                let obj = {
                    userId: data.userId,
                    checkStatus: type
                }
                let res = await userCheckGet(obj)
                console.log(res);
                if (res && res.code === 1000) {
                    this.$tools.$mes('操作成功', 'success')
                    this.init()
                }
            }
        },
        created() {
            this.init()
        }
    }
</script>

<style scoped>

</style>
