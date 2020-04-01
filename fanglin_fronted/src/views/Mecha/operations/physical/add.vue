<template>
    <div>
        <div class="my-block">
            <div class="sub-title">新增兑换(现金)</div>
            <el-row :gutter="20">

                <el-col :span="12" >
                    <el-form
                            :inline="false"
                            :model="formData"
                            size="small"
                            class="demo-form-inline"
                            label-width="100px"

                    >
                        <el-form-item label="现金名称 : ">
                            <el-input v-model="formData.value"></el-input>

                        </el-form-item>
                        <el-form-item label="供应单位：">
                            <el-input v-model="formData.value"></el-input>

                        </el-form-item>
                        <el-form-item label="状态：">
                            <el-select v-model="formData.accType">
                                <el-option label="上架" value="1"></el-option>
                                <el-option label="下架" value="2"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="入库数量：">
                            <el-input v-model="formData.value" style="    width: 25%;
    float: left;"></el-input>
                            <el-input v-model="formData.value" style="    width: 25%;
    float: left;margin-left: 10px" placeholder="单位"></el-input>
                        </el-form-item>
                        <el-form-item label="兑换标准：">
                            <el-input v-model="formData.value" style="    width: 25%;
    float: left;"></el-input>
                            <el-input v-model="formData.value" style="    width: 25%;
    float: left;margin-left: 10px" placeholder="单位"></el-input>
                        </el-form-item>
                        <el-form-item label="购买价格：">
                            <el-input v-model="formData.value" style="    width: 25%;
    float: left;"></el-input>
                            <el-input v-model="formData.value" style="    width: 25%;
    float: left;margin-left: 10px" placeholder="单位"></el-input>
                        </el-form-item>
                        <el-form-item label="购买回馈：">
                            <el-input v-model="formData.value" style="    width: 25%;
    float: left;"></el-input>
                            <el-input v-model="formData.value" style="    width: 25%;
    float: left;margin-left: 10px" placeholder="单位"></el-input>
                        </el-form-item>
                        <el-form-item label="所属项目：">
                            <el-input
                                    type="textarea"
                                    :autosize="{ minRows: 2, maxRows: 4}"
                                    placeholder="请输入内容"
                                    v-model="formData.textarea2">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="缩略图：" style="margin-right: 10px">
                            <el-image :src="src"></el-image>
                        </el-form-item>
                    </el-form>

                </el-col>
            </el-row>
            <Quill />

        </div>
        <div class="my-block">
            <el-row type="flex" class="row-bg" justify="center">

                <el-col :span="3">
                    <el-button  type="warning">保存</el-button>
                </el-col>
                <el-col :span="3">
                    <el-button type="info" @click="back">取消</el-button>
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
                this.$store.dispatch('mecha_asset/setPhyscial',1)
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