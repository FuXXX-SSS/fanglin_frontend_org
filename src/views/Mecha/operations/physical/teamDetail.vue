<template>
    <div>
        <div class="my-block">
            <div class="sub-title">现金详情</div>
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form
                            :inline="false"
                            :model="formData"
                            size="small"
                            class="demo-form-inline"
                            label-width="100px"
                    >
                        <el-form-item label="现金名称：">
                            <el-input v-model="formData.name"></el-input>
                        </el-form-item>

                        <el-form-item label="供应单位：">
                            <el-input v-model="formData.provider"></el-input>
                        </el-form-item>
                        <el-form-item label="入库数量：">
                            <el-input
                                    v-model="formData.totalStock"
                                    style="    width: 25%;
    float: left;"
                                    onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')"
                            ></el-input>
                            <el-input
                                    v-model="formData.unit"
                                    style="    width: 25%;
    float: left;margin-left: 10px"
                                    placeholder="单位"
                                    disabled
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="兑换标准：">
                            <el-input v-model="formData.exhAmount" style="    width: 25%;
    float: left;"></el-input>
                            <span style="margin-left: 14px;">{{assetsUnitName}}</span>
                        </el-form-item>
                        <el-form-item label="状态：">
                            <el-switch v-model="projectStatus" active-text="上架" inactive-text="下架"></el-switch>
                        </el-form-item>
                        <el-form-item label="缩略图：" style="margin-right: 10px" class="load">
                            <Elupload @load="load" :isDetail="true" :isexh="isexh" :Info="userInfo"/>
                        </el-form-item>
                        <el-form-item label="摘要：">
                            <el-input
                                    type="textarea"
                                    :autosize="{ minRows: 2, maxRows: 4}"
                                    placeholder="请输入内容"
                                    v-model="formData.description"
                            ></el-input>
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
                <el-form-item label="物品说明 : ">
                    <Quill ref="kindeditor" :content="formData.introduction" @input="qutil"></Quill>
                </el-form-item>
            </el-form>
        </div>
        <div class="my-block">
            <el-row type="flex" class="row-bg" justify="center">
                <el-col :span="3">
                    <el-button type="warning" @click="save">保存</el-button>
                </el-col>
                <el-col :span="3">
                    <el-button type="primary" @click="recommend">推荐</el-button>
                </el-col>
                <el-col :span="3">
                    <el-button type="info" @click="back">取消</el-button>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import Quill from "@com/quill-editor";
    import {exhDetail, exhupdate} from "@http/exh";
    import Elupload from "../project/upload";
    import {mapState} from "vuex";

    export default {
        name: "teamDetail",
        data() {
            return {
                formData: {type: 1, image: ""},
                projectStatus: "",
                assetsUnitName: "",
                isDetail: true,
                isexh: true,
                image: ""
            };
        },
        components: {
            Quill,
            Elupload
        },
        computed: {
            ...mapState({
                userInfo: state => state.baseData.CashData
            })
        },
        methods: {
            async save() {
                if (this.formData.image === "") {
                    this.$tools.$mes("图片没上传到服务器，无法提交发布", "warning");
                    return false;
                }
                this.projectStatus ? this.formData.goodsStatus = 1 : this.formData.goodsStatus = 0
                let res = await exhupdate(this.formData);
                if (res && res.code === 1000) {
                    this.$tools.$mes("操作成功", "success");
                    this.$emit("init");
                    this.back();
                }
            },
            back() {
                this.$store.dispatch("mecha_asset/setPhyscial", 1);
                this.$router.go(-1);
            },
            async init() {
                this.assetsUnitName = JSON.parse(
                    sessionStorage.getItem("userInfo")
                ).assetsUnitName;
                let res = await exhDetail(this.userInfo.id);
                this.formData = res.data;
                this.image = res.data.image;
                this.projectStatus = res.data.goodsStatus;
                this.projectStatus === 1
                    ? (this.projectStatus = true)
                    : (this.projectStatus = false);
            },
            load(data) {
                console.log(data);
                this.formData.imageList = [];
                if (data) {
                    data.forEach(item => {
                        this.formData.imageList.push(item.url)
                    })
                }
            },
            qutil(data) {
                this.formData.introduction = data;
            },
            recommend() {
                let obj = {
                    rfid: this.formData.id,
                    type: 8,
                    title: this.formData.name
                };
                this.$store.dispatch("recommend/setReco", obj);
                this.$router.push({
                    name: "recommend"
                });
            }
        },
        created() {
            this.init();
        }
    };
</script>

<style scoped lang='less'>
    .el-image {
        width: 300px;
        height: 150px;
    }

    .my-block /deep/ .load {
        .successImg {
            width: 375px !important;
            height: 186px;
        }
    }
</style>
