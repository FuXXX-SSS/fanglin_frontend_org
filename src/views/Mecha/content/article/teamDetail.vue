<template>
    <div>
        <div class="my-block">
            <div class="sub-title">新增文章</div>
            <el-row :gutter="20">

                <el-col :span="12">
                    <el-form
                            :inline="false"
                            :model="formData"
                            size="small"
                            class="demo-form-inline"
                            label-width="100px"
                    >
                        <el-form-item label="文章标题 : ">
                            <el-input v-model="formData.title"></el-input>
                        </el-form-item>
                        <el-form-item label="发布栏目 : ">
                            <el-select filterable v-model="formData.columnId">
                                <el-option
                                        :label="i.name"
                                        :value="i.id"
                                        v-for="i in column"
                                        :key="i.id"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="作者 : ">
                            <el-input v-model="formData.author"></el-input>
                        </el-form-item>
                        <el-form-item label="关键字 : ">
                            <el-input v-model="formData.keywords"></el-input>
                        </el-form-item>
                        <el-form-item label="缩略图 : ">
                            <Elupload @load="load" :isDetail="true"/>
                        </el-form-item>

                        <el-form-item label="摘要 : ">
                            <el-input
                                    type="textarea"
                                    :autosize="{ minRows: 2, maxRows: 4}"
                                    placeholder="请输入内容"
                                    v-model="formData.abstractInfo">
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
                <el-form-item label="正文 : ">
                    <Qutil ref="kindeditor" :content="formData.detail" @input="qutil"></Qutil>
                </el-form-item>
            </el-form>
        </div>
        <div class="my-block">
            <el-row type="flex" class="row-bg" justify="center">
                <el-col :span="3">
                    <el-button type="warning" @click="save">保存</el-button>
                </el-col>
                <el-col :span="3">
                    <el-button type="primary">推荐</el-button>
                </el-col>
                <el-col :span="3">
                    <el-button type="info" @click="back">取消</el-button>
                </el-col>
            </el-row>
        </div>

    </div>
</template>

<script>
    import detailBottom from '@com/detailBottom'
    import Qutil from '@com/quill-editor'
    import {publish} from '@http/article'
    import baseUrl from '@/http/baseUrl'
    import {Stidlist} from '@http/inst'
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
                imgs: [],
                fileList: [],
                formData: {},
                baseUrl: baseUrl,
                imageUrl: '',
                dialogImageUrl: '',
                headers: {},
                activeName: "0",
                form: {
                    picList: []
                },
                column: [],

            }
        },
        components: {
            Qutil,
            Elupload
        },
        methods: {
            back() {
                this.$emit('Godetail')
                this.$emit('init')
                this.$router.go(-1)
            },
            load(data) {
                this.formData.image = data
            },
            init() {
                let userInfo = JSON.parse(
                    sessionStorage.getItem("userInfo")
                );
                this.headers = {
                    Authorization: userInfo.token
                };
            },
            async save() {
                console.log(this.formData);
                let res = await publish(this.formData)
                if (res && res.code === 1000) {
                    this.$tools.$mes("新增文章成功！", 'success');
                    this.back()
                }
            },
            qutil(data) {
                this.formData.detail = data
            },
            async columns() {
                let res = await Stidlist(1)
                console.log(res);
                if (res &&res.data.list !==null){
                    this.column = res.data
                }
                console.log(this.column);
            }
        },
        created() {
            this.init()
            this.columns()
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

    .my-block /deep/ .el-upload-list__item {
        width: 148px !important;
        height: 148px !important;
    }
</style>
