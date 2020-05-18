<template>
    <div>
        <div class="main">
            <div class="my-block">
                <div class="sub-title">实物兑换列表</div>
                <el-form
                        :inline="true"
                        :model="formData"
                        size="small"
                        class="demo-form-inline"
                >
                    <el-form-item label="实物名称">
                        <el-input v-model="formData.goodsName" placeholder="实物名称"></el-input>
                    </el-form-item>
                    <el-form-item label="收货人">
                        <el-input v-model="formData.receiverName" placeholder="收货人"></el-input>
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
                <el-table :data="tableData.records" border>
                    <el-table-column type="index" label="序号" width="50"/>
                    <el-table-column prop="billDate" label="申请时间"/>
                    <el-table-column prop="exhUserName" label="兑换人"/>
                    <el-table-column prop="exhGoodsName" label="实物名称"/>
                    <el-table-column prop="billNumber" label="兑换数量"/>
                    <el-table-column prop="amount" label="支付"/>
                    <el-table-column prop="receiverName" label="收货人"/>
                    <el-table-column prop="receiverPhone" label="联系电话"/>
                    <el-table-column prop="receiverAddr" label="收货地址"/>
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
                    <el-table-column label="操作">
                        <template slot-scope="scope" v-if="scope.row.billStatus===1">
                            <el-button
                                    @click="Godetail(scope.row)"
                                    type="text"
                                    size="small"
                            >发货
                            </el-button
                            >
                        </template>
                    </el-table-column>

                </el-table>
                <pagination :total="total" @pageChange="pageChange"/>
            </div>
        </div>
        <el-dialog
                title="兑换实物"
                :visible.sync="dialogVisible"
                width="28%"
        >
            <el-form :inline="true"
                     :model="formData"
                     size="small"
                     class="demo-form-inline"
                     label-width="90px"
            >
                <el-form-item label="商品名称：">
                    {{sendObj.exhGoodsName}}
                </el-form-item>
                <el-form-item label="入库数量：">
                    {{sendObj.totalStock}}{{sendObj.unit}}
                </el-form-item>
                <el-form-item label="当前库存：">
                    {{sendObj.stock}}{{sendObj.unit}}
                </el-form-item>
                <br>
                <el-form-item label="兑换人：">
                    {{sendObj.exhUserName}}
                </el-form-item>
                <el-form-item label="收货人：">
                    {{sendObj.receiverName}}
                </el-form-item>
                <el-form-item label="联系电话：">
                    {{sendObj.receiverPhone}}
                </el-form-item>
                <br>

                <el-form-item label="支付：">
                    {{sendObj.amount}}{{sendObj.unit}}
                </el-form-item>
                <el-form-item label="兑换数量：">
                    {{sendObj.billNumber}}{{sendObj.unit}}
                </el-form-item>
                <br>
                <el-form-item label="收获地址：">
                    {{sendObj.receiverAddr}}
                </el-form-item>
                <br>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible=false" type="info">取 消</el-button>
                <el-button type="primary" @click="shipBild">发 货</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
    import pagination from '@com/el-pagination'
    import {goodsList, ship} from '@http/order'


    export default {
        name: "index",
        data() {
            return {
                isShow: true,
                dialogVisible: false,
                formData: {pageNum: 1, pageSize: 10},
                total: 0,
                tableData: {
                    records: []
                },
                pageData: {},
                userInfo: {},
                sendObj: {}


            }
        },
        components: {
            pagination,
        },
        methods: {
            Godetail(data) {
                this.dialogVisible = true
                this.sendObj = data

            },
            async shipBild() {
                let obj = `${this.sendObj.billId}`
                let res = await ship(obj)
                if (res && res.code === 1000) {
                    this.dialogVisible = false
                    this.$tools.$mes('发货成功', 'success')
                    this.init()
                }
            },
            async init() {

                let res = await goodsList(this.formData)
                let {total, pageNum, pageSize, list} = res.data
                this.tableData.records = list
                this.total = total
                if (res.data.list !== null) {
                    this.tableData.records.forEach(item => {
                        item.userStatus === 1 ? item.userStatus = true : item.userStatus = false
                    })
                }

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
