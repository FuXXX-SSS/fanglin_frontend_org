<template>
    <div>
        <div class="my-block">
            <div class="titleDetail">成员详情</div>
            <el-row :gutter="20">
                <el-col :span="4" class="el-left">
                    <el-avatar :src="formData.avatar"></el-avatar>
                </el-col>
                <el-col :span="20" class="el-right">
                    <el-form
                            :inline="true"
                            :model="formData"
                            size="small"
                            class="demo-form-inline"
                    >
                        <el-form-item label="姓名 : ">
                            <div>{{formData.nickname}}</div>
                        </el-form-item>
                        <el-form-item label="手机号码 : ">
                            <div class="detail_cont">{{formData.phone}}</div>
                        </el-form-item>
                        <el-form-item label="性别 : ">
                            <div class="detail_cont">{{formData.gender===1?'男':formData.gender===0?'女':'未知'}}</div>
                        </el-form-item>
                        <el-form-item label="注册时间 : ">
                            <div>{{formData.joinTime}}</div>
                        </el-form-item>
                        <el-form-item label="所在城市 : ">
                            <div>{{formData.city}}</div>
                        </el-form-item>
                        <el-form-item label="邀请人数 : ">
                            <div>{{formData.inviteNum}}</div>
                        </el-form-item>
                        <el-form-item label="服务时长 : ">
                            <div>{{formData.serviceDuration}}</div>
                        </el-form-item>
                        <br>
                        <el-form-item label="服务次数 : ">
                            <div>{{formData.serviceTime}}</div>
                        </el-form-item>
                        <el-form-item label="评分 : ">
                            <div>{{formData.score}}</div>
                        </el-form-item>
                        <el-form-item label="实名认证 : ">
                            <div>{{formData.cert===1?'是':'否'}}</div>
                        </el-form-item>
                        <el-form-item label="专长 : ">
                            <div v-for="(item,index) in formData.serviceCategories" :key="index+1"
                                 style="display: inline-block">{{item.name}}
                            </div>
                        </el-form-item>
                        <br>
                        <el-form-item label="签名 : ">
                            <div>{{formData.sign}}</div>
                        </el-form-item>
                    </el-form>

                </el-col>
            </el-row>
        </div>
        <div class="my-block">
            <div class="titleDetail">资质认证</div>
            <el-table :data="tableData.records" border>
                <el-table-column type="index" label="序号" width="50"/>
                <el-table-column prop="name" label="证件图片">
                    <template slot-scope="scope">
                        <img :src="scope.row.certImg" min-width="70" height="70"/>
                    </template>
                </el-table-column>
                <el-table-column prop="certName" label="证书名称"/>
                <el-table-column prop="trainDuration" label="培训时长"/>
                <el-table-column prop="name" label="状态">
                    <template slot-scope="scope">
                        {{ scope.row.certStatus===1 ? "已认证" :'未认证' }}
                    </template>
                </el-table-column>

                <el-table-column prop="instName" label="认证社区"/>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                                @click="quaClick(scope.row)"
                                type="text"
                                size="small"
                        > {{ scope.row.certStatus===1 ? "取消认证" :'认证' }}
                        </el-button
                        >
                    </template>
                </el-table-column>

            </el-table>
        </div>
        <div class="my-block">
            <el-row type="flex" class="row-bg" justify="center">
                <el-col :span="3">
                    <el-button type="success" @click="back">移出</el-button>
                </el-col>
                <el-col :span="3">
                    <el-button type="primary">转账</el-button>
                </el-col>
                <el-col :span="3">
                    <el-button type="warning">推荐</el-button>
                </el-col>
                <el-col :span="3">
                    <el-button type="info" @click="back">返回</el-button>
                </el-col>
            </el-row>
        </div>

    </div>
</template>

<script>
    import {userDetail, userQuaCertPost, userJoinInfo, userQuaInfo} from '@http/user'


    export default {
        props: {
            userInfo: {
                type: Object,
            }
        },
        name: "teamDetail",
        data() {
            return {
                src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
                tableData: {
                    records: []
                },
                formData: {},
                jointGroupList: [],
                jointInstList: [],
                quanInfoList: [],
                dialogVisible: false,
                projectStatus: '',
                walletURL: {}
            }
        },
        methods: {
            back() {
                this.$emit('Godetail')
            },
            async init() {
                let res = await userDetail(this.userInfo.userId)
                this.formData = res.data
                this.projectStatus = res.data.userStatus
                this.projectStatus === 1 ? this.projectStatus = true : this.projectStatus = false
            },
            async userQuaInfo() {
                let res = await userQuaInfo(this.userInfo.userId)
                console.log(res);
                if (res.data.list !== null) {
                    this.tableData.records = res.data
                } else {
                    this.tableData.records = []
                }
            },
            async quaClick(data) {
                console.log(data);
                let obj = {
                    certStatus: data.certStatus,
                    quaId: data.instId,
                    trainDuration: data.trainDuration,
                }
                console.log(obj);
                let res = await userQuaCertPost(obj)
                if (res && res.code === 1000) {
                    this.$tools.$mes('修改成功', 'success')
                    this.userQuaInfo()
                }
            }
        },
        created() {
            this.init()
            this.userQuaInfo()
        }
    }
</script>

<style scoped lang="less">
    .el-form-item {
        margin-right: 50px;
    }

    .el-avatar {
        width: 132px;
        height: 132px;
    }

    .el-image {
        text-align: center;
    }

    .detail {
        /deep/ .el-image {
            height: 150px;
        }
    }


    .imgList {
        display: inline-block;

        .block {
            float: left;
            margin-right: 15px;

            span {
                display: block;
                text-align: center;
            }
        }
    }

    .demonstration {
        display: block;
        text-align: center;
    }
</style>