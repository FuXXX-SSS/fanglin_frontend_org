<template>
    <div>
<!--        <div class="successImg">-->
<!--            <div v-for="(item,index) in baseImage" :key="index" class="baseList">-->
<!--                <el-image :src="item" alt style="width: 100%;height:100%;" fit="cover"/>-->
<!--                <div class="close" @click="clearImg(item)" :key="index">×</div>-->
<!--            </div>-->

<!--        </div>-->
        <el-upload
                v-if="isShow"
                class="avatar-uploader"
                name="image"
                :headers="headers"
                :limit="activeName === '0' ? 3 : 100"
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
                :on-change="handleEditChange"
        >
            <i class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>

    </div>
</template>

<script>
    import baseUrl from "@/http/baseUrl";
    import {instDetail} from "@http/inst";
    import {exhDetail} from "@http/exh";
    import {projectDetail} from "@http/project";
    import {mapState} from "vuex";

    export default {
        props: {
            limit: {
                type: Number,
                default: 1
            },
            isDetail: {
                type: Boolean,
                default: false
            },
            isUpload: {
                type: Boolean,
                default: false
            },
            isupdate: {
                type: Boolean,
                default: false
            },
            isexh: {
                type: Boolean,
                default: false
            },
            isevent: {
                type: Boolean,
                default: false
            },
            isreferal: {
                type: Boolean,
                default: false
            },
            Info: {
                type: String
            }
        },
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
                isShow: this.isDetail,
                hideUpload: false,
                limitCount: 1,
                newList: []
            };
        },
        computed: {
            ...mapState({
                ReferalData: state => state.baseData.ReferalData
            })
        },
        methods: {
            handleEditChange(file, fileList) {
                let vm = this;
                vm.hideUpload = fileList.length >= 1;
                console.log(vm.hideUpload);
            },
            handleAvatarSuccess(res, file) {
                console.log(file);
                console.log(res);
                let vm = this;
                vm.imgs.push({
                        "url": res.data.url,
                        "uid":file.uid
                    })
                console.log(vm.imgs);
                vm.imageUrl = URL.createObjectURL(file.raw);
                vm.$emit("load", vm.imgs);
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
                this.$tools.$mes(`图片仅能上传3张图片！`, "warning");
            },
            handlePictureCardPreview(file) {
                console.log(file);
                this.dialogImageUrl = file.response.data.url;
                this.dialogVisible = true;
            },
            handleRemove(file, fileList) {
                let vm = this;
                vm.hideUpload = fileList.length >= 1;
                vm.imgs.forEach((item, i) => {
                    if (item.url=== file.url) {
                        console.log(123);
                        vm.imgs.splice(i, 1);
                    }
                });
                vm.$emit("load", vm.imgs);
            },
            async init() {

                if (this.isexh) {
                    let res = await exhDetail(this.Info.id);
                    res.data.imageList.forEach(element=>{
                        this.imgs.push({
                            "url": element,
                        })
                    })
                    this.$emit("load", this.baseImage);
                    this.isShow = true;
                }
                let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
                this.headers = {
                    Authorization: userInfo.token
                };
                this.baseUrl = baseUrl;
            },
        },
        created() {
            this.init();
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

    .hide /deep/ .el-upload--picture-card {
        display: none;
    }

    .hide /deep/ .el-upload-list--picture-card .el-upload-list__item {

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

    .baseList {
        width: 148px !important;
        height: 148px !important;
        position: relative;
        float: left;
        margin-right: 30px;
    }
</style>
