<template>
    <div>
        <div class="my-block">
            <div class="sub-title">文章详情</div>
            <el-row :gutter="20">

                <el-col :span="24" class="el-right">
                    <el-form
                            :inline="true"
                            :model="formData"
                            size="small"
                            class="demo-form-inline"
                    >
                        <el-form-item label="文章标题 : ">
                            <div>用户名称</div>
                        </el-form-item>
                        <el-form-item label="发布栏目 : ">
                            <div>用户名称</div>
                        </el-form-item>
                        <el-form-item label="作者 : ">
                            <div>用户名称</div>
                        </el-form-item>
                        <el-form-item label="关键字 : ">
                            <div>用户名称</div>
                        </el-form-item>
                        <br>

                        <el-form-item label="缩略图：" style="margin-right: 10px">
                            <el-image :src="src"></el-image>
                        </el-form-item>
                        <br>
                        <el-form-item label="摘要 : ">
                            <div>用户名称</div>
                        </el-form-item>
                        <br>
                        <el-form-item label="正文 : " >
                            <span >少量的邪恶足以抵消全部高贵的品质, 害得人声名狼藉</span>
                        </el-form-item>
                    </el-form>

                </el-col>
            </el-row>
        </div>
        <div class="my-block">
            <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="6">   <el-button type="warning" @click="back">关闭/开启</el-button></el-col>
                <el-col :span="6">   <el-button type="info">推荐</el-button></el-col>
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
        methods:{
            back(){
                this.$emit('Godetail')
            }
        }
    }
</script>

<style scoped>
    .el-image {
        width: 300px;
        height: 150px;
    }
    .el-divider--horizontal{
        margin: 0 0 20px 0;
    }
</style>