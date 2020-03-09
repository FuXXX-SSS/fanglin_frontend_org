<template>
    <div>
        <div class="my-block">
            <div class="sub-title">文章详情</div>
            <el-row :gutter="20">

                <el-col :span="24" class="el-right">
                    <el-form
                            :inline="false"
                            :model="formData"
                            label-width="80px"
                            size="small"
                            class="demo-form-inline"
                    >

                        <el-form-item label="原标题 : ">
                            <div>用户名称</div>
                        </el-form-item>
                        <el-form-item label="推荐标题 : ">
                            <el-input v-model="formData.name"></el-input>
                        </el-form-item>
                        <el-form-item label="推荐栏目 : ">
                                <el-select v-model="formData.accType">
                                    <el-option label="开启" value="1"></el-option>
                                    <el-option label="关闭" value="2"></el-option>
                                </el-select>
                        </el-form-item>
                        <el-form-item label="推荐图片 : ">
                            <el-upload
                                    class="avatar-uploader"
                                    action="https://jsonplaceholder.typicode.com/posts/"
                                    :show-file-list="false"
                                    :on-success="handleAvatarSuccess"
                                    :before-upload="beforeAvatarUpload">
                                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="推荐链接 : ">
                            <el-input v-model="formData.name"></el-input>
                        </el-form-item>
                        <el-form-item label="推荐摘要 : ">
                            <el-input
                                    type="textarea"
                                    :autosize="{ minRows: 2, maxRows: 4}"
                                    placeholder="请输入内容"
                                    v-model="formData.textarea2">
                            </el-input>
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
                imageUrl: '',
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
        },
        methods: {
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            }
        }
    }
</script>

<style scoped>
    .el-image {
        width: 300px;
        height: 150px;
    }

    .el-divider--horizontal {
        margin: 0 0 20px 0;
    }

    .my-block
    /deep/ .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .my-block
    /deep/ .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .my-block
    /deep/ .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }

    .my-block
    /deep/ .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }

</style>