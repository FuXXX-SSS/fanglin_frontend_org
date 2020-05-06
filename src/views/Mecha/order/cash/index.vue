<template>
    <div>
        <div class="main" v-if="isShow">
            <div class="my-block">
                <div class="sub-title">现金兑换订单列表</div>
                <el-form
                        :inline="true"
                        :model="formData"
                        size="small"
                        class="demo-form-inline"
                >  <el-form-item label="资金名称">
                    <el-input v-model="formData.goodsName" placeholder="资金名称"></el-input>
                </el-form-item>
                    <el-form-item label="兑换人">
                        <el-input v-model="formData.exhName" placeholder="兑换人"></el-input>
                    </el-form-item>
                    <el-form-item label="电话">
                        <el-input v-model="formData.phone" placeholder="电话" onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')"></el-input>
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
                            <el-option label="未支付" value="0"></el-option>
                            <el-option label="待发货" value="1"></el-option>
                            <el-option label="已发货" value="2"></el-option>
                            <el-option label="完成" value="3"></el-option>
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
                    <el-table-column type="index" label="序号" width="50"/>

                    <el-table-column prop="billDate" label="申请时间"/>
                    <el-table-column prop="cashName" label="资金名称"/>
                    <el-table-column prop="exhUserName" label="兑换人"/>
                    <el-table-column prop="name" label="联系电话"/>
                    <el-table-column prop="amount" label="支付"/>
                    <el-table-column prop="amount" label="兑换金额"/>
                    <el-table-column prop="receiverAccount" label="收款账户"/>
                    <el-table-column prop="billStatus" label="状态">
                        <template slot-scope="scope">
                            {{
                            scope.row.billStatus === 0 ? '未支付':
                            scope.row.billStatus === 1 ? '待发货':
                            scope.row.billStatus === 2 ? '已发货':
                            scope.row.billStatus === 3 ? '完成':
                            '未知' }}
                        </template>
                    </el-table-column>
                    <!--                    <el-table-column label="操作">-->
                    <!--                        <template slot-scope="scope">-->
                    <!--                            <el-button-->
                    <!--                                    @click="Godetail(scope.row)"-->
                    <!--                                    type="text"-->
                    <!--                                    size="small"-->
                    <!--                            >发货-->
                    <!--                            </el-button-->
                    <!--                            >-->
                    <!--                        </template>-->
                    <!--                    </el-table-column>-->
                </el-table>
                <pagination :total="total" @pageChange="pageChange"/>
            </div>
        </div>
<!--        <el-dialog-->
<!--                title="兑换实物"-->
<!--                :visible.sync="dialogVisible"-->
<!--                width="35%"-->
<!--        >-->
<!--            <el-form :inline="true"-->
<!--                     :model="formData"-->
<!--                     size="small"-->
<!--                     class="demo-form-inline"-->
<!--                     label-position="left"-->
<!--            >-->
<!--                <el-form-item label="商品名称：" :label-width="formLabelWidth">-->
<!--                    <div>商品商品商品商</div>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="入库数量：" :label-width="formLabelWidth">-->
<!--                    <div>商品商品商</div>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="当前库存：" :label-width="formLabelWidth">-->
<!--                    <div>商品商品品</div>-->
<!--                </el-form-item>-->
<!--                <br>-->
<!--                <el-form-item label="兑换人：" :label-width="formLabelWidth">-->
<!--                    <div>商品商品商商品</div>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="收货人：" :label-width="formLabelWidth">-->
<!--                    <div>商品商品商品</div>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="联系电话：" :label-width="formLabelWidth">-->
<!--                    <div>商品商品商品</div>-->
<!--                </el-form-item>-->
<!--                <br>-->

<!--                <el-form-item label="支付：" :label-width="formLabelWidth">-->
<!--                    <div>商品商品商品</div>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="兑换数量：" :label-width="formLabelWidth">-->
<!--                    <div>商品商品商品</div>-->
<!--                </el-form-item>-->
<!--                <br>-->
<!--                <el-form-item label="收获地址：" :label-width="formLabelWidth">-->
<!--                    <div>商品商品</div>-->
<!--                </el-form-item>-->
<!--                <br>-->
<!--            </el-form>-->
<!--            <span slot="footer" class="dialog-footer">-->
<!--                <el-button @click="dialogVisible=false" type="info">取 消</el-button>-->
<!--                <el-button type="primary" @click="dialogVisible=false">发 货</el-button>-->
<!--            </span>-->
<!--        </el-dialog>-->

    </div>
</template>

<script>
    import pagination from '@com/el-pagination'
    import {cashList, totalAmountList} from '@http/order'

    export default {
        name: "index",
        data() {
            return {
                isShow: true,
                dialogVisible: false, formData: {pageNum: 1, pageSize: 10},
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
                this.dialogVisible = true
            },
            async init() {
                let res = await cashList(this.formData)
                let {total, pageNum, pageSize, list} = res.data
                this.tableData.records = list
                this.total = total
                if (res.data.list !== null) {
                    this.tableData.records.forEach(item => {
                        item.userStatus === 1 ? item.userStatus = true : item.userStatus = false
                    })
                }
            },
            async totalAmountList() {
                let res = await totalAmountList(1)
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

    .el-dialog__wrapper /deep/ .el-dialog__footer {
        text-align: center;
    }

    .el-dialog__wrapper /deep/ .el-dialog__header {
        text-align: center;
    }
</style>
