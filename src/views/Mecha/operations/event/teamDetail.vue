<template>
    <div>
        <div class="my-block">
            <div class="sub-title" style="margin-bottom: 40px">
                <div style="display: inline-block;">项目详情</div>
                <el-switch
                        style="display: inline-block;float: right"
                        v-model="projectStatus"
                        active-text="开通"
                        inactive-text="关闭"
                        @change="switchChange(projectStatus)"
                >
                </el-switch>
            </div>
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
                            <div>{{formData.publishTime}}</div>

                        </el-form-item>
                        <el-form-item label="联系电话：">
                            <div>{{formData.phone}}</div>
                        </el-form-item>

                        <el-form-item label="募资目标：">
                            <div>{{formData.amount}}元</div>

                        </el-form-item>
                        <br>

                        <el-form-item label="回馈标准：">
                            <div>资助1元回馈{{formData.refundStd}}{{formData.assetsUnitName}}</div>

                        </el-form-item>
<!--                        <el-form-item label="项目状态：">-->
<!--                            <div>{{formData.projectStatus===1?'开启':'关闭'}}</div>-->
<!--                        </el-form-item>-->

                        <!--                        <el-form-item label="所属项目：">-->
                        <!--                            <div>{{formData.projectName}}</div>-->
                        <!--                        </el-form-item>-->
                        <br>

                        <!--                        <el-form-item label="人员要求：">-->
                        <!--                            <div>{{formData.userNum}}-->
                        <!--                                {{formData.gender===1?'男':formData.gender===0?'女':'未知'}}-->
                        <!--                                {{formData.idCert?'实名认证':'未实名认证'}}-->
                        <!--                                <p-->
                        <!--                                        v-for="(item,index) in formData.serviceCategoryList"-->
                        <!--                                        :key="index+'1'"-->
                        <!--                                        style="display: inline-block;margin: 0;margin-right: 10px"-->
                        <!--                                >-->
                        <!--                                    {{item.name}}-->
                        <!--                                </p>-->
                        <!--                            </div>-->

                        <!--                        </el-form-item>-->
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
                            <div>{{formData.donatedAmount}}元</div>

                        </el-form-item>
                        <el-form-item label="捐赠人数 : ">
                            <div>{{formData.donatedUserCount}}人</div>

                        </el-form-item>
                        <el-form-item label="回馈 : ">
                            <div>{{formData.assetsUnitName}}</div>
                        </el-form-item>
                        <br>

                        <el-form-item label="活动次数 : ">
                            <div>{{formData.activityCount}}次</div>
                        </el-form-item>
                        <el-form-item label="活动人次 : ">
                            <div>{{formData.activityUserCount}}人</div>
                        </el-form-item>
                        <el-form-item label="服务时长 : ">
                            <div>{{formData.serviceDuration}}小时</div>
                        </el-form-item>
                        <br>

                        <el-form-item label="执行说明 : ">
                            <Qutil ref="kindeditor" :content="formData.description" @input="qutil"></Qutil>
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
                    <el-button type="warning" @click="detailUpate">编辑项目</el-button>
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
    import {projectDetail, description, projectDeal} from '@http/project'
    import {mapState} from "vuex";

    export default {

        name: "teamDetail",
        data() {
            return {
                formData: {},
                tableData: {},
                des: '',
                projectStatus: '',
            }
        },
        components: {
            Qutil
        },
        computed: {
            ...mapState({
                userInfo: state => state.baseData.ProjectData,
            })
        },
        methods: {
            back() {
                this.$store.dispatch('mecha_asset/setEvent', 1)
                this.$router.go(-1)
            },
            async init() {
                let res = await projectDetail(this.userInfo.projectId)
                this.formData = await res.data
                this.des = res.data.description
                this.projectStatus = res.data.projectStatus
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
                this.formData.detail = this.des

                this.$store.dispatch('mecha_asset/setEvent', 3)
                this.$router.push({
                    name: "eventupdate",
                });
                this.$store.dispatch('baseData/seteventupdate', this.formData)
                sessionStorage.setItem("eventupdate", JSON.stringify(this.formData));
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
            },
            async switchChange(data) {
                data ? data = 1 : data = 0
                let obj = `${data}` + '/' + `${this.userInfo.projectId}`
                let res = await projectDeal(obj)
                if (res && res.code === 1000) {
                    this.$tools.$mes('操作成功', 'success')
                    this.init()
                    // this.$emit('Godetail')
                }
            },
            getContent(content) {
                console.log(content);
                this.des = content
            },
            // 编辑器内容转换成在线url
            async getcontent2Url() {
                try {
                    const htmlUrl =  await this.$refs.kindeditor.content2Url()
                    return htmlUrl
                } catch (error) {
                    console.log(error)
                }
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
        width: 343px;
        height: 109px;
    }
</style>
