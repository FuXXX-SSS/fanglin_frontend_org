<template>
    <div>
        <div class="my-block">
            <div class="titleDetail">机构详情</div>
            <el-row :gutter="20">
                <el-col :span="4" class="el-left" style="align-items: flex-start;">
                    <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                </el-col>
                <el-col :span="20" class="el-right">
                    <el-form
                            :inline="true"
                            :model="formData"
                            size="small"
                            class="demo-form-inline"
                    >
                        <el-form-item label="机构名称 : ">
                            <div>用户名称</div>
                        </el-form-item>
                        <el-form-item label="成立时间 : ">
                            <div>用户名称</div>
                        </el-form-item>
                        <el-form-item label="加入方式 : ">
                            <div>用户名称</div>
                        </el-form-item>
                        <br>
                        <el-form-item label="管理员 : ">
                            <div>用户名称</div>
                        </el-form-item>
                        <el-form-item label="手机号码 : ">
                            <div>用户名称</div>
                        </el-form-item>
                        <el-form-item label="成员数量 : ">
                            <div>用户名称</div>
                        </el-form-item>
                        <br>
                        <el-form-item label="地址 : ">
                            <div>用户名称</div>
                        </el-form-item>
                        <br>
                        <el-form-item label="证明文件 : " class="imgList">
                            <el-row type="flex" class="row-bg" justify="space-between">
                                <el-col :span="6">
                                    <el-image :src="src"></el-image>
                                </el-col>
                                <el-col :span="6">
                                    <el-image :src="src"></el-image>
                                </el-col>
                                <el-col :span="6">
                                    <el-image :src="src"></el-image>
                                </el-col>
                            </el-row>
                        </el-form-item>
                        <br>

                        <el-form-item label="资产： ">
                            <div>用户名称</div>
                        </el-form-item>
                        <br>

                        <el-form-item label="结算比例：">
                            <div>用户名称</div>
                        </el-form-item>
                        <br>

                        <el-form-item label="服务系数：">
                            <div>用户名称</div>
                        </el-form-item>
                        <br>

                        <el-form-item label="开通栏目：">
                            <div>用户名称</div>
                        </el-form-item>
                        <br>

                        <el-form-item label="成员数量上限：">
                            <el-input v-model="formData.input" placeholder="请输入内容"></el-input>
                        </el-form-item>
                    </el-form>

                </el-col>
            </el-row>
        </div>
        <div class="my-block">
            <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="6">   <el-button type="warning" @click="back">关闭/开通</el-button></el-col>
                <el-col :span="6">   <el-button type="info">转账</el-button></el-col>
                <el-col :span="6">   <el-button type="success">推荐</el-button></el-col>
                <el-col :span="6">   <el-button type="primary" @click="back">返回</el-button></el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import detailBottom from '@com/detailBottom'

    export default {
        name: "teamDetail",
        data() {
            return {
                formData: {},
                src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
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
        methods:{ back(){
                this.$emit('Godetail')
            }
        }
    }
</script>

<style scoped lang="less">
    .el-form-item {
        margin-right: 30px;
    }

    .imgList {
        /deep/ .el-form-item__content {
            width: 80%;
            display: inline-block;
        }

    }
</style>