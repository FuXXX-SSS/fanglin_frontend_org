<template>
    <div>
        <div class="my-block">
            <div class="sub-title">配置管理</div>
            <el-row :gutter="20">

                <el-col :span="24">
                    <el-form
                            :inline="true"
                            :model="formData"
                            size="small"
                            class="demo-form-inline"
                            label-position="left"
                    >
                        <el-form-item label="资产名称：">
                            <el-input v-model="formData.assetsUnitName" maxlength="6"
                                      show-word-limit></el-input>
                        </el-form-item>
                        <br>
                        <el-form-item label="订单结算比例：">
                            <el-form-item label="服务：" class="elform">
                                <el-input v-model="formData.serviceRate"></el-input>
                            </el-form-item>
                            <el-form-item label="实物：" class="elform">
                                <el-input v-model="formData.goodsRate"></el-input>
                            </el-form-item>
                            <el-form-item label="现金：" class="elform">
                                <el-input v-model="formData.cashRate"></el-input>
                            </el-form-item>
                        </el-form-item>
                        <br>
                        <el-row :gutter="20">
                            <el-col :span="1.5" style="font-size: 14px; color: #606266;margin-top:5px">服务系数：</el-col>
                            <el-col :span="20">
                                <el-form-item
                                        v-for="(item,index) in instServiceCoVOList"
                                        :label="item.serviceCatName"
                                        :key="index+1"
                                        class="elform"
                                >
                                    <el-input-number
                                            v-model="item.serviceCo"
                                            :min="0"
                                            :step="1"
                                            size="small"
                                            :name="item.serviceCatName"
                                    ></el-input-number>
                                </el-form-item>
                            </el-col>
                        </el-row>


                        <el-form-item label="加入方式：">
                            <el-radio v-model="formData.joinType" :label=0>自由加入</el-radio>
                            <el-radio v-model="formData.joinType" :label='1'>审核加入</el-radio>
                            <el-radio v-model="formData.joinType" :label=-1>关闭加入</el-radio>
                        </el-form-item>
                        <br>
                        <el-form-item label="发送红包：">
                            <el-checkbox v-model="formData.sendRedPacket">向完成实名认证的社区成员赠送
                                <el-input v-model="formData.redPacketAmount" style="width: 15%;" onkeyup="this.value=this.value.replace(/[^\d.]/g,'');"></el-input>
                                {{formData.assetsUnitName}}
                            </el-checkbox>
                        </el-form-item>
                        <br>

                        <el-form-item label="机构成员：">
                            <div>现有成员{{formData.instUserCount}}人，成员上限{{formData.userLimit}}人</div>
                        </el-form-item>
                        <br>

                        <el-form-item label="汇率：">
                            <div v-for="(item,index) in formData.assetsRateVOList"
                                 :key="index+1"
                            >{{item.activeUnitName}}:{{item.passiveUnitName}}={{item.passiveAmount}}:{{item.activeAmount}}
                            </div>
                        </el-form-item>
                    </el-form>

                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="center">

                <el-col :span="3">
                    <el-button type="danger" size="medium" @click="save">保存</el-button>
                </el-col>
            </el-row>
        </div>


    </div>
</template>

<script>
    import detailBottom from '@com/detailBottom'
    import Quill from '@com/quill-editor'
    import {instDetail, serviceCo, instupdate} from '@http/inst'

    export default {
        name: "teamDetail",
        data() {
            return {
                formData: {},
                instServiceCoVOList: []
            }
        },
        components: {},
        methods: {
            async init() {
                let instId = JSON.parse(
                    sessionStorage.getItem("userInfo")
                ).instId;
                let res = await instDetail(instId)
                let res2 = await serviceCo(instId)
                this.instServiceCoVOList = res2.data
                this.formData.instUserCount = res.data.instUserCount
                this.formData = res.data
                this.formData.assetsUnitName =''
                console.log(this.formData.joinType);
            },
            async save() {
                this.formData.instServiceCoVOList = this.instServiceCoVOList
                let res =await instupdate(this.formData)
                if (res && res.code === 1000) {
                    console.log(res.data);
                    this.$tools.$mes('保存成功', 'success')
                    this.init()
                }
            }
        },
        created() {
            this.init()
        }
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
        /deep/ .el-form-item__label {
            color: #8e9aac;
        }

        /deep/ .el-radio__label {
            color: #8e9aac;
        }

        /deep/ .el-checkbox__label {
            color: #8e9aac;
        }

    }

    .my-block {
        .elform {

        }
    }
</style>
