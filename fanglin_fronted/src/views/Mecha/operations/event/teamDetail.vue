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

                        <el-form-item label="回馈标准：" >
                            <div>{{formData.position}}</div>
                        </el-form-item>
                        <el-form-item label="项目状态：" >
                            <div>{{formData.position}}</div>
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
            <el-row :gutter="20">

                <el-col :span="20">
                    <el-form
                            :inline="true"
                            :model="formData"
                            size="small"
                            class="demo-form-inline"
                    >
                        <el-form-item label="项目进展 : ">
                            <div>{{formData.name}}</div>
                        </el-form-item>
                        <el-form-item label="募集金额 : ">
                            <div>{{formData.name}}</div>
                        </el-form-item>
                        <el-form-item label="捐赠人数 : ">
                            <div>{{formData.name}}</div>
                        </el-form-item>
                        <el-form-item label="回馈 : ">
                            <div>{{formData.name}}</div>
                        </el-form-item>
                        <br>
                        <el-form-item label="执行情况 : ">
                            <div>{{formData.name}}</div>
                        </el-form-item>
                        <el-form-item label="活动次数 : ">
                            <div>{{formData.name}}</div>
                        </el-form-item>
                        <el-form-item label="活动人次 : ">
                            <div>{{formData.name}}</div>
                        </el-form-item>
                        <el-form-item label="服务时长 : ">
                            <div>{{formData.name}}</div>
                        </el-form-item>
                        <el-form-item label="执行说明 : ">
                            <Qutil/>
                        </el-form-item>

                    </el-form>

                </el-col>
            </el-row>

        </div>


        <div class="my-block">
            <el-row type="flex" class="row-bg" justify="center">
                <el-col :span="3">
                    <el-button type="success">保存</el-button>
                </el-col>
                <el-col :span="3">
                    <el-button type="warning">编辑</el-button>
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
        components: {
            Qutil
        },
        methods: {
            back() {
                this.$store.dispatch('mecha_asset/setEvent', 1)
            },
        },
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