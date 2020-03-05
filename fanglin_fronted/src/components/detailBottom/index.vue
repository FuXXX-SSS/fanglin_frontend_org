<template>
        <div class="my-block">
            <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="6">   <el-button type="warning">警告按钮</el-button></el-col>
                <el-col :span="6">   <el-button type="info">信息按钮</el-button></el-col>
                <el-col :span="6">   <el-button type="success">成功按钮</el-button></el-col>
                <el-col :span="6">   <el-button type="primary">主要按钮</el-button></el-col>
            </el-row>
        </div>
</template>

<script>
    export default {
        name: "index",
        data() {
            return {}
        }
    }
</script>

<style scoped lang="less">
    .el-col-6{
        text-align: center;
    }
</style>