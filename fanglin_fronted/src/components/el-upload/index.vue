<template>
    <el-upload
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
    >
        <i class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>

</template>

<script>
    import baseUrl from '@/http/baseUrl'

    export default {
        props: {
            limit: {
                type: Number,
                default: 1
            }
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
            }
        },
        methods: {
            handleAvatarSuccess(res, file) {
                console.log(res);
                this.imageUrl = URL.createObjectURL(file.raw);
                this.formData.image = res.data.url
                this.$emit('load', this.formData.image)
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type == "image/jpeg" || file.type == "image/png";
                const isLt4M = file.size / 1024 / 1024 < 1;
                console.log(file);

                if (!isJPG) {
                    this.$message.error("图片只能是 JPG/PNG 格式!");
                }
                if (!isLt4M) {
                    this.$message.error("图片大小不能超过 1MB!");
                }
                return isJPG && isLt4M;
            },
            onExceed(files, fileList) {
                this.$tools.$mes(`图片仅能上传${this.limit}张图片！`, 'warning');

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
            },
        },
        created() {
            this.init()
            console.log(this.limit);
        }
    }
</script>

<style scoped>

</style>