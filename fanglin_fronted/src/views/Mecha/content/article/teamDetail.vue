<template>
    <div>
        <div class="my-block">
            <div class="sub-title">新增文章</div>
            <el-row :gutter="20">

                <el-col :span="12">
                    <el-form
                            :inline="false"
                            :model="formData"
                            size="small"
                            class="demo-form-inline"
                            label-width="100px"
                    >
                        <el-form-item label="文章标题 : ">
                            <el-input v-model="formData.title"></el-input>
                        </el-form-item>
                        <el-form-item label="发布栏目 : ">
                            <el-select v-model="formData.accType">
                                <el-option label="开启" value="1"></el-option>
                                <el-option label="关闭" value="2"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="作者 : ">
                            <el-input v-model="formData.author"></el-input>
                        </el-form-item>
                        <el-form-item label="关键字 : ">
                            <el-input v-model="formData.keywords"></el-input>
                        </el-form-item>
                        <el-form-item label="缩略图 : ">
                            <el-upload
                                    class="avatar-uploader"
                                    name="image"
                                    :headers="headers"
                                    :limit="activeName === '0' ? 1 : 100"
                                    :action="baseUrl + '/bms/common/image/upload'"
                                    :show-file-list="true"
                                    accept="image/*"
                                    :multiple="activeName !== '0'"
                                    :file-list="imgs"
                                    :on-preview="handlePictureCardPreview"
                                    :on-remove="handleRemove"
                                    :on-exceed="onExceed"
                                    :on-success="handleAvatarSuccess"
                                    :before-upload="beforeAvatarUpload"
                                    list-type="picture-card"
                            >
                                <i class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>

                        <el-form-item label="摘要 : ">
                            <el-input
                                    type="textarea"
                                    :autosize="{ minRows: 2, maxRows: 4}"
                                    placeholder="请输入内容"
                                    v-model="formData.abstractInfo">
                            </el-input>
                        </el-form-item>

                    </el-form>


                </el-col>


            </el-row>
            <el-form
                    :inline="false"
                    :model="formData"
                    size="small"
                    class="demo-form-inline"
                    label-width="100px"
            >
                <el-form-item label="正文 : ">
                    <Qutil @qutil="qutil"/>
                </el-form-item>
            </el-form>
        </div>
        <div class="my-block">
            <el-row type="flex" class="row-bg" justify="center">
                <el-col :span="3">
                    <el-button type="warning" @click="save">保存</el-button>
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
    import {publish} from '@http/article'
    import baseUrl from '@/http/baseUrl'

    export default {
        props: {
            userInfo: {
                type: Object,
            }
        },
        name: "teamDetail",
        data() {
            return {
                imgs: [],
                fileList: [],
                formData: {},
                baseUrl: baseUrl,
                imageUrl: '',
                dialogImageUrl: '',
                headers: {},
                activeName: "0",
                form: {
                    picList: []
                },
            }
        },
        components: {
            Qutil
        },
        methods: {
            back() {
                this.$emit('Godetail')
                this.$emit('init')
            },
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
                this.formData.image = res.data.url
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type == "image/jpeg" || file.type == "image/png";
                const isLt4M = file.size / 1024 / 1024 < 1;

                if (!isJPG) {
                    this.$message.error("缩略图只能是 JPG/PNG 格式!");
                }
                if (!isLt4M) {
                    this.$message.error("缩略图大小不能超过 1MB!");
                }
                return isJPG && isLt4M;
            },
            onExceed() {
                this.$tools.$mes("缩略图仅能上传一张图片！", 'warning');
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.response.data.url;
                this.dialogVisible = true;
            },
            handleRemove(file) {
                console.log(file);
                this.form.picList.forEach((item, i) => {
                    if (!file.response) {
                        file.response = {data: {url: ""}};
                    }
                    if (
                        item.picUrl === file.response.data.url ||
                        item.picUrl === file.url
                    ) {
                        this.form.picList.splice(i, 1);
                    }
                    console.log(this.form.picList);
                });
                this.fileList.forEach((item, i) => {
                    if (
                        item.picUrl === file.response.data.url ||
                        item.picUrl === file.url
                    ) {
                        this.fileList.splice(i, 1);
                    }
                });
            },
            init() {
                let userInfo = JSON.parse(
                    sessionStorage.getItem("userInfo")
                );
                this.headers = {
                    Authorization: userInfo.token
                };
            },
            async save() {
                console.log(this.formData);
                let res = await publish(this.formData)
                if (res && res.code === 1000) {
                    this.$tools.$mes("新增文章成功！", 'success');
                    this.back()
                }
            },
            qutil(data) {
                this.formData.detail = data
            }
        },
        created() {
            this.init()
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
</style>