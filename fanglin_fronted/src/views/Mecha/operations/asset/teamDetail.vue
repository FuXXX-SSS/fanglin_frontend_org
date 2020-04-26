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
                                {{formData.gender===1?'男':formData.gender===0?'女':'性别不限'}}
                                {{formData.idCert?'实名认证':'未实名认证'}}
                                <p
                                        v-for="(item) in formData.serviceCategoryList"
                                        :key="item.id+1"
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
                    <p>已选{{totalPeople}}人</p>
                    <p>共计支出 {{totalCore}}积分</p>
                </div>
            </div>
            <el-table :data="tableData.records"
                      border
                      @selection-change="handleSelectionChange"
                      row-key="activityId+1"
                      ref="multipleTable"
            >
                <el-table-column
                        type="selection"
                        width="55"
                >
                </el-table-column>
                <el-table-column prop="userName" label="申请人"/>
                <el-table-column prop="userGender" label="性别">
                    <template slot-scope="scope">
                        {{ scope.row.userGender===1 ? "男" :'女' }}
                    </template>
                </el-table-column>
                <el-table-column prop="userAge" label="年龄"/>
                <el-table-column prop="serviceDuration" label="服务时长"/>
                <el-table-column prop="serviceTime" label="服务次数"/>
                <el-table-column prop="score" label="评价"/>
                <el-table-column prop="selected" label="实名认证"/>
                <el-table-column prop="serviceCategoryList" label="专长">
                    <template slot-scope="scope">
                        <div v-if="scope.row.serviceCategoryList!==null" style="display: inline-block">
                            <div v-for="(item) in scope.row.serviceCategoryList" :key="item.id"
                                 style="display: inline-block;margin-right: 10px">
                                {{item.name}}
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="joinTime" label="申请时间"/>
            </el-table>

        </div>
        <div class="my-block">
            <el-row type="flex" class="row-bg" justify="center">
                <el-col :span="3">
                    <el-button type="primary" @click="sure">确定人选</el-button>
                </el-col>
                <el-col :span="3">
                    <el-button type="warning" @click="recommend">推荐</el-button>
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
    import {activityDetail, select, applyList} from '@http/activity'

    let value = ''
    export default {
        props: {
            userInfo: {
                type: Object,
            }
        },
        name: "teamDetail",
        data() {
            return {
                formData: {},
                selectedVOList: [],
                tableData: {records: []},
                pageData: {},
                total: 0,
                totalPeople: 0,
                totalCore: 0,
                dataInfo: {},
                hasSelectList: [],
                obj: {},
                value:value
            }
        },
        components: {},
        methods: {
            recommend() {
                let obj = {
                    rfid: this.formData.activityId,
                    type: 2,
                    title: this.formData.name
                }
                this.$store.dispatch('recommend/setReco', obj)
                this.$router.push({
                    name: "recommend",
                });
            },
            back() {
                this.$store.dispatch('mecha_asset/setAsset', 1)
            },
            async sure() {
                let res = await select(this.dataInfo)
                if (res && res.code === 1000) {
                    this.$tools.$mes('确定人选成功', 'success')
                    this.$emit('init')
                }

            },
            async activityDetail() {
                let res = await activityDetail(this.userInfo.activityId)
                this.formData = res.data
            },
            async applyList() {
                let res = await applyList(this.userInfo.activityId)
                this.tableData.records = res.data
                this.toggle(this.tableData.records)
            },
            async handleSelectionChange(val) {
                let res = await activityDetail(this.userInfo.activityId)
                this.formData = res.data
                let obj = {}
                this.selectedVOList = []
                val.forEach((item => {
                    obj = {
                        groupId: item.groupId,
                        type: item.type,
                        userId: item.userId
                    }
                    this.selectedVOList.push(obj)
                }))
                this.dataInfo = {
                    activityId: this.userInfo.activityId,
                    selectedVOList: this.selectedVOList
                };
                this.totalPeople = parseInt(this.selectedVOList.length)
                this.totalCore = parseInt(this.selectedVOList.length) * parseInt(this.formData.value)
            },

            toggle(data) {
                if (data.length) {
                    this.$nextTick(function () {
                        data.forEach(item => {
                            if (item.selected === true) {
                                this.$refs.multipleTable.toggleRowSelection(item, true);
                            }
                        })
                    })
                }
            },
        },
        created() {
            this.activityDetail()
            this.applyList()
        }
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