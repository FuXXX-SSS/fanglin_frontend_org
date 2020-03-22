<template>
    <div>
        <div class="my-block">
            <div class="sub-title">实物详情</div>
            <el-row :gutter="20">

                <el-col :span="20">
                    <el-form
                            :inline="false"
                            :model="formData"
                            size="small"
                            class="demo-form-inline"
                            label-width="120px"
                    >
                        <el-form-item label="资产名称：">
                            <el-input v-model="formData.value"></el-input>

                        </el-form-item>
                        <div class="label">
                            <p class="inline">订单结算比例：</p>
                            <el-form
                                    :inline="true"
                                    :model="formData"
                                    size="small"
                                    class="demo-form-inline"
                                    style="display: inline-block"
                            >

                                <el-form-item label="服务：" class="elform">
                                    <el-input v-model="formData.value"></el-input>
                                </el-form-item>
                                <el-form-item label="实物：" class="elform">
                                    <el-input v-model="formData.value"></el-input>
                                </el-form-item>
                                <el-form-item label="现金：" class="elform">
                                    <el-input v-model="formData.value"></el-input>
                                </el-form-item>
                            </el-form>


                        </div>
                        <div class="label">
                            <p class="inline">服务系数：</p>
                            <el-form
                                    :inline="true"
                                    :model="formData"
                                    size="small"
                                    class="demo-form-inline"
                                    style="display: inline-block"
                            >

                                <el-form-item label="家政：" class="elform">
                                    <el-input v-model="formData.value"></el-input>
                                </el-form-item>
                                <el-form-item label="教育：" class="elform">
                                    <el-input v-model="formData.value"></el-input>
                                </el-form-item>
                                <el-form-item label="艺术：" class="elform">
                                    <el-input v-model="formData.value"></el-input>
                                </el-form-item>
                            </el-form>


                        </div>

                        <el-form-item label="加入方式：">
                            <el-radio v-model="formData.radio" label="1">自由加入</el-radio>
                            <el-radio v-model="formData.radio" label="2">审核加入</el-radio>
                            <el-radio v-model="formData.radio" label="2">关闭加入</el-radio>
                        </el-form-item>
                        <el-form-item label="发送红包：">
                            <el-checkbox v-model="formData.checked">备选项</el-checkbox>
                        </el-form-item>
                        <el-form-item label="机构成员：">
                            <el-input v-model="formData.value"></el-input>
                        </el-form-item>
                        <el-form-item label="汇率：">
                            <el-input v-model="formData.value"></el-input>
                        </el-form-item>
                    </el-form>

                </el-col>
            </el-row>

        </div>
        <div class="my-block">
            <el-row type="flex" class="row-bg" justify="space-around">

                <el-col :span="6">
                    <el-button type="danger">保存</el-button>
                </el-col>
            </el-row>
        </div>

    </div>
</template>

<script>
    import detailBottom from '@com/detailBottom'
    import Quill from '@com/quill-editor'

    export default {
        name: "teamDetail",
        data() {
            return {
                formData: {},
                src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
                tableData: {
                    records: [
                        {
                            date: '2016-05-02',
                            name: '王小虎',
                            address: '上海市普陀区金沙江路 1518 弄'
                        }, {
                            date: '2016-05-04',
                            name: '王小虎',
                            address: '上海市普陀区金沙江路 1517 弄'
                        }, {
                            date: '2016-05-01',
                            name: '王小虎',
                            address: '上海市普陀区金沙江路 1519 弄'
                        },]
                }

            }
        },
        components: {},
        methods: {
            back() {
                this.$store.dispatch('mecha_asset/setPhyscial', 1)
            },
        },
    }
</script>

<style scoped lang="less">

    .el-image {
        width: 300px;
        height: 150px;
    }

    .label {
        p {
            text-align: right;
            vertical-align: middle;
            font-size: 14px;
            color: #606266;
            padding: 0 12px 0 0;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            width: 120px;
        }

        .inline {
            display: inline-block;

            /deep/ .el-form-item__label {
                text-align: left;
            }

            /deep/ .el-form-item__content {
            }

        }

    }

    .elform {
        margin-top: -4px;
    }
</style>