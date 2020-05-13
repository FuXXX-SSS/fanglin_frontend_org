<template>
    <div>
        <el-upload
                v-if="isShow"
                class="avatar-uploader"
                name="image"
                :headers="headers"
                :limit="activeName === '0' ? 100 : 100"
                :action="baseUrl + '/bms/common/image/upload'"
                :show-file-list="true"
                accept="image/*"
                :multiple="activeName !== '0'"
                :file-list="imgs"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                list-type="picture-card"
                :class="{hide:hideUpload}"
        >
            <i class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <div v-else style="position:relative;" class="successImg">
            <img :src="baseImage" alt style="width: 100%;height:100%;" />
            <div class="close" @click="clearImg">×</div>
        </div>
    </div>
</template>

<script>
    import baseUrl from "@/http/baseUrl";
    import { instDetail } from "@http/inst";

    export default {
        props: {},
        name: "index",
        data() {
            return {
                imgs: [],
                fileList: [],
                formData: {},
                baseUrl: baseUrl,
                imageUrl: "",
                dialogImageUrl: "",
                headers: {},
                form: {
                    picList: []
                },
                activeName: "0",
                baseImage: "",
                hideUpload: false,
                limit: 1,
                isShow: true
            };
        },
        methods: {
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
                this.form.picList.push(file);
                this.$emit("load", this.form.picList);
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
            handlePictureCardPreview(file) {
                console.log(file);
                this.dialogImageUrl = file.response.data.url;
                this.dialogVisible = true;
            },
            handleRemove(file, fileList) {
                let vm = this;
                vm.hideUpload = fileList.length >= 1;
                this.form.picList.forEach((item, i) => {
                    if (
                        item.uid === file.uid
                    ) {
                        this.form.picList.splice(i, 1);
                    }
                });
                this.$emit("load",this.form.picList);
            },
            async init() {
                let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
                this.headers = {
                    Authorization: userInfo.token
                };
                this.baseUrl = baseUrl;
            },
            clearImg() {
                this.baseImage = "";
                this.isShow = true;
                this.$emit("load", "");
            }
        },
        created() {
            this.init();
            console.log(this.isDetail);
        }
    };
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
</style>
