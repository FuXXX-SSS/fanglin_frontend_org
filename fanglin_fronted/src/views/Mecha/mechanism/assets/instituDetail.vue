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
                    <el-form-item label="关键字查询">
                        <el-input v-model="formData.keyword" placeholder="请输入关键字查询"></el-input>
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
                            <el-option label="直接转账" value=1></el-option>
                            <el-option label="项目" value=0></el-option>
                            <el-option label="活动" value=1></el-option>
                            <el-option label="兑换实物" value=2></el-option>
                            <el-option label="兑换现金" value=3></el-option>
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
                    <el-table-column prop="created" label="交易时间"/>
                    <el-table-column prop="billType" label="交易类型">
                    <template slot-scope="scope">
                        {{ scope.row.billType===0 ? "直接转账" :
                           scope.row.billType===1 ? "项目" :
                           scope.row.billType===2 ? "活动" :
                           scope.row.billType===3 ? "兑换实物" :
                           scope.row.billType===4 ? "兑换现金" : ''}}
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
                this.$emit('Godetail')
            },
            async init() {
                if (this.value1.length === 0 ) {
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