<template>
    <div>
        <div class="my-block">
            <div class="sub-title">发布项目</div>
            <el-row :gutter="20">
                <el-col :span="18">
                    <el-form
                            :inline="false"
                            :model="formData"
                            size="small"
                            class="demo-form-inline"
                            label-width="100px"
                    >
                        <el-form-item label="项目名称 : ">
                            <el-input v-model="formData.name"></el-input>
                        </el-form-item>
                        <el-form-item label="联系电话：">
                            <el-input v-model="formData.phone"
                                      onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')"></el-input>
                        </el-form-item>
                        <el-form-item label="募资目标：">
                            <el-input
                                    v-model="formData.targetAmount"
                                    style="width: 80%;float: left;"
                                    onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')"
                            ></el-input>
                            <span style="margin-left: 14px;">元</span>
                        </el-form-item>

                        <el-form-item label="回馈标准：">
                            <span style="float: left;">资助1元回馈</span>
                            <el-input
                                    v-model="formData.refundStd"
                                    style="width: 50%;float: left;margin-left: 10px;margin-right: 10px"
                                    onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')"
                            ></el-input>
                            <span style="margin-left: 14px;">{{assetsUnitName}}</span>
                        </el-form-item>
                        <el-form-item></el-form-item>
                        <br/>
                        <el-form-item label="缩略图：" style="margin-right: 10px">
                            <Elupload @load="load" :isDetail="isDetail"/>
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
                <el-form-item label="项目详情 : ">
                    <Quill ref="kindeditor" :content="formData.detail" @input="qutil"></Quill>
                </el-form-item>
            </el-form>
        </div>
        <div class="my-block">
            <el-row type="flex" class="row-bg" justify="center">
                <el-col :span="3">
                    <el-button type="warning" @click="save()">保存</el-button>
                </el-col>
                <el-col :span="3">
                    <el-button type="info" @click="back">返回</el-button>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import Quill from "@com/quill-editor";
    import {projectpublish} from "@http/project";
    import baseUrl from "@/http/baseUrl";
    import Elupload from "@com/el-upload";

    export default {
        name: "teamDetail",
        data() {
            return {
                imgs: [],
                fileList: [],
                formData: {
                    image: "",
                    name: "",
                    phone: "",
                    targetAmount: "",
                    refundStd: "",
                },
                baseUrl: baseUrl,
                imageUrl: "",
                dialogImageUrl: "",
                headers: {},
                form: {
                    picList: [],
                },
                activeName: "0",
                isDetail: true,
                assetsUnitName: ""
            };
        },
        components: {
            Quill,
            Elupload
        },
        methods: {
            back() {
                this.$store.dispatch("mecha_asset/setEvent", 1);
                this.$router.go(-1);
            },

            async save() {

                if (this.formData.name === "") {
                    this.$tools.$mes("项目名称为空，无法提交发布", "warning");
                    return false;
                }
                if (this.formData.phone === "") {
                    this.$tools.$mes("联系电话为空，无法提交发布", "warning");
                    return false;
                }
                if (this.formData.targetAmount === "") {
                    this.$tools.$mes("募资目标为空，无法提交发布", "warning");
                    return false;
                }
                if (this.formData.refundStd === "") {
                    this.$tools.$mes("回馈标准为空，无法提交发布", "warning");
                    return false;
                }

                if (this.formData.image === "") {
                    this.$tools.$mes("图片没上传到服务器，无法提交发布", "warning");
                    return false;
                }
                console.log(this.formData);
                let res = await projectpublish(this.formData);
                if (res && res.code === 1000) {
                    this.$tools.$mes("操作成功", "success");
                    this.$emit("init");
                    this.back();
                }
            },
            qutil(data) {
                this.formData.detail = data;
            },
            load(data) {
                this.formData.image = data;
            },
            init() {
                this.assetsUnitName = JSON.parse(
                    sessionStorage.getItem("userInfo")
                ).assetsUnitName;
            }
        },
        created() {
            this.init();
        }
    };
</script>

<style scoped>
    .el-image {
        width: 300px;
        height: 150px;
    }

    .my-block /deep/ .el-upload {
        width: 686px;
        height: 218px;
    }
</style>
