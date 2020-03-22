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
                        <el-form-item label="地点：" style="margin-right: 10px">
                            <el-input v-model="formData.value"></el-input>
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
            </el-row>
        </div>
        <div class="my-block">
            <div class="sub-title">实施情况</div>
            <el-table :data="tableData.records" border>
                <el-table-column type="index" label="序号" width="50" />
                <el-table-column prop="name" label="申请人" />
                <el-table-column prop="date" label="性别" />
                <el-table-column prop="date" label="年龄" />
                <el-table-column prop="date" label="服务时长" />
                <el-table-column prop="date" label="服务次数" />
                <el-table-column prop="date" label="评价" />
                <el-table-column prop="date" label="实名认证" />
                <el-table-column prop="date" label="专长" />
                <el-table-column prop="date" label="申请时间" />
            </el-table>
            <pagination />

        </div>
        <div class="my-block">
            <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="6">
                    <el-button type="success">确定人选</el-button>
                </el-col>
                <el-col :span="6">
                    <el-button type="warning">推荐</el-button>
                </el-col>
                <el-col :span="6">
                    <el-button type="primary" @click="back">返回</el-button>
                </el-col>
            </el-row>
        </div>

    </div>
</template>

<script>
    import detailBottom from '@com/detailBottom'
    import pagination from '@com/el-pagination'

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
            pagination,

        },
        methods:{
            back(){
                this.$store.dispatch('mecha_asset/setAsset',1)
            },
        },
    }
</script>

<style scoped>
    .el-form-item {
        margin-right: 30px;
    }
    .el-image{
        width: 300px;
        height: 150px;
    }
</style>