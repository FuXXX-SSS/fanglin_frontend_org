<template>
    <div>
        <div class="my-block">
            <div class="sub-title">发布项目</div>
            <el-row :gutter="20">

                <el-col :span="12">
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
                            <el-input v-model="formData.phone"></el-input>

                        </el-form-item>
                        <el-form-item label="募资目标：">
                            <el-input v-model="formData.targetAmount"></el-input>
                        </el-form-item>

                        <el-form-item label="回馈标准：">
                            <el-input v-model="formData.refundStd"></el-input>
                        </el-form-item>
                        <el-form-item>

                        </el-form-item>
                        <br>
                        <el-form-item label="缩略图：" style="margin-right: 10px">
                            <Elupload @load="load"/>
                        </el-form-item>
                    </el-form>

                </el-col>
            </el-row>
            <Quill @qutil="qutil"/>

        </div>
        <div class="my-block">
            <el-row type="flex" class="row-bg" justify="center">

                <el-col :span="3">
                    <el-button type="warning" @click="save()">保存</el-button>
                </el-col>
                <el-col :span="3">
                    <el-button type="success">关闭/开启</el-button>
                </el-col>
                <el-col :span="3">
                    <el-button type="info" @click="back">返回</el-button>
                </el-col>
            </el-row>
        </div>

    </div>
</template>

<script>
    import Quill from '@com/quill-editor'
    import {projectpublish} from '@http/project'
    import baseUrl from '@/http/baseUrl'
    import Elupload from '@com/el-upload'

    export default {
        name: "teamDetail",
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
        components: {
            Quill,
            Elupload
        },
        methods: {
            back() {
                this.$store.dispatch('mecha_asset/setEvent', 1)
            },

            async save() {
                console.log(this.formData);
                let res = await projectpublish(this.formData)
                if (res && res.code === 1000) {
                    this.$tools.$mes('保存成功', 'success')
                    // this.back()
                }
            },
            qutil(data) {
                this.formData.detail = data
            },
            load(data) {
                this.formData.image = data
            },

        },
        created() {
        }
    }
</script>

<style scoped>
    .el-image {
        width: 300px;
        height: 150px;
    }
</style>