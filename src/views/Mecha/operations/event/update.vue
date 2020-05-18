<template>
    <div>
        <div class="my-block">
            <div class="sub-title">编辑项目</div>
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
                            <el-input v-model="formData.amount" style="width: 80%;float: left;" disabled></el-input>
                            <span style="margin-left: 14px;">元</span>
                        </el-form-item>

                        <el-form-item label="回馈标准：">
                            <span style="float: left;">资助1元回馈</span>
                            <el-input v-model="formData.refundStd"
                                      style="width: 50%;float: left;margin-left: 10px;margin-right: 10px"
                                      disabled></el-input>
                            <span style="margin-left: 14px;">{{assetsUnitName}}</span>
                        </el-form-item>
                        <el-form-item>

                        </el-form-item>
                        <br>
                        <el-form-item label="缩略图：" style="margin-right: 10px" class="image">
                            <Elupload @load="load"
                                      :isDetail=true
                                      :isevent=true :Info=userInfo
                            />
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
                    <Qutil ref="kindeditor" :content="formData.detail" @input="qutil"></Qutil>
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
    import Qutil from '@com/quill-editor'
    import {update, projectDetail} from '@http/project'
    import baseUrl from '@/http/baseUrl'
    import Elupload from '@com/el-upload'
    import {mapState} from "vuex";

    export default {
        name: "teamDetail",
        data() {
            return {
                imgs: [],
                fileList: [],
                baseUrl: baseUrl,
                imageUrl: '',
                dialogImageUrl: '',
                headers: {},
                formData: {},
                activeName: "0",
                isDetail: true,
                assetsUnitName: '',
                event: true
            }
        },
        components: {
            Qutil,
            Elupload
        },
        computed: {
            ...mapState({
                userInfo: state => state.baseData.eventupdate,
            })
        },
        methods: {
            back() {
                this.$store.dispatch('mecha_asset/setEvent', 1)
                this.$router.go(-1)
            },

            async save() {
                console.log(this.formData.image);
                if (this.formData.image === '') {
                    this.$tools.$mes('图片没上传到服务器，无法提交发布', 'warning')
                    return false
                }
                console.log(this.formData);
                let {amount, detail, image, name, phone, projectId, refundStd} = this.formData
                let obj = {
                    amount: amount,
                    detail: detail,
                    image: image,
                    name: name,
                    phone: phone,
                    projectId: projectId,
                    refundStd: refundStd,
                }
                console.log(obj);
                let res = await update(obj)
                if (res && res.code === 1000) {
                    this.$tools.$mes('操作成功', 'success')
                    this.$emit('init')
                    this.back()
                }
            },
            qutil(data) {
                this.formData.detail = data
            },
            load(data) {
                console.log(data);
                this.formData.image = data
                console.log(this.formData.image);
            },
            async init() {
                this.assetsUnitName = JSON.parse(
                    sessionStorage.getItem("userInfo")
                ).assetsUnitName;
                console.log(this.userInfo);
                let res = await projectDetail(this.userInfo.projectId)
                this.formData = await res.data
            }
        },
        created() {
            this.init()
        }
    }
</script>

<style scoped lang="less">
    .el-image {
        width: 300px;
        height: 150px;
    }

    .my-block {
        /deep/ .successImg {
            width: 618px;
            height: 218px;
        }
    }
</style>
