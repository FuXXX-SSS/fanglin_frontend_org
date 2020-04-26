<template>
    <div>
        <div class="my-block">
            <div class="sub-title">机构信息</div>
            <el-row :gutter="20">

                <el-col :span="12">
                    <el-form
                            :inline="false"
                            :model="formData"
                            size="small"
                            class="demo-form-inline"
                            label-width="130px"

                    >
                        <el-form-item label="机构名称 : ">
                            <el-input v-model="formData.name"
                                      show-word-limit></el-input>
                        </el-form-item>
                        <el-form-item label="机构地点 : ">
                            <el-input v-model="formData.address"></el-input>
                        </el-form-item>
                        <el-form-item label="机构公告：">
                            <el-input
                                    type="textarea"
                                    :autosize="{ minRows: 2, maxRows: 4}"
                                    placeholder="请输入内容"
                                    v-model="formData.notice">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="机构介绍：">
                            <el-input
                                    type="textarea"
                                    :autosize="{ minRows: 2, maxRows: 4}"
                                    placeholder="请输入内容"
                                    v-model="formData.introduction">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="机构banner：" style="margin-right: 10px">
                            <Banner @load="banner"
                                    :isDetail=false
                                    :isUpload=true
                            />
                        </el-form-item>

                        <el-form-item label="机构头像：" style="margin-right: 10px">
                            <Elupload @load="avatar"
                                      :isDetail=true
                                      :isUpload=true

                            />
                        </el-form-item>
                        <el-form-item label="机构二维码：" style="margin-right: 10px">
                            <el-image :src="formData.qrCode"></el-image>
                        </el-form-item>
                    </el-form>

                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="center">

                <el-col :span="3">
                    <el-button type="danger" size="medium" @click="save">保存</el-button>
                </el-col>

            </el-row>
        </div>

    </div>
</template>

<script>
    import {instDetail, serviceCo, instupdate} from '@http/inst'
    import Elupload from '@com/el-upload'
    import Banner from '@com/el-upload/banner'

    export default {
        name: "teamDetail",
        data() {
            return {
                formData: {},
                avatarCode: '',
                isDetail: true,
                isUpload: true
            }
        },
        components: {
            Elupload,
            Banner
        },
        methods: {
            async init() {
                let instId = JSON.parse(
                    sessionStorage.getItem("userInfo")
                ).instId;
                let res = await instDetail(instId)
                this.formData = res.data
            },
            banner(data) {
                this.formData.banner = data
            },
            avatar(data) {
                this.formData.avatar = data
            },
            async save() {
                console.log(this.formData);
                this.formData.instName = this.formData.name
                let res = await instupdate(this.formData)
                if (res && res.code === 1000) {
                    this.$tools.$mes('操作成功', 'success')
                    this.init()
                }
            }
        },
        created() {
            this.init()
        },
    }
</script>
<style scoped>
    .el-image {
        width: 300px;
        height: 150px;
    }
</style>
