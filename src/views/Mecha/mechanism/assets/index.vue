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
                    <el-table-column type="index" label="序号" width="50"/>

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
            <DiaLog :dialogVisible="dialogVisible"
                    @diaLog="diaLog"
                    :form="walletURL"
                    @Sure="Sure(arguments)"
                    :Isdisabled="false"
                    :info="info"/>

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
    import md5 from 'js-md5'
    import {walletURL, commonTrade} from '@http/common'
    import {instDetail} from '@http/inst'

    export default {
        name: "index",
        data() {
            return {
                isShow: true,
                formData: {pageNum: 1, pageSize: 10, name: 'as5d546asd645asd546d56s4a654sda564'},
                tableData: {records: []},
                pageData: {},
                userInfo: {},
                total: 0,
                dialogVisible: false,
                info: '',
                walletURL: {
                    walletURL:'',
                    amount:'',
                    password:'',
                }
            }
        },
        components: {
            Deatail,
            DiaLog
        },
        methods: {
            Godetail(data) {
                this.isShow = !this.isShow
                this.$router.push({
                    name: "instituDetail",
                });
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
                        return _this.formData.walletURL
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
            async diaLog(data) {
                this.dialogVisible = !this.dialogVisible

            },
            async Sure(msg) {
                if (msg[1] === 1) {
                    let res = await instDetail(JSON.parse(sessionStorage.getItem("userInfo")).instId)
                    let obj = {
                        amount: msg[0].amount,
                        billType: 0,
                        password: md5(msg[0].password + "fanglin"),
                        receiveType: 0,
                        receiveWalletUrl: msg[0].walletURL,
                    }
                    let res2 = await commonTrade(obj)
                    if (res2 && res.code === 1000) {
                        let assetsUnitName = JSON.parse(
                            sessionStorage.getItem("userInfo")
                        ).assetsUnitName;
                        this.info = assetsUnitName
                    }
                }
            },
        },
        created() {
            this.init()
        },

    }
</script>

<style scoped>

</style>
