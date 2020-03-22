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
                                <div>用户名称</div>
                            </el-form-item>
                            <el-form-item label="活动名称：">
                                <div>用户名称</div>
                            </el-form-item>
                            <el-form-item label="活动价值：">
                                <div>用户名称</div>
                            </el-form-item>
                            <el-form-item label="状态： ">
                                <div>用户名称</div>
                            </el-form-item>
                            <el-form-item label="服务方：">
                                <div>用户名称</div>
                            </el-form-item>
                            <br>
                            <el-form-item label="开始时间：">
                                <div>用户名称</div>
                            </el-form-item>
                            <el-form-item label="活动时长：">
                                <div>用户名称</div>
                            </el-form-item>


                        </el-form>

                    </el-col>
                </el-row>
            </div>
            <div class="my-block">
                <el-row :gutter="20">

                    <el-col :span="12" class="el-right">
                        <div class="time-address">
                            <div class="co-fl">
                                <p>签到时间 ：</p>
                                <p>1019-19-19 64-4654-49894</p>
                            </div>
                            <div class="co-fl">
                                <p>签到地点 ：</p>
                                <p>1019-19-19 64-4654-49894</p>
                            </div>
                        </div>
                        <div class="map">
                            <Map />

                        </div>
                    </el-col>
                    <el-col :span="12" class="el-right">
                        <div class="time-address">
                            <div class="co-fl">
                                <p>签到时间 ：</p>
                                <p>1019-19-19 64-4654-SSSSS</p>
                            </div>
                            <div class="co-fl">
                                <p>签到地点 ：</p>
                                <p>1019-19-19 64-4654-49894</p>
                            </div>
                        </div>
                        <div class="map">
                            <Map2 />
                        </div>
                    </el-col>

                    <div class="title">
                        <div class="left">签退备注 :</div>
                        <div class="right">
                            <div>用户名称</div>
                            <div class="imgList">
                                <el-image :src="src"></el-image>
                                <el-image :src="src"></el-image>
                                <el-image :src="src"></el-image>
                                <el-image :src="src"></el-image>
                            </div>
                        </div>
                    </div>


                </el-row>
            </div>
            <div class="my-block">
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
            <div class="my-block">
                <el-row type="flex" class="row-bg" justify="space-around">
                    <el-col :span="6">
                        <el-button type="warning" @click="isShow=false">处理争议</el-button>
                    </el-col>
                    <el-col :span="6">
                        <el-button type="info">返回</el-button>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div class="deal" v-else>
            <div class="my-block">
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
            <div class="my-block">
                <el-row type="flex" class="row-bg" justify="space-around">
                    <el-col :span="6">
                        <el-button type="warning" @click="isShow=true">提交处理结果</el-button>
                    </el-col>
                    <el-col :span="6">
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

    export default {
        name: "teamDetail",
        data() {
            return {
                isShow: true,
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
                },
                value1: null,

            }
        },
        components: {
            Map,
            Map2
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

        .co-fl {
            flex: 1;

            p {
                display: inline-block;
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
    .name{
        display: inline-block;
        position: absolute;
        margin-top: 3px;
    }
    .el-avatar--circle{
        margin-top: -3px;
    }
</style>