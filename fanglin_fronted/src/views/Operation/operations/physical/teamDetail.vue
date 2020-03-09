<template>
    <div>
        <div class="my-block">
            <div class="sub-title">实物详情</div>
            <el-row :gutter="20">

                <el-col :span="24" class="el-right">
                    <el-form
                            :inline="true"
                            :model="formData"
                            size="small"
                            class="demo-form-inline"
                    >
                        <el-form-item label="物品名称：">
                            <div>用户名称</div>
                        </el-form-item>
                        <el-form-item label="兑换标准：">
                            <div>用户名称</div>
                        </el-form-item>

                        <el-form-item label="供应单位：">
                            <div>用户名称</div>
                        </el-form-item>
                        <el-form-item label="入库数量：">
                            <div>用户名称</div>
                        </el-form-item>
                        <el-form-item label="状态：">
                            <el-radio v-model="formData.radio" label="1">备选项</el-radio>
                            <el-radio v-model="formData.radio" label="2">备选项</el-radio>
                        </el-form-item>
                        <br>

                        <el-form-item label="摘要：">
                            <div>用户名称</div>
                        </el-form-item>
                        <br>
                        <el-form-item label="缩略图：" style="margin-right: 10px">
                            <el-image :src="src"></el-image>
                        </el-form-item>

                        <br>
                        <el-form-item label="物品说明：">
                            <div>用户名称</div>
                            <el-image :src="src"></el-image>

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
            detailBottom
        }
    }
</script>

<style scoped>

    .el-image{
        width: 300px;
        height: 150px;
    }
</style>