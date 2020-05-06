<template>
    <el-dialog
            :title="title"
            :visible.sync="dialogVisible"
            width="30%"
            center
    >
        <el-form :model="form" v-if="isSure">
            <el-form-item label="对方钱包" :label-width="formLabelWidth">
                <el-input v-model="form.walletURL" autocomplete="off" ></el-input>
            </el-form-item>
            <el-form-item label="转账数量" :label-width="formLabelWidth">
                <el-input v-model.number="form.amount" autocomplete="off" onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')">
                    <template slot="append">{{assetsUnitName}}</template>
                </el-input>
            </el-form-item>
            <el-form-item label="钱包密码" :label-width="formLabelWidth">
                <el-input v-model="form.password" autocomplete="off" type="password" placeholder="输入钱包密码">
                </el-input>
            </el-form-item>
        </el-form>
        <span v-if="!isSure" style="text-align: center">您已经成功向{{info}}转账{{form.amount}}{{assetsUnitName}}</span>
        <span slot="footer" class="dialog-footer" v-if="isSure">
                <el-button @click="Cancel" type="info">取 消</el-button>
                <el-button type="primary" @click="Sure()">确 定</el-button>
         </span>
        <span slot="footer" class="dialog-footer" v-if="!isSure">
                <el-button @click="Cancel" type="info">取 消</el-button>
                <el-button type="primary" @click="Sure2()">确 定</el-button>
         </span>
    </el-dialog>

</template>

<script>
    import md5 from 'js-md5'
    import {commonTrade} from '@http/common'

    export default {
        props: {
            dialogVisible: {
                type: Boolean
            },
            form: {
                type: Object
            },
            Isdisabled: {
                type: Boolean,
                default: true
            },
            title: {
                type: String,
                default: '转账'
            }
        },
        name: "index",
        data() {
            return {
                formLabelWidth: '120px',
                diaTitle: '对方钱包',
                isSure: true,
                info: '',
                assetsUnitName:''
            }
        },
        methods: {
            async Sure() {
                let obj = {
                    amount: this.form.amount,
                    billType: 0,
                    password: md5(this.form.password + "fanglin"),
                    receiveType: this.form.type,
                    receiveWalletUrl: this.form.walletURL,
                }
                let res2 = await commonTrade(obj)
                if (res2 && res2.code === 1000) {
                    let userName = JSON.parse(
                        sessionStorage.getItem("userInfo")
                    ).userName;
                    this.info = res2.data.name
                    this.isSure = false
                    this.isSure ? this.diaTitle = '对方钱包' : this.diaTitle = '转账成功'
                }
            },
            Sure2() {
                this.isSure = !this.isSuccess
                this.dialogVisible = false
            },
            Cancel() {
                this.$emit('diaLog')
            },
        },
        created() {
            this.assetsUnitName = JSON.parse(sessionStorage.getItem("userInfo")).assetsUnitName
        }
    }
</script>

<style scoped lang="less">

</style>
