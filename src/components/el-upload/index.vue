<template>
    <div>
        <el-upload
                v-if="isShow"
                class="avatar-uploader"
                name="image"
                :headers="headers"
                :limit="activeName === '0' ? limit : 100"
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
                :class="{hide:hideUpload}"
                :on-change="handleEditChange"
        >
            <i class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <div v-else style="position:relative;" class="successImg">
            <img :src="baseImage" alt style="width: 100%;height:100%;"/>
            <div class="close" @click="clearImg">
                ×
            </div>
        </div>
    </div>
</template>

<script>
    import baseUrl from '@/http/baseUrl'
    import {instDetail} from '@http/inst'
    import {exhDetail} from '@http/exh'

    export default {
        props: {
            limit: {
                type: Number,
                default: 1
            },
            isDetail: {
                type: Boolean,
                default: false
            }, isUpload: {
                type: Boolean,
                default: false
            }, isupdate: {
                type: Boolean,
                default: false
            }, isexh: {
                type: Boolean,
                default: false
            }, Info: {
                type: String,
            },  
        },
        name: "index",
        data() {
            return {
                imgs: [],
                fileList: [],
                formData: {},
                baseUrl: baseUrl,
                imageUrl: '',
                dialogImageUrl: '',
                headers: {},
                form: {
                    picList: []
                },
                activeName: "0",
                baseImage: '',
                isShow: this.isDetail,
                hideUpload: false,
                limitCount: 1
            }
        },
        methods: {
            handleEditChange(file, fileList) {
                let vm = this
                vm.hideUpload = fileList.length >= 1
                console.log(vm.hideUpload);
            },
            handleAvatarSuccess(res, file) {
                console.log(res);
                this.imageUrl = URL.createObjectURL(file.raw);
                this.formData.image = res.data.url
                console.log(this.formData.image);
                this.$emit('load', this.formData.image)
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type == "image/jpeg" || file.type == "image/png";
                const isLt5M = file.size / 1024 / 1024 < 5;
                if (!isJPG) {
                    this.$message.error("图片只能是 JPG/PNG 格式!");
                }
                if (!isLt5M) {
                    this.$message.error("图片大小不能超过 5MB!");
                }
                return isJPG && isLt5M;
            },
            onExceed(files, fileList) {
                this.$tools.$mes(`图片仅能上传${this.limit}张图片！`, 'warning');

            },
            handlePictureCardPreview(file) {
                console.log(file);
                this.dialogImageUrl = file.response.data.url;
                this.dialogVisible = true;
            },
            handleRemove(file, fileList) {
                let vm = this
                vm.hideUpload = fileList.length >= 1
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
            async init() {
                 if (this.isexh) {
                    let res = await exhDetail(this.Info.id)
                    console.log(res);
                    this.baseImage=res.data.image
                    this.isShow = false
                }
                let instId = JSON.parse(
                    sessionStorage.getItem("userInfo")
                ).instId;
                if (this.isUpload) {
                    let res = await instDetail(instId)
                    if (res.data.avatar !== '') {
                        this.baseImage = res.data.avatar
                        this.isShow = false
                    }
                }
               
                let userInfo = JSON.parse(
                    sessionStorage.getItem("userInfo")
                );
                this.headers = {
                    Authorization: userInfo.token
                };
                this.baseUrl = baseUrl
            },
            clearImg() {
                this.baseImage = ''
                this.isShow = true
                this.$emit('load', this.baseImage)
            },
        },
        created() {
            this.init()
            console.log(this.isexh);
        }
    }
</script>

<style scoped lang="less">
    .close {
        position: absolute;
        top: -15px;
        right: -15px;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        text-align: center;
        line-height: 30px;
        border: 1px solid #ccc;
        background: rgb(255, 255, 255);
        font-weight: bold;
        font-size: 20px;
        cursor: pointer;
    }

    .hide /deep/ .el-upload--picture-card {
        display: none;
    }

    .hide /deep/ .el-upload-list--picture-card .el-upload-list__item {
        width: 686px;
        height: 218px;
    }

    .avatar {
        /deep/ img {
            width: 686px;
        }
    }

    .my-block /deep/ .el-upload {
        width: 686px;
        height: 218px;
    }
</style>
