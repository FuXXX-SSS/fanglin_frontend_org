<template>
    <el-dialog
            :title="diaTitle"
            :visible.sync="dialogVisible"
            width="30%"
            center
    >
        <el-form :model="form" v-if="isSure">
            <el-form-item label="对方钱包" :label-width="formLabelWidth">
                <el-input v-model="form.walletURL" autocomplete="off" disabled></el-input>
            </el-form-item>
            <el-form-item label="转账数量" :label-width="formLabelWidth">
                <el-input v-model="form.amount" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" :label-width="formLabelWidth">
                <el-input v-model="form.password" autocomplete="off" type="password"></el-input>
            </el-form-item>
        </el-form>
        <span v-if="!isSure" style="text-align: center">您已经成功向{{info}}转账{{form.amount}}白云分</span>
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

        },
        name: "index",
        data() {
            return {
                formLabelWidth: '120px',
                diaTitle: '对方钱包',
                isSure: true,
                info:'',
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
                    let assetsUnitName = JSON.parse(
                        sessionStorage.getItem("userInfo")
                    ).assetsUnitName;
                    this.info = assetsUnitName
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
            }
        }
    }
</script>

<style scoped lang="less">

</style>