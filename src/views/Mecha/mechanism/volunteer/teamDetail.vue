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
                            <div>{{formData.serviceDuration}}小时</div>
                        </el-form-item>
                        <br>
                        <el-form-item label="服务次数 : ">
                            <div>{{formData.serviceTime}}</div>
                        </el-form-item>
                        <el-form-item label="评分 : ">
                            <div>{{formData.score.toFixed(2)}}</div>
                        </el-form-item>
                        <el-form-item label="实名认证 : ">
                            <div>{{formData.cert?'是':'否'}}</div>
                        </el-form-item>
                        <el-form-item label="专长 : ">
                            <div v-for="(item,index) in formData.serviceCategories" :key="index+1"
                                 style="display: inline-block;margin-right: 10px">{{item.name}}
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
                <el-table-column label="培训时长">
                    <template slot-scope="scope">
                        <input type="text"
                               class="elInput"
                               onkeyup="value=value.match(/\d+\.?\d{0,2}/,'')"
                               v-model="scope.row.trainDuration"
                               v-if="scope.row.certStatus===0"
                        />
                        <p v-else>{{scope.row.trainDuration}}小时</p>
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="状态">
                    <template slot-scope="scope">
                        {{ scope.row.certStatus===1 ? "已认证" :'未认证' }}
                    </template>
                </el-table-column>

                <el-table-column prop="instName" label="认证机构">
                    <template slot-scope="scope">
                        <p v-if=" scope.row.certStatus===1"> {{scope.row.instName}}</p>
                    </template>
                </el-table-column>
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
                    <el-button type="success" @click="userCheck">移出</el-button>
                </el-col>
                <el-col :span="3">
                    <el-button type="primary" @click="diaLog">转账</el-button>

                </el-col>
                <el-col :span="3">
                    <el-button type="warning" @click="recommend">推荐</el-button>
                </el-col>
                <el-col :span="3">
                    <el-button type="info" @click="back">返回</el-button>
                </el-col>
            </el-row>
        </div>
        <DiaLog
                :dialogVisible="dialogVisible"
                @diaLog="diaLog"
                :form="walletURL"
                @Sure="Sure()"
                :title="title"
        />
    </div>
</template>

<script>
    import {userDetail, userQuaCertPost, userJoinInfo, userQuaInfo, userCheckGet} from '@http/user'
    import DiaLog from '@com/dia-log'
    import md5 from 'js-md5'
    import {walletURL, commonTrade} from '@http/common'
    import {instDetail} from '@http/inst'
    import {mapState} from "vuex";

    export default {

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
                info: '',
                walletURL: {},
                title: '转账',
                trainDuration: 0,
                instName: ''
            }
        },
        computed: {
            ...mapState({
                userInfo: state => state.baseData.volunteerData,
            })
        },
        methods: {
            change(e) {
                console.log(e);
            },

            back() {
                this.$router.go(-1)
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
                this.instName = JSON.parse(sessionStorage.getItem("userInfo")).instName
            },
            async quaClick(data) {
                let certStatus = ''
                data.certStatus === 1 ? certStatus = 0 : certStatus = 1
                let obj = {
                    certStatus: certStatus,
                    quaId: data.id,
                    trainDuration: data.trainDuration || 0,
                }
                let res = await userQuaCertPost(obj)
                if (res && res.code === 1000) {
                    this.$tools.$mes('修改成功', 'success')
                    this.userQuaInfo()
                }
            },
            async userCheck() {
                let obj = {
                    checkStatus: 3,
                    userId: this.userInfo.userId,

                }
                let res = await userCheckGet(obj)
                if (res && res.code === 1000) {
                    this.$tools.$mes('修改成功', 'success')
                    this.back()
                }
            },
            async diaLog() {
                this.dialogVisible = !this.dialogVisible
                let res = await walletURL(`${0}/${this.userInfo.userId}`)
                this.walletURL = res.data
            },
            async Sure(msg) {
                if (msg[1] === 1) {
                    let res = await instDetail(JSON.parse(sessionStorage.getItem("userInfo")).instId)
                    let obj = {
                        amount: msg[0].amount,
                        billType: 0,
                        password: md5(msg[0].password + "fanglin"),
                        receiveType: 0,
                        receiveWalletUrl: msg[0].walletURL,
                    }
                    let res2 = await commonTrade(obj)
                    if (res2 && res.code === 1000) {
                        let assetsUnitName = JSON.parse(
                            sessionStorage.getItem("userInfo")
                        ).assetsUnitName;
                        this.info = assetsUnitName
                    }
                }
            },
            recommend() {
                let obj = {
                    rfid: this.formData.userId,
                    type: 5,
                    title: this.formData.nickname
                }
                this.$store.dispatch('recommend/setReco', obj)
                this.$router.push({
                    name: "recommend",
                });
            }
        },
        created() {
            this.init()
            this.userQuaInfo()
        },
        components: {
            DiaLog
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

    .elInput {
        -webkit-appearance: none;
        background-color: #FFF;
        background-image: none;
        border-radius: 4px;
        border: 1px solid #DCDFE6;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        color: #606266;
        display: inline-block;
        font-size: inherit;
        height: 40px;
        line-height: 40px;
        outline: 0;
        padding: 0 15px;
        -webkit-transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
        transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
        width: 100%;
        height: 32px;
        line-height: 32px;
    }
</style>
