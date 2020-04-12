<template>
    <div>
        <div class="my-block">
            <div class="sub-title">推荐</div>
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
                            <div>{{this.formData.oriTitle}}</div>
                        </el-form-item>
                        <el-form-item label="推荐标题 : ">
                            <el-input v-model="formData.title"></el-input>
                        </el-form-item>
                        <el-form-item label="推荐栏目 : ">
                            <el-select filterable v-model="formData.accType">
                                <el-option
                                        :label="i.name"
                                        :value="i.id"
                                        v-for="i in typeList"
                                        :key="i.id"
                                ></el-option>
                            </el-select>

                        </el-form-item>
                        <el-form-item label="推荐图片 : ">
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
                        <el-form-item label="推荐链接 : ">
                            <el-input v-model="formData.url"></el-input>
                        </el-form-item>
                        <el-form-item label="推荐摘要 : ">
                            <el-input
                                    type="textarea"
                                    :autosize="{ minRows: 2, maxRows: 4}"
                                    placeholder="请输入内容"
                                    v-model="formData.recAbstract">
                            </el-input>
                        </el-form-item>
                    </el-form>

                </el-col>
            </el-row>
        </div>
        <div class="my-block block_bot">
            <el-row type="flex" class="row-bg" justify="center">
                <el-col :span="3">
                    <el-button type="warning" @click="save()">保存</el-button>
                </el-col>
                <el-col :span="3">
                    <el-button type="info" @click="back">删除</el-button>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import {recommendUp} from '@http/recommend'
    import baseUrl from '@/http/baseUrl'
    import {mapState} from 'vuex'

    export default {
        name: "teamDetail",
        data() {
            return {
                imgs: [],
                fileList: [],
                formData: {},
                baseUrl: baseUrl,
                imageUrl: '',
                dialogImageUrl: '',
                typeList: [
                    {name: '文章', id: 0},
                    {name: '活动', id: 1},
                    {name: '项目', id: 2},
                    {name: '兑换品', id: 3},
                    {name: '志愿者', id: 4},
                    {name: '团队', id: 5},
                    {name: '机构', id: 6},
                ],
                headers: {},
                activeName: "0",
                form: {
                    picList: []
                },
            }
        },
        computed: {
            ...mapState({
                recomObj: state => state.recommend.recomObj,
            })
        },
        methods: {
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
                this.formData.image = res.data.url
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type == "image/jpeg" || file.type == "image/png";
                const isLt4M = file.size / 1024 / 1024 < 1;
                console.log(file);

                if (!isJPG) {
                    this.$message.error("推荐图片只能是 JPG/PNG 格式!");
                }
                if (!isLt4M) {
                    this.$message.error("推荐图片大小不能超过 1MB!");
                }
                return isJPG && isLt4M;
            },
            back() {
                this.$router.go(-1)
            },
            async save() {
                let res = await recommendUp(this.formData)
                if (res && res.code === 1000) {
                    this.$tools.$mes('保存成功', 'success')
                }
            },
            onExceed() {
                this.$tools.$mes("推荐图片仅能上传一张图片！", 'warning');
            },
            handlePictureCardPreview(file) {
                console.log(file);
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
                this.formData.columnId = this.$route.params.columnId;
                this.formData.oriTitle = this.$route.params.oriTitle;
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
        text-align: center;
    }

    .my-block
    /deep/ .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }

</style>
<style>
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        text-align: center;
    }

    .avatar {
        display: block;
    }
</style>