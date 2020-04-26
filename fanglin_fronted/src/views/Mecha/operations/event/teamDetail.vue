<template>
    <div>
        <div class="my-block">
            <div class="sub-title">项目详情</div>
            <el-row :gutter="20">

                <el-col :span="8">
                    <el-form
                            :inline="true"
                            :model="formData"
                            size="small"
                            class="demo-form-inline"
                    >
                        <el-form-item label="项目名称 : ">
                            <div>{{formData.name}}</div>

                        </el-form-item>

                        <br>
                        <el-form-item label="缩略图：" style="margin-right: 10px">
                            <el-image :src="formData.image"></el-image>
                        </el-form-item>
                    </el-form>

                </el-col>
                <el-col :span="16">
                    <el-form
                            :inline="true"
                            :model="formData"
                            size="small"
                            class="demo-form-inline"
                    >
                        <el-form-item label="发布时间：">
                            <div>{{formData.beginTime}}</div>

                        </el-form-item>
                        <el-form-item label="联系电话：">
                            <div>{{formData.phone}}</div>
                        </el-form-item>

                        <el-form-item label="募资目标：">
                            <div>{{formData.value}}</div>

                        </el-form-item>
                        <br>

                        <el-form-item label="回馈标准：">
                            <div>{{formData.position}}</div>
                        </el-form-item>
                        <el-form-item label="项目状态：">
                            <div>{{formData.projectStatus===1?'开启':'关闭'}}</div>
                        </el-form-item>

                        <el-form-item label="所属项目：">
                            <div>{{formData.projectName}}</div>
                        </el-form-item>
                        <br>

                        <el-form-item label="人员要求：">
                            <div>{{formData.userNum}}
                                {{formData.gender===1?'男':formData.gender===0?'女':'未知'}}
                                {{formData.idCert?'实名认证':'未实名认证'}}
                                <p
                                        v-for="(item,index) in formData.serviceCategoryList"
                                        :key="index+'1'"
                                        style="display: inline-block;margin: 0;margin-right: 10px"
                                >
                                    {{item.name}}
                                </p>
                            </div>

                        </el-form-item>
                    </el-form>
                </el-col>

            </el-row>

        </div>
        <div class="my-block">
            <div class="sub-title">进展&执行</div>

            <el-row :gutter="20">

                <el-col :span="20">
                    <el-form
                            :inline="true"
                            :model="formData"
                            size="small"
                            class="demo-form-inline"
                    >

                        <el-form-item label="募集金额 : ">
                            <div>{{formData.donatedAmount}}</div>
                        </el-form-item>
                        <el-form-item label="捐赠人数 : ">
                            <div>{{formData.donatedUserCount}}</div>
                        </el-form-item>
                        <el-form-item label="回馈 : ">
                            <div>{{formData.assetsUnitName}}</div>
                        </el-form-item>
                        <br>

                        <el-form-item label="活动次数 : ">
                            <div>{{formData.activityCount}}</div>
                        </el-form-item>
                        <el-form-item label="活动人次 : ">
                            <div>{{formData.activityUserCount}}</div>
                        </el-form-item>
                        <el-form-item label="服务时长 : ">
                            <div>{{formData.serviceDuration}}</div>
                        </el-form-item>
                        <el-form-item label="执行说明 : ">
                            <Qutil :description="des" @qutil="qutil"/>
                        </el-form-item>

                    </el-form>

                </el-col>
            </el-row>

        </div>


        <div class="my-block">
            <el-row type="flex" class="row-bg" justify="center">
                <el-col :span="3">
                    <el-button type="success" @click="save">保存</el-button>
                </el-col>
                <el-col :span="3">
                    <el-button type="primary" @click="recommend">推荐</el-button>
                </el-col>
                <el-col :span="3">
                    <el-button type="warning" @click="detailUpate">编辑</el-button>
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
    import {projectDetail, description} from '@http/project'

    export default {
        props: {
            userInfo: {
                type: Object,
            }
        },
        name: "teamDetail",
        data() {
            return {
                formData: {},
                tableData: {},
                des: ''
            }
        },
        components: {
            Qutil
        },
        methods: {
            back() {
                this.$store.dispatch('mecha_asset/setEvent', 1)
            },
            async init() {
                let res = await projectDetail(this.userInfo.projectId)
                this.formData = res.data
                this.des = res.data.description
                this.projectStatus = res.data.userStatus
                this.projectStatus === 1 ? this.projectStatus = true : this.projectStatus = false
            },
            qutil(data) {
                console.log(data);
                this.des = data
            },
            async save() {
                let obj = {
                    description: this.des,
                    projectId: this.userInfo.projectId,
                }
                let res = await description(obj)
                if (res && res.code === 1000) {
                    this.$tools.$mes('修改成功', 'success')
                    this.init()
                }
            },
            detailUpate() {
                this.$store.dispatch('mecha_asset/setEvent', 3)
            },
            recommend() {
                let obj = {
                    rfid: this.formData.projectId,
                    type: 3,
                    title: this.formData.name
                }
                this.$store.dispatch('recommend/setReco', obj)
                this.$router.push({
                    name: "recommend",
                });
            }
        },
        created() {
            this.init()
        }
    }
</script>

<style scoped>
    .el-form-item {
    }

    .el-image {
        width: 300px;
        height: 150px;
    }
</style>