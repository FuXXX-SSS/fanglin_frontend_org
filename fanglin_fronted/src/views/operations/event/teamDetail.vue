<template>
    <div>
        <div class="my-block">
            <div class="sub-title">活动详情</div>
            <el-row :gutter="20">

                <el-col :span="24" class="el-right">
                    <el-form
                            :inline="true"
                            :model="formData"
                            size="small"
                            class="demo-form-inline"
                    >
                        <el-form-item label="活动名称 : ">
                            <div>用户名称</div>
                        </el-form-item>
                        <el-form-item label="开始时间：">
                            <div>用户名称</div>
                        </el-form-item>
                        <el-form-item label="时长：">
                            <div>用户名称</div>
                        </el-form-item>
                        <el-form-item label="联系电话：">
                            <div>用户名称</div>
                        </el-form-item>
                        <el-form-item label="活动价值：">
                            <div>用户名称</div>
                        </el-form-item>
                        <el-form-item label="所属项目：">
                            <div>用户名称</div>
                        </el-form-item>
                        <br>

                        <el-form-item label="人员要求：">
                            <div>用户名称</div>
                        </el-form-item>
                        <el-form-item label="活动状态：">
                            <div>用户名称</div>
                        </el-form-item>
                        <el-form-item label="发布人：">
                            <div>用户名称</div>
                        </el-form-item>
                        <el-form-item label="地点：">
                            <el-input v-model="formData.value"><el-button>删除</el-button></el-input>
                        </el-form-item>


                    </el-form>

                </el-col>
            </el-row>
        </div>
        <detailBottom/>
    </div>
</template>

<script>
    import detailBottom from '@com/detailBottom'

    export default {
        name: "teamDetail",
        data() {
            return {
                formData: {},
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
            detailBottom
        }
    }
</script>

<style scoped>
    .el-form-item {
        margin-right: 30px;
    }
</style>