<template>
    <div>
        <div class="my-block">
            <div class="sub-title">推荐</div>
            <el-row :gutter="20">

                <el-col :span="24" class="el-right">
                    <el-form
                            :inline="false"
                            :model="formData"
                            label-width="80px"
                            size="small"
                            class="demo-form-inline"
                    >

                        <el-form-item label="原标题 : ">
                            <div>{{formData.oriTitle}}</div>
                        </el-form-item>
                        <el-form-item label="推荐标题 : ">
                            <el-input v-model="formData.title"></el-input>
                        </el-form-item>
                        <el-form-item label="推荐栏目">
                            <el-select filterable v-model="formData.columnId">
                                <el-option
                                        :label="i.name"
                                        :value="i.id"
                                        v-for="i in column"
                                        :key="i.id"
                                ></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="推荐图片 : ">
                            <Elupload @load="avatar"
                                      :isDetail=true
                            />
                        </el-form-item>
                        <el-form-item label="推荐链接 : ">
                            <el-input v-model="formData.url"></el-input>
                        </el-form-item>
                        <el-form-item label="推荐摘要 : ">
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
        </div>
        <div class="my-block block_bot">
            <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="6">
                    <el-button type="warning" @click="save()">保存</el-button>

                </el-col>
                <el-col :span="6">
                    <el-button type="info" @click="back">返回</el-button>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import Elupload from '@com/el-upload'

    import {Stidlist} from '@http/inst'
    import {recommendUp} from '@http/recommend'

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
                src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
                imageUrl: '',
                column: [],
                isDetail: true,
                isUpload: true

            }
        },
        components: {            Elupload,
        },
        methods: {
            avatar(data) {
                this.formData.avatar = data
            },
            back() {
                this.$emit('Godetail')
            },
            async init() {
                let res3 = await Stidlist()
                this.formData = this.userInfo
                this.column = res3.data
            },
            async save() {

                let res = await recommendUp(this.formData)
                if (res && res.code === 1000) {
                    this.$tools.$mes('推荐成功', 'success')
                    this.back()
                }
            },
        },
        created() {
            this.init()
        }
    }
</script>

<style scoped>
    .el-image {
        width: 300px;
        height: 150px;
    }

    .el-divider--horizontal {
        margin: 0 0 20px 0;
    }

    .my-block
    /deep/ .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .my-block
    /deep/ .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }



    .my-block
    /deep/ .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }

</style>