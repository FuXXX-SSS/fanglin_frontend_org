<template>
    <div>
        <div class="my-block">
            <div class="sub-title">资产管理</div>
            <el-row :gutter="20">

                <el-col :span="24" class="el-right">
                    <el-form
                            :inline="true"
                            :model="formData"
                            size="small"
                            class="demo-form-inline"
                    >
                        <el-form-item label="付款方">
                            <el-select v-model="formData.accType">
                                <el-option label="开启" value="1"></el-option>
                                <el-option label="关闭" value="2"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="汇率 : ">
                            <el-input v-model="formData.input" placeholder="请输入关键字"></el-input>
                        </el-form-item>

                        <el-form-item class="options">
                            <el-button @click="formData = {}
            " size="medium">重 置
                            </el-button>
                            <el-button type="primary" size="medium">查 询</el-button>
                        </el-form-item>
                    </el-form>

                </el-col>
            </el-row>
        </div>
        <div class="my-block">
            <div class="total">
                <div class="left">
                    <p>资产总额  :</p>
                    <p>20000</p>
                    <p>元</p>
                </div>
                <div class="right">
                    <p>钱包地址  :</p>
                    <p>{{text}}</p>
                    <p type="primary"
                       @click="clip"
                       class="cobyOrderSn"
                       data-clipboard-action="copy"
                       :data-clipboard-text="text"
                    >复 制</p>
                </div>
                <el-button type="primary" size="medium" style="float: right" @click="index">汇率设置</el-button>
            </div>
            <el-table :data="tableData.records" border>
                <el-table-column type="index" label="序号" width="50"/>
                <el-table-column prop="name" label="订单号"/>
                <el-table-column prop="date" label="交易时间"/>
                <el-table-column prop="address" label="支出方"/>
                <el-table-column prop="name" label="收入方"/>
                <el-table-column prop="name" label="支付金额"/>
                <el-table-column prop="name" label="交易类型"/>
            </el-table>
            <pagination/>
        </div>
    </div>
</template>

<script>
    import detailBottom from '@com/detailBottom'
    import Clipboard from 'clipboard';

    export default {
        name: "teamDetail",
        data() {
            return {
                formData: {},
                text: "123123123",
                tableData: {
                    records: [
                        {
                            date: '2016-05-02',
                            name: '王小虎',
                            address: '上海市普陀区金沙江路 1518 弄'
                        }, {
                            date: '2016-05-04',
                            name: '王小虎',
                            address: '上海市普陀区金沙江路 1517 弄'
                        }, {
                            date: '2016-05-01',
                            name: '王小虎',
                            address: '上海市普陀区金沙江路 1519 弄'
                        },]
                }

            }
        },
        components: {
        },
        methods: {
            clip() {
                let _this = this;
                let clipboard = new Clipboard('.cobyOrderSn', {
                    text: function () {
                        return _this.text
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
            index(){
                this.$store.dispatch('mecha_asset/setAsset',2)
            }
        }
    }
</script>

<style scoped lang="less">
    .el-form-item {
        margin-right: 30px;
    }

    .find {
        display: inline-block;
        margin: 0;
        line-height: 28px;
        font-size: 14px;
        color: #606266;
        margin-left: 10px;
    }

    .total {
        p {
            display: inline-block;
            margin-right: 20px;
        }

        .left, .right {
            float: left;
        }
        .left{
            p{
                &:nth-child(2){
                    font-weight: bold;
                    font-size: 16px;
                }
            }
        }

        .right {
            margin-left: 50px;
            p{
                &:nth-child(2){
                    font-weight: bold;
                    font-size: 16px;
                }
            }
        }
    }
    .cobyOrderSn{
        color: #5daf34;
        cursor: pointer;
    }
</style>