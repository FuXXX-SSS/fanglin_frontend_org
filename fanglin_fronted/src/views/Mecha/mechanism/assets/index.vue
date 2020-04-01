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
                        <el-input v-model="formData.name" disabled>
                            <template slot="append">
                                <el-button type="primary"
                                           @click="clip"
                                           class="cobyOrderSn"
                                           data-clipboard-action="copy"
                                           :data-clipboard-text="formData.name"
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
                    <el-table-column prop="name" label="资产名称"/>
                    <el-table-column prop="date" label="活动资产数量"/>
                    <el-table-column prop="address" label="锁定资产数量"/>
                    <el-table-column label="操作">
                        <template>
                            <el-button

                                    type="text"
                                    size="small"
                            >转账
                            </el-button
                            >
                        </template>
                    </el-table-column>
                </el-table>
                <pagination/>
            </div>
        </div>
        <div class="detail" v-else>
            <Deatail @Godetail="Godetail"/>
        </div>
    </div>
</template>

<script>
    import pagination from '@com/el-pagination'
    import Deatail from './instituDetail'
    import Clipboard from 'clipboard';

    export default {
        name: "index",
        data() {
            return {
                isShow: true,
                formData: {
                    name: 'as5d546asd645asd546d56s4a654sda564'
                },
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
                        }, {
                            date: '2016-05-03',
                            name: '王小虎',
                            address: '上海市普陀区金沙江路 1516 弄'
                        }]
                }
            }
        },
        components: {
            pagination,
            Deatail
        },
        methods: {
            Godetail(data) {
                this.isShow = !this.isShow
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

            }
        }
    }
</script>

<style scoped>

</style>