<template>
    <div>
        <div class="main" v-if="isShow">
            <div class="my-block">
                <div class="sub-title" style="margin-bottom: 40px">
                    <div style="display: inline-block">账单管理</div>
                </div>
                <el-form
                        :inline="true"
                        :model="formData"
                        size="small"
                        class="demo-form-inline"
                >
                    <el-form-item label="交易方查询">
                        <el-input v-model="formData.keyword" placeholder="请输入交易方查询"></el-input>
                    </el-form-item>
                    <el-form-item label="时间查询">
                        <el-date-picker
                                v-model="value1"
                                type="daterange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                format="yyyy 年 MM 月 dd 日"
                                value-format="timestamp"
                        >
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="交易类型">
                        <el-select v-model="formData.billType" placeholder="请选择交易类型">
                            <el-option label="直接转账" value=0></el-option>
                            <el-option label="项目" value=1></el-option>
                            <el-option label="活动" value=2></el-option>
                            <el-option label="兑换实物" value=3></el-option>
                            <el-option label="兑换现金" value=4></el-option>
                            <el-option label="发送红包" value=5></el-option>
                            <el-option label="领取红包" value=6></el-option>
                            <el-option label="红包退还" value=7></el-option>
                            <el-option label="项目回赠" value=8></el-option>
                            <el-option label="发布活动,锁定资产" value=9></el-option>
                            <el-option label="现金购物回赠" value=10></el-option>
                            <el-option label="上架物资兑换品,锁定资产" value=11></el-option>
                            <el-option label="下架物资兑换品,解锁资产" value=12></el-option>
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
                <el-table :data="tableData.records" border>
                    <el-table-column type="index" label="序号" width="50"/>

                    <el-table-column prop="created" label="交易时间"/>
                    <el-table-column prop="billType" label="交易类型">
                        <template slot-scope="scope">
                            {{ scope.row.billType===0 ? "直接转账" :
                            scope.row.billType===1 ? "项目" :
                            scope.row.billType===2 ? "活动" :
                            scope.row.billType===3 ? "兑换实物" :
                            scope.row.billType===4 ? "兑换现金" :
                            scope.row.billType == 5? '发送红包':
                            scope.row.billType == 6? '领取红包':
                            scope.row.billType == 7? '红包退还':
                            scope.row.billType == 8? '项目回赠':
                            scope.row.billType == 9? '发布活动，锁定资产':
                            scope.row.billType == 10? '现金购物回赠':
                            scope.row.billType == 11? '上架物资兑换品,锁定资产':
                            scope.row.billType == 12? '下架物资兑换品,解锁资产':
                            ''}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" label="交易方"/>
                    <el-table-column prop="amount" label="交易数量"/>
                    <el-table-column prop="assetsUnitName" label="资产名称"/>
                    <el-table-column prop="notes" label="备注"/>
                </el-table>
                <pagination :total="total" @pageChange="pageChange"/>
            </div>
        </div>
    </div>
</template>

<script>
    import pagination from '@com/el-pagination'
    import {columnList} from '@http/inst'

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
                value1: []

            }
        },
        components: {
            pagination,
        },
        methods: {
            back() {
                this.$router.go(-1)
            },
            async init() {
                if (this.value1.length === 0) {
                    this.formData.beginTime = ''
                    this.formData.endTime = ''
                } else {
                    this.formData.beginTime = this.value1[0]
                    this.formData.endTime = this.value1[1] + 86400000
                }
                let res = await columnList(this.formData)
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
