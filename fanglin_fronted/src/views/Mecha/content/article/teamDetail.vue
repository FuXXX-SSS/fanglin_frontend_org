<template>
    <div>
        <div class="my-block">
            <div class="sub-title">文章详情</div>
            <el-row :gutter="20">

                <el-col :span="12" >
                    <el-form
                            :inline="false"
                            :model="formData"
                            size="small"
                            class="demo-form-inline"
                            label-width="100px"
                    >
                        <el-form-item label="文章标题 : ">
                            <el-input v-model="formData.name"></el-input>
                        </el-form-item>
                        <el-form-item label="发布栏目 : ">
                            <el-select v-model="formData.accType">
                                <el-option label="开启" value="1"></el-option>
                                <el-option label="关闭" value="2"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="作者 : ">
                            <el-input v-model="formData.name"></el-input>
                        </el-form-item>
                        <el-form-item label="关键字 : ">
                            <el-input v-model="formData.name"></el-input>
                        </el-form-item>
                        <el-form-item label="缩略图：" style="margin-right: 10px">
                            <el-image :src="src"></el-image>
                        </el-form-item>
                        <el-form-item label="摘要 : ">
                            <el-input
                                    type="textarea"
                                    :autosize="{ minRows: 2, maxRows: 4}"
                                    placeholder="请输入内容"
                                    v-model="formData.textarea2">
                            </el-input>
                        </el-form-item>
                    </el-form>

                </el-col>
                <Qutil />

            </el-row>
        </div>
        <div class="my-block">
            <el-row type="flex" class="row-bg" justify="center">
                <el-col :span="3">
                    <el-button type="warning">保存</el-button>
                </el-col>
                <el-col :span="3">
                    <el-button type="primary">推荐</el-button>
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