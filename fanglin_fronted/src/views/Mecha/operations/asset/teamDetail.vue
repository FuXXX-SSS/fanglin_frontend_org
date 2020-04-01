<template>
    <div>
        <div class="my-block">
            <div class="sub-title">活动详情</div>
            <el-row :gutter="20">

                <el-col :span="8">
                    <el-form
                            :inline="true"
                            :model="formData"
                            size="small"
                            class="demo-form-inline"
                    >
                        <el-form-item label="活动名称 : ">
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
                        <el-form-item label="开始时间：">
                            <div>{{formData.beginTime}}</div>

                        </el-form-item>
                        <el-form-item label="时长：">
                            <div>{{formData.duration}}</div>

                        </el-form-item>
                        <el-form-item label="联系电话：">
                            <div>{{formData.phone}}</div>
                        </el-form-item>
                        <br>

                        <el-form-item label="活动价值：">
                            <div>{{formData.value}}</div>

                        </el-form-item>
                        <el-form-item label="地点：" style="margin-right: 10px">
                            <div>{{formData.position}}</div>
                        </el-form-item>
                        <el-form-item>
                            <i class="el-icon-s-opportunity" style="font-size: 18px;color: #0099ff;cursor: pointer"></i>
                        </el-form-item>
                        <br>

                        <el-form-item label="所属项目：">
                            <div>{{formData.projectName}}</div>

                        </el-form-item>

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
                        <br>

                        <el-form-item label="活动状态：">
                            {{formData.activityStatus===1?'开启':formData.activityStatus===0?'关闭':''}}

                        </el-form-item>
                        <el-form-item label="发布人：">
                            <div>{{formData.userName}}</div>

                        </el-form-item>

                    </el-form>
                </el-col>

            </el-row>

        </div>
        <div class="my-block">
            <div class="sub-title" style="margin-bottom: 40px">
                <div style="display: inline-block">确定人选</div>
                <div class="rightText">
                    <p>已选2人</p>
                    <p>共计支出 40积分</p>
                </div>
            </div>
            <el-table :data="tableData.records" border @selection-change="handleSelectionChange">
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column prop="name" label="申请人"/>
                <el-table-column prop="date" label="性别"/>
                <el-table-column prop="date" label="年龄"/>
                <el-table-column prop="date" label="服务时长"/>
                <el-table-column prop="date" label="服务次数"/>
                <el-table-column prop="date" label="评价"/>
                <el-table-column prop="date" label="实名认证"/>
                <el-table-column prop="date" label="专长"/>
                <el-table-column prop="date" label="申请时间"/>
            </el-table>
            <pagination/>

        </div>
        <div class="my-block">
            <el-row type="flex" class="row-bg" justify="center">
                <el-col :span="3">
                    <el-button type="warning">确定人选</el-button>
                </el-col>
                <el-col :span="3">
                    <el-button type="primary">推荐</el-button>
                </el-col>
                <el-col :span="3">
                    <el-button type="info" @click="back">返回</el-button>
                </el-col>
            </el-row>
        </div>

    </div>
</template>

<script>
    import detailBottom from '@com/detailBottom'
    import pagination from '@com/el-pagination'

    export default {
        name: "teamDetail",
        data() {
            return {
                formData: {},
                multipleSelection: [],
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
            pagination,

        },
        methods: {
            back() {
                this.$store.dispatch('mecha_asset/setAsset', 1)
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            }
        },
    }
</script>

<style scoped lang="less">
    .el-form-item {
        margin-right: 30px;
    }

    .el-image {
        width: 300px;
        height: 150px;
    }

    .rightText {
        float: right;

        p {
            display: inline-block;
            color: red;
            font-size: 16px;

            &:nth-child(1) {
                margin-right: 20px;
            }

        }
    }
</style>