<template>
    <el-dialog
            :title="diaTitle"
            :visible.sync="dialogVisible"
            width="30%"
            center
    >
        <el-form :model="form" v-if="isSure">
            <el-form-item label="对方账户" :label-width="formLabelWidth">
                <el-input v-model="form.walletURL" autocomplete="off" disabled></el-input>
            </el-form-item>
            <el-form-item label="转账数量" :label-width="formLabelWidth">
                <el-input v-model="form.amount" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" :label-width="formLabelWidth">
                <el-input v-model="form.password" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <span v-else style="text-align: center">您已经成功向“XXXX”转账22222白云分</span>
        <span slot="footer" class="dialog-footer">
                <el-button @click="Cancel" type="info">取 消</el-button>
                <el-button type="primary" @click="Sure()">确 定</el-button>
            </span>
    </el-dialog>

</template>

<script>
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
            }
        },
        methods: {
            Sure() {
                let type = ''
                this.isSure = !this.isSure
                this.isSure ? this.diaTitle = '对方钱包' : this.diaTitle = '转账成功'
                this.isSure ? type = 0 : type = 1
                this.$emit('Sure', this.form, type)
            },
            Cancel() {
                this.$emit('diaLog')
            }
        }
    }
</script>

<style scoped lang="less">

</style>