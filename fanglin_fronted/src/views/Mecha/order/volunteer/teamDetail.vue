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
                            <br>
                            <el-form-item label="服务方：">
                                <div>用户名称</div>
                            </el-form-item>
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
                            <Map/>

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
                            <Map2/>
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
                <el-row type="flex" class="row-bg" justify="center">
                    <el-col :span="3">
                        <el-button type="warning" @click="isShow=false">发起争议</el-button>
                    </el-col>
                    <el-col :span="3">
                        <el-button type="info" @click="back">返回</el-button>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div class="deal" v-else>
            <div class="my-block">
                <el-form
                        :inline="true"
                        :model="formData"
                        size="small"
                        class="demo-form-inline"
                >
                    <el-form-item label="服务编号：">
                        <div>用户名称</div>
                    </el-form-item>
                    <el-form-item label="活动名称：">
                        <div>用户名称</div>
                    </el-form-item>
                    <br>
                    <el-form-item label="服务方：">
                        <div>用户名称</div>
                    </el-form-item>
                    <el-form-item label="开始时间：">
                        <div>用户名称</div>
                    </el-form-item>
                    <br>
                    <el-form-item label="争议诉求： ">
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
                    <br>
                    <el-form-item label="上传证明文件： ">
                        <el-upload
                                class="avatar-uploader"
                                action="https://jsonplaceholder.typicode.com/posts/"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload">
                            <img v-if="imageUrl" :src="imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                </el-form>
            </div>
            <div class="my-block">
                <el-row type="flex" class="row-bg" justify="center">
                    <el-col :span="3">
                        <el-button type="danger" @click="isShow=true">确定</el-button>
                    </el-col>
                    <el-col :span="3">
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
                imageUrl: '',
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
        },
        methods: {
            back() {
                this.$emit('Godetail')
            },
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            }
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
                &:nth-child(2){
                    color: #8e9aac;
                }
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
</style>
<style>
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }

    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>