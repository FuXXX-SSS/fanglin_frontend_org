<template>
    <div>
        <div class="my-block">
            <div class="titleDetail">团队详情</div>
            <el-row :gutter="20">
                <el-col :span="4" class="el-left">
                    <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                </el-col>
                <el-col :span="20" class="el-right">
                    <el-form
                            :inline="true"
                            :model="formData"
                            size="small"
                            class="demo-form-inline"
                    >
                        <el-form-item label="创始人 : ">
                            <div>用户名称</div>
                        </el-form-item>
                        <el-form-item label="管理员 : ">
                            <div>用户名称</div>
                        </el-form-item>
                        <el-form-item label="手机号码 : ">
                            <div>用户名称</div>
                        </el-form-item>
                        <el-form-item label="成立时间 : ">
                            <div>用户名称</div>
                        </el-form-item>
                        <el-form-item label="加入方式 : ">
                            <div>用户名称</div>
                        </el-form-item>
                        <br>
                        <el-form-item label="服务时长 : ">
                            <div>用户名称</div>
                        </el-form-item>
                        <el-form-item label="服务次数 : ">
                            <div>用户名称</div>
                        </el-form-item>
                        <el-form-item label="服务评分 : ">
                            <div>用户名称</div>
                        </el-form-item>
                        <el-form-item label="团队成员 : ">
                            <div>用户名称</div>
                        </el-form-item>
                        <el-form-item label="擅长 : ">
                            <div>用户名称</div>
                        </el-form-item>
                        <br>
                        <el-form-item label="简介 : ">
                            <div>用户名称</div>
                        </el-form-item>
                    </el-form>

                </el-col>
            </el-row>
        </div>
        <div class="my-block">
            <div class="titleDetail">资产</div>
            <el-table :data="tableData.records" border>
                <el-table-column prop="name" label="" />
                <el-table-column prop="name" label="服务资产" />
                <el-table-column prop="date" label="实物资产" />
                <el-table-column prop="address" label="现金资产" />
            </el-table>
        </div>
        <div class="my-block">
            <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="6">   <el-button type="warning" @click="back">关闭</el-button></el-col>
                <el-col :span="6">   <el-button type="info">转账</el-button></el-col>
                <el-col :span="6">   <el-button type="warning">推荐</el-button></el-col>
                <el-col :span="6">   <el-button type="primary" @click="back">返回</el-button></el-col>
            </el-row>
        </div>
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
        },
        methods:{ back(){
                this.$emit('Godetail')
            }
        }
    }
</script>

<style scoped>
        .el-form-item{
            margin-right: 30px;
        }
</style>