<template>
    <div>
        <div class="main" v-if="isShow">
            <div class="my-block">
                <div class="sub-title">项目资助订单列表</div>
                <el-form
                        :inline="true"
                        :model="formData"
                        size="small"
                        class="demo-form-inline"
                >
                    <el-form-item label="发布人">
                        <el-input v-model="formData.instName" placeholder="发布人"></el-input>
                    </el-form-item>
                    <el-form-item label="项目名称">
                        <el-input v-model="formData.projectName" placeholder="项目名称"></el-input>
                    </el-form-item>
                    <el-form-item label="起始时间">
                        <el-date-picker
                                v-model="formData.queryBeginTime"
                                type="date"
                                value-format="timestamp"
                                placeholder="选择日期"
                        >
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="状态">
                        <el-select v-model="formData.billStatus">
                            <el-option label="未支付" value="3"></el-option>
                            <el-option label="完成" value="4"></el-option>
                            <el-option label="已支付" value="5"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item class="options">
                        <el-button @click="formData = {pageNum: 1, pageSize: 10},init()" size="medium">重 置
                        </el-button>
                        <el-button type="primary" size="medium" @click="init()">查 询</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="my-block">
                <div class="total">
                    <p>成交总额</p>
                    <p>{{totalAmount}}</p>
                    <p>元</p>
                </div>
                <el-table :data="tableData.records" border>
                    <el-table-column prop="billDate" label="订单时间"/>
                    <el-table-column prop="projectName" label="项目名称"/>
                    <el-table-column prop="address" label="发布方"/>
                    <el-table-column prop="sponsorName" label="资助人"/>
                    <el-table-column prop="refundStd" label="回馈标准"/>
                    <el-table-column prop="payAmount" label="支付金额"/>
                    <el-table-column prop="name" label="回馈价值"/>
                    <el-table-column prop="billStatus" label="状态">
                        <template slot-scope="scope">
                            {{ scope.row.billStatus === 3 ? "未支付" :
                            scope.row.billStatus === 4 ? '完成':
                            scope.row.billStatus === 5 ? '已支付':
                            '未知' }}
                        </template>
                    </el-table-column>
                </el-table>
                <pagination :total="total" @pageChange="pageChange"/>
            </div>
        </div>
    </div>
</template>

<script>
    import pagination from '@com/el-pagination'
    import {projectList, totalAmountList} from '@http/order'

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
                totalAmount: '',
                userInfo: {}

            }
        },
        components: {
            pagination,
        },
        methods: {
            Godetail(data) {
                console.log(123);
            },
            async init() {

                let res = await projectList(this.formData)
                let {total, pageNum, pageSize, list} = res.data
                this.tableData.records = list
                if (res.data.list!== null) {
                    this.total = total
                    this.tableData.records.forEach(item => {
                        item.userStatus === 1 ? item.userStatus = true : item.userStatus = false
                    })
                }
            },
            async totalAmountList() {
                let res = await totalAmountList(0)
                let {totalAmount} = res.data
                this.totalAmount = totalAmount
            },
            pageChange(item) {
                this.formData.pageNum = item.page_index;
                this.formData.pageSize = item.page_limit;
                this.init()
            },
        },
        created() {
            this.init()
            this.totalAmountList()
        }
    }
</script>

<style scoped lang="less">
    .total {
        p {
            display: inline-block;
            margin-right: 20px;

            &:nth-child(2) {
                color: red;
                font-weight: bold;
                font-size: 25px;
            }
        }
    }
</style>