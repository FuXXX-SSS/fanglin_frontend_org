<template>
    <div>
        <div class="my-block">
            <div class="sub-title">新增编辑汇率</div>
            <el-row :gutter="20">

                <el-col :span="24" class="el-right">
                    <el-form
                            :inline="true"
                            :model="formData"
                            size="small"
                            class="demo-form-inline"
                    >
                        <el-form-item label="本方">
                            <el-select v-model="formData.accType">
                                <el-option label="开启" value="1"></el-option>
                                <el-option label="关闭" value="2"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="对方">
                            <el-select v-model="formData.accType">
                                <el-option label="开启" value="1"></el-option>
                                <el-option label="关闭" value="2"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="汇率 : ">
                            <el-input v-model="formData.input" placeholder="请输入内容"></el-input>
                        </el-form-item>
                        <el-form-item label="交易单位 : ">
                            <div>用户名称</div>
                        </el-form-item>


                    </el-form>

                </el-col>
            </el-row>
        </div>
        <detailBottom />
    </div>
</template>

<script>
    import detailBottom from '@com/detailBottom'
    export default {
        name: "teamDetail",
        data(){
            return{
                formData:{},
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
                        },]
                }

            }
        },
        components:{
            detailBottom
        }
    }
</script>

<style scoped>
        .el-form-item{
            margin-right: 30px;
        }
</style>