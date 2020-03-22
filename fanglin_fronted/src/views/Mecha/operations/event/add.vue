<template>
    <div>
        <div class="my-block">
            <div class="sub-title">发布项目</div>
            <el-row :gutter="20">

                <el-col :span="12" >
                    <el-form
                            :inline="false"
                            :model="formData"
                            size="small"
                            class="demo-form-inline"
                            label-width="100px"

                    >
                        <el-form-item label="项目名称 : ">
                            <el-input v-model="formData.value"></el-input>

                        </el-form-item>
                        <el-form-item label="联系电话：">
                            <el-input v-model="formData.value"></el-input>

                        </el-form-item>
                       <el-form-item label="募资目标：">
                            <el-input v-model="formData.value"></el-input>
                        </el-form-item>

                        <el-form-item label="回馈标准：">
                            <el-input v-model="formData.value"></el-input>
                        </el-form-item>
                        <el-form-item>

                        </el-form-item>
                        <br>
                        <el-form-item label="缩略图：" style="margin-right: 10px">
                            <el-image :src="src"></el-image>
                        </el-form-item>
                    </el-form>

                </el-col>
            </el-row>
            <Quill />

        </div>
        <div class="my-block">
            <el-row type="flex" class="row-bg" justify="space-around">

                <el-col :span="6">
                    <el-button  type="warning">保存</el-button>
                </el-col>
                <el-col :span="6">
                    <el-button  type="success">关闭/开启</el-button>
                </el-col>
                <el-col :span="6">
                    <el-button type="info" @click="back">返回</el-button>
                </el-col>
            </el-row>
        </div>

    </div>
</template>

<script>
    import detailBottom from '@com/detailBottom'
    import Quill from '@com/quill-editor'

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
                },
                pickerOptions: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },

            }
        },
        components: {
            Quill
        },
        methods:{
            back(){
                this.$store.dispatch('mecha_asset/setEvent',1)
            },
        },
    }
</script>

<style scoped>
    .el-image{
        width: 300px;
        height: 150px;
    }
</style>