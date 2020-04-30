<template>
    <div>
        <div class="detail" v-if="isShow">
            <div class="my-block">
                <div class="sub-title">服务详情</div>
                <el-row :gutter="20">

                    <el-col :span="24" class="el-right">
                        <el-form
                                :inline="true"
                                :model="formData"
                                size="small"
                                class="demo-form-inline"
                        >
                            <el-form-item label="服务编号 : ">
                                <div>{{formData.serviceNo}}</div>
                            </el-form-item>
                            <el-form-item label="活动名称：">
                                <div>{{formData.activityName}}</div>
                            </el-form-item>
                            <el-form-item label="活动价值：">
                                <div>{{formData.value}}</div>
                            </el-form-item>
                            <el-form-item label="状态： ">
                                {{formData.serviceStatus===0?'未完成' :
                                formData.serviceStatus===1?'已完成':
                                formData.serviceStatus===2?'已结算':
                                formData.serviceStatus===3?'争议':
                                '未知'}}
                            </el-form-item>
                            <br>
                            <el-form-item label="服务方：">
                                <div>{{formData.serviceName}}</div>
                            </el-form-item>
                            <el-form-item label="开始时间：">
                                <div>{{formData.beginTime}}</div>
                            </el-form-item>
                            <el-form-item label="活动时长：">
                                <div>{{formData.duration}}</div>
                            </el-form-item>


                        </el-form>

                    </el-col>
                </el-row>
            </div>
            <div class="my-block block_bot">
                <el-row :gutter="20">
                    <!--you-->
                    <el-col :span="12" class="el-right">
                        <div class="time-address">
                            <div class="co-fl">
                                <p>签到时间 ：</p>
                                <p>{{formData.checkInTime}}</p>
                            </div>
                        </div>
                        <div class="co-fl ">
                            <p>签到地点：</p>
                            <p class="address_right">{{formData.checkInAddress}}</p>
                        </div>
                        <div class="map">
                            <Map :checkInCo="formData.checkInCo" :userInfo="userInfo"/>

                        </div>
                    </el-col>
                    <!--                    zuo-->
                    <el-col :span="12" class="el-right">
                        <div class="time-address">
                            <div class="co-fl">
                                <p>签到时间 ：</p>
                                <p>{{formData.checkOutTime}}</p>
                            </div>
                        </div>
                        <div class="co-fl">
                            <p>签到地点 ：</p>
                            <p class="address_left">{{formData.checkInAddress}}</p>
                        </div>
                        <div class="map">
                            <Map2 :checkInfo="formData.checkOutCo"/>
                        </div>
                    </el-col>

                    <div class="title">
                        <div class="left">签退备注 :
                            <div style="display: inline-block;color: #8c939d;margin-left: 10px">{{formData.checkOutDesc}}</div>
                        </div>
                        <!--                        <div class="right">-->
                        <!--                            <div>用户名称</div>-->
                        <!--                            <div class="imgList">-->
                        <!--                                <el-image :src="src"></el-image>-->
                        <!--                                <el-image :src="src"></el-image>-->
                        <!--                                <el-image :src="src"></el-image>-->
                        <!--                                <el-image :src="src"></el-image>-->
                        <!--                            </div>-->
                        <!--                        </div>-->
                    </div>


                </el-row>
            </div>
            <div class="my-block ">
                <el-form
                        :inline="true"
                        :model="formData"
                        size="small"
                        class="demo-form-inline"
                >
                    <el-form-item label="实际支付： ">
                        <div>用户名称</div>
                    </el-form-item>
                    <el-form-item label="总计：">
                        <div>用户名称</div>
                    </el-form-item>
                    <el-form-item label="服务评价：">
                        <el-rate v-model="value1"></el-rate>
                    </el-form-item>
                    <br>
                    <el-form-item label="评价内容： ">
                        <div>用户名称</div>
                    </el-form-item>


                </el-form>

            </div>
            <div class="my-block block_bot">
                <el-row type="flex" class="row-bg" justify="center">
                    <el-col :span="5">
                        <el-button type="warning" @click="isShow=false">处理争议</el-button>
                    </el-col>
                    <el-col :span="3" :offset="1">
                        <el-button type="info" @click="back">返回</el-button>

                    </el-col>
                </el-row>
            </div>
        </div>
        <div class="deal" v-else>
            <div class="my-block block_bot">
                <el-form
                        :inline="false"
                        :model="formData"
                        size="small"
                        class="demo-form-inline"
                >
                    <el-form-item label="申请人 : ">

                        <el-avatar
                                src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                        <span style="display: inline-block" class="name">用户名称</span>

                    </el-form-item>
                    <el-form-item label="说明：">
                        <div>用户名称</div>
                    </el-form-item>
                    <el-form-item label="凭证：">
                        <div class="imgList">
                            <el-image :src="src"></el-image>
                            <el-image :src="src"></el-image>
                            <el-image :src="src"></el-image>
                            <el-image :src="src"></el-image>
                        </div>
                    </el-form-item>
                    <el-form-item label="处理结果： ">
                        <div style="display: flex">
                            <el-input
                                    type="textarea"
                                    :autosize="{ minRows: 6, maxRows: 8}"
                                    placeholder="请输入内容"
                                    v-model="formData.textarea2"
                            >
                            </el-input>
                        </div>


                    </el-form-item>
                </el-form>
            </div>
            <div class="my-block block_bot">
                <el-row type="flex" class="row-bg" justify="center">
                    <el-col :span="5">
                        <el-button type="warning" @click="isShow=true">提交处理结果</el-button>
                    </el-col>
                    <el-col :span="3" :offset="1">
                        <el-button type="info" @click="isShow=true">返回</el-button>
                    </el-col>
                </el-row>
            </div>

        </div>
    </div>
</template>

<script>
    import Map from '@com/map-QQ'
    import Map2 from '@com/map-QQ/index2'
    import {serviceDetail} from '@http/order'
    import {mapState} from "vuex";

    export default {

        name: "teamDetail",
        data() {
            return {
                isShow: true,
                formData: {},
                src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
                tableData: {
                    records: []
                },
                value1: null,
            }
        },
        components: {
            Map,
            Map2
        },
        computed: {
            ...mapState({
                userInfo: state => state.baseData.OrderData,
            })
        },
        methods: {
            back() {
                this.$router.go(-1)
            },
            async init() {
                let res = await serviceDetail(this.userInfo.id)
                this.formData = res.data
                var checkInAddress = ''
                var geocoder = new qq.maps.Geocoder({
                    complete: function (result) {
                        checkInAddress = result.detail.address
                        document.getElementsByClassName('address_right')[0].innerHTML = checkInAddress
                    }
                });
                var geocoder2 = new qq.maps.Geocoder({
                    complete: function (result) {
                        checkInAddress = result.detail.address
                        document.getElementsByClassName('address_left')[0].innerHTML = checkInAddress
                    }
                });
                let info = res.data.checkInCo
                let info2 = res.data.checkOutCo
                var myLatlng = new qq.maps.LatLng(info.split(",")[0], info.split(",")[1]);
                var myLatlng2 = new qq.maps.LatLng(info2.split(",")[0], info2.split(",")[1]);
                geocoder.getAddress(myLatlng)
                geocoder2.getAddress(myLatlng2)
                this.formData.checkInAddress = checkInAddress
            },
        },
        created() {
            this.init()
        }
    }
</script>

<style lang="less" scoped>
    .el-image {
        width: 100%;
        height: 380px;
    }

    .time-address {
        display: flex;
        align-self: center;
        justify-content: space-between;


    }
    .co-fl {
        p {
            display: inline-block;
            &:nth-child(2){
                color: #8e9aac;
            }
        }
    }
    .imgList {
        padding: 18px 10px;

        .el-image {
            margin-right: 25px;
            margin-bottom: 10px;
            flex: 1;
            width: 150px;
            height: 150px;
        }
    }

    .title {
        padding: 0px 10px;

        .left, .right {
            display: inline-block;
            margin-right: 20px;
            float: left;
            margin-top: 30px;
        }

        .right {
        }
    }

    .name {
        display: inline-block;
        position: absolute;
        margin-top: 3px;
    }

    .el-avatar--circle {
        margin-top: -3px;
    }

    .address_right, .address_left {
    }
</style>
