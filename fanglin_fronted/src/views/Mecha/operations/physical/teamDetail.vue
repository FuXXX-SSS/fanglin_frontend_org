<template>
    <div>
        <div class="my-block">
            <div class="sub-title">现金详情</div>
            <el-row :gutter="20">

                <el-col :span="12" >
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
                            <el-input v-model="formData.totalStock" style="    width: 25%;
    float: left;"></el-input>
                            <el-input v-model="formData.unit" style="    width: 25%;
    float: left;margin-left: 10px" placeholder="单位"></el-input>
                        </el-form-item>
                        <el-form-item label="兑换标准：">
                            <el-input v-model="formData.exhAmount" style="    width: 25%;
    float: left;"></el-input>
                            <span style="margin-left: 14px;">元/芳邻点</span>
                        </el-form-item>
                        <el-form-item label="状态：">
                            <el-switch
                                    v-model="projectStatus"
                                    active-text="上架"
                                    inactive-text="下架"
                            >
                            </el-switch>
                        </el-form-item>
                        <el-form-item label="缩略图：" style="margin-right: 10px">
                            <Elupload @load="load" :isDetail=true
                                      :isUpload=true
                            />
                        </el-form-item>
                        <el-form-item label="摘要：">
                            <el-input
                                    type="textarea"
                                    :autosize="{ minRows: 2, maxRows: 4}"
                                    placeholder="请输入内容"
                                    v-model="formData.textarea2">
                            </el-input>

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
                    <Quill @qutil="qutil" :description="formData.introduction"/>
                </el-form-item>
            </el-form>

        </div>
        <div class="my-block">
            <el-row type="flex" class="row-bg" justify="center">

                <el-col :span="3">
                    <el-button  type="warning">保存</el-button>
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
    import Quill from '@com/quill-editor'
    import {exhDetail} from '@http/exh'
    import Elupload from '@com/el-upload'

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
                projectStatus: '',
                isDetail: true,
                isUpload: true
            }
        },
        components: {
            Quill,
            Elupload
        },
        methods:{
            back(){
                this.$store.dispatch('mecha_asset/setPhyscial',1)
            },
            async init() {
                let res = await exhDetail(this.userInfo.id)
                this.formData = res.data
                console.log(this.formData);
                this.projectStatus = res.data.goodsStatus
                this.projectStatus === 1 ? this.projectStatus = true : this.projectStatus = false
            },
            load(data) {
                this.formData.image = data
            },
            qutil(data) {
                this.formData.introduction = data
            },
            recommend() {
                let obj = {
                    rfid: this.formData.id,
                    type: 8,
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
        console.log(123);
    }
    }
</script>

<style scoped>

    .el-image{
        width: 300px;
        height: 150px;
    }
</style>