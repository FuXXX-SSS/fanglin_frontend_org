<template>
    <div>
        <div class="main" v-if="isShow">
            <div class="my-block">
                <div class="sub-title" style="margin-bottom: 40px">
                    <div style="display: inline-block">资产管理</div>
                    <el-button type="primary" size="danger" @click="Godetail()" style="float: right">账单</el-button>
                </div>
                <el-form
                        :inline="true"
                        :model="formData"
                        size="small"
                        class="demo-form-inline"
                >
                    <el-form-item label="钱包地址：">
                        <el-input v-model="formData.walletURL" disabled>
                            <template slot="append">
                                <el-button type="primary"
                                           @click="clip"
                                           class="cobyOrderSn"
                                           data-clipboard-action="copy"
                                           :data-clipboard-text="formData.walletURL"
                                >复 制
                                </el-button>
                            </template>
                        </el-input>

                    </el-form-item>
                    <el-form-item class="options">
                    </el-form-item>
                </el-form>
            </div>
            <div class="my-block">
                <el-table :data="tableData.records" border>
                    <el-table-column prop="assetsUnitName" label="资产名称"/>
                    <el-table-column prop="amount" label="活动资产数量"/>
                    <el-table-column prop="lockAmount" label="锁定资产数量"/>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button
                                    @click="diaLog(scope.row)"
                                    type="text"
                                    size="small"
                            >转账
                            </el-button
                            >
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <DiaLog :dialogVisible="dialogVisible" @diaLog="diaLog" :form="walletURL" />

        </div>
        <div class="detail" v-else>
            <Deatail @Godetail="Godetail"/>
        </div>
    </div>
</template>

<script>
    import Deatail from './instituDetail'
    import Clipboard from 'clipboard';
    import {totalInfo} from '@http/assets'
    import DiaLog from '@com/dia-log'
    export default {
        name: "index",
        data() {
            return {
                isShow: true,
                formData: {pageNum: 1, pageSize: 10,name: 'as5d546asd645asd546d56s4a654sda564'},
                tableData: {records: []},
                pageData: {},
                userInfo: {},
                total: 0,
                dialogVisible: false,
                walletURL: {}
            }
        },
        components: {
            Deatail,
            DiaLog
        },
        methods: {
            Godetail(data) {
                this.isShow = !this.isShow
            },
            async init() {
                let obj = {
                    pageSize: this.formData.pageSize,
                    pageNum: this.formData.pageNum,
                    keyword: this.formData.keyword,
                    type: 0
                }
                let res = await totalInfo(obj)
                let {walletURL} = res.data
                this.tableData.records.push(res.data)
                this.formData.walletURL = res.data.walletURL
            },
            clip() {
                let _this = this;
                let clipboard = new Clipboard('.cobyOrderSn', {
                    text: function () {
                        return _this.formData.name
                    }
                })
                clipboard.on('success', e => {
                    this.$tools.$mes('复制成功', 'success')
                    clipboard.destroy()
                })
                clipboard.on('error', e => {
                    this.$tools.$mes('复制失败', 'error')
                    clipboard.destroy()
                })

            },
            async diaLog() {
                this.dialogVisible = !this.dialogVisible
                console.log(this.dialogVisible);
            },
        },
        created() {
            this.init()
        },

    }
</script>

<style scoped>

</style>