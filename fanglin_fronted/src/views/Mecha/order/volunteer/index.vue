<template>
    <div>
        <div class="main" v-if="isShow">
            <div class="my-block">
                <div class="sub-title">订单列表</div>
                <el-form
                        :inline="true"
                        :model="formData"
                        size="small"
                        class="demo-form-inline"
                >
                    <el-form-item label="服务编号">
                        <el-input v-model="formData.name" placeholder="服务编号"></el-input>
                    </el-form-item>
                    <el-form-item label="服务时间">
                        <el-date-picker
                                v-model="formData.value2"
                                type="date"
                                placeholder="选择日期"
                        >
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="状态">
                        <el-select v-model="formData.accType">
                            <el-option label="开启" value="1"></el-option>
                            <el-option label="关闭" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item class="options">
                        <el-button @click="formData = {}
            " size="medium">重 置
                        </el-button>
                        <el-button type="primary" size="medium">查 询</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="my-block">
                <el-table :data="tableData.records" border>
                    <el-table-column prop="serviceNo" label="服务编号"/>
                    <el-table-column prop="activityName" label="活动名称"/>
                    <el-table-column prop="beginTime" label="开始时间"/>
                    <el-table-column prop="duration" label="时长"/>
                    <el-table-column prop="value" label="价值"/>
                    <el-table-column prop="publishName" label="发布方"/>
                    <el-table-column prop="serviceName" label="服务方"/>
                    <el-table-column prop="serviceStatus" label="状态">
                        <template slot-scope="scope">
                            {{ scope.row.serviceStatus === 0 ? "未完成" :
                            scope.row.serviceStatus === 1 ? '已完成':
                            scope.row.serviceStatus === 2 ? '已结算':
                            scope.row.serviceStatus === 3 ? '争议':
                            '未知' }}
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button
                                    @click="Godetail(scope.row)"
                                    type="text"
                                    size="small"
                            >详情
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
    import {serviceList} from '@http/order'

    export default {
        name: "index",
        data() {
            return {
                isShow: true,
                formData: {pageNum: 1, pageSize: 10},
                total: 0,
                tableData: {
                    records: []
                },
                pageData: {},
                userInfo: {}
            }
        },
        components: {
            pagination,
            Deatail
        },
        methods: {
            Godetail(data) {
                this.userInfo = data
                this.isShow = !this.isShow
            },
            async init() {
                let obj = {
                    pageSize: this.formData.pageSize,
                    pageNum: this.formData.pageNum,
                    cert: true,
                }
                let res = await serviceList(obj)
                let {total, pageNum, pageSize, list} = res.data
                this.tableData.records = list
                this.total = total

                this.tableData.records.forEach(item => {
                    item.userStatus === 1 ? item.userStatus = true : item.userStatus = false
                })
                console.log(this.tableData.records);
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