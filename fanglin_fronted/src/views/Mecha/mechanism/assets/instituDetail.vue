<template>
    <div>
        <div class="main" v-if="isShow">
            <div class="my-block">
                <el-form
                        :inline="true"
                        :model="formData"
                        size="small"
                        class="demo-form-inline"
                >
                    <el-form-item label="关键字查询">
                        <el-input v-model="formData.name" placeholder="请输入关键字查询"></el-input>
                    </el-form-item>
                    <el-form-item label="时间查询">
                        <el-date-picker
                                v-model="formData.value2"
                                type="datetimerange"
                                :picker-options="pickerOptions"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                align="right">
                        </el-date-picker>
                    </el-form-item>

                    <el-form-item class="options">
                        <el-button @click="formData = {}
            " size="medium">重 置
                        </el-button>
                        <el-button type="primary" size="medium">查 询</el-button>
                        <el-button type="info" size="medium" @click="back">返回</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="my-block">
                <el-table :data="tableData.records" border>
                    <el-table-column type="index" label="序号" width="50" />
                    <el-table-column prop="name" label="交易时间" />
                    <el-table-column prop="date" label="交易类型" />
                    <el-table-column prop="address" label="交易方" />
                    <el-table-column prop="name" label="交易数量" />
                    <el-table-column prop="name" label="资产名称" />
                    <el-table-column prop="name" label="备注" />
                </el-table>
                <pagination />
            </div>
        </div>
    </div>
</template>

<script>
    import pagination from '@com/el-pagination'
    export default {
        name: "index",
        data() {
            return {
                isShow:true,
                formData: {},
                tableData:{
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
        components:{
            pagination,
        },
        methods:{
            back() {
                this.$emit('Godetail')
            }
        }
    }
</script>

<style scoped>

</style>