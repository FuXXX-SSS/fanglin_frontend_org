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
                            label-width="100px"

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
                        <el-form-item label="人员要求：">
                            <div>用户名称</div>
                        </el-form-item>
                        <br>

                        <el-form-item label="活动状态：">
                            <div>用户名称</div>
                        </el-form-item>
                        <el-form-item label="发布人：">
                            <div>用户名称</div>
                        </el-form-item>
                        <el-form-item label="地点：" style="margin-right: 10px">
                            <div>用户名称</div>
                        </el-form-item>
                        <el-form-item>
                            <i class="el-icon-s-opportunity" style="font-size: 18px;color: #0099ff;cursor: pointer"></i>
                        </el-form-item>
                        <br>
                        <el-form-item label="缩略图：" style="margin-right: 10px">
                            <el-image :src="src"></el-image>
                        </el-form-item>
                    </el-form>

                </el-col>
                <Qutil/>

            </el-row>
        </div>
        <div class="my-block">
            <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="6">
                    <el-button type="success">保存</el-button>
                </el-col>
                <el-col :span="6">
                    <el-button type="warning">编辑</el-button>
                </el-col>
                <el-col :span="6">
                    <el-button type="primary" @click="back">返回</el-button>
                </el-col>
            </el-row>
        </div>

    </div>
</template>

<script>
    import Qutil from '@com/quill-editor'

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
            Qutil
        },
        methods: {
            back() {
                this.$store.dispatch('mecha_asset/setEvent', 1)
            },
        },
    }
</script>

<style scoped>
    .el-form-item {
        margin-right: 30px;
    }

    .el-image {
        width: 300px;
        height: 150px;
    }
</style>