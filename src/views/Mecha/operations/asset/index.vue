<template>
    <div>
        <div class="main" v-if="isShow===1">
            <div class="my-block">
                <div class="sub-title" style="margin-bottom: 40px">
                    <div style="display: inline-block">活动管理</div>
                    <el-button type="danger" style="float: right" @click="add()">新增</el-button>
                </div>
                <el-form
                        :inline="true"
                        :model="formData"
                        size="small"
                        class="demo-form-inline"
                >
                    <el-form-item label="活动名称 : ">
                        <el-input v-model="formData.keyword" placeholder="活动名称"></el-input>
                    </el-form-item>
                    <el-form-item label="发布者 : ">
                        <el-input v-model="formData.publishName" placeholder="发布者"></el-input>
                    </el-form-item>
                    <el-form-item label="电话 : ">
                        <el-input v-model="formData.phone" placeholder="电话"
                                  onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')"></el-input>
                    </el-form-item>
                    <el-form-item label="活动状态">
                        <el-select v-model="formData.activityStatus">
                            <el-option label="开启" value="1"></el-option>
                            <el-option label="关闭" value="0"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item class="options">
                        <el-button @click="formData = {pageNum: 1, pageSize: 10},init()" size="medium">重 置
                        </el-button>
                        <el-button type="primary" size="medium" @click="init()">查 询</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="my-block">
                <el-table :data="tableData.records" border>
                    <el-table-column type="index" label="序号" width="50"/>
                    <el-table-column prop="publishTime" label="发布时间"/>
                    <el-table-column prop="name" label="活动名称"/>
<!--                    <el-table-column prop="instName" label="发布者"/>-->
                    <el-table-column prop="phone" label="联系电话"/>
                    <el-table-column prop="position" label="任务地点"/>
                    <el-table-column prop="beginTime" label="开始时间"/>
                    <el-table-column prop="duration" label="时长"/>
                    <el-table-column prop="value" label="价值/人"/>
                    <el-table-column prop="serviceCategoryList" label="人员">
                        <template slot-scope="scope">
                            <div>{{scope.row.userNum||0}}人
                                {{scope.row.gender===1?'男':scope.row.gender===0?'女':'性别不限'}}
                                {{scope.row.idCert?'实名认证':'未实名认证'}}
                                <p
                                        v-for="(item) in scope.row.serviceCategoryList"
                                        :key="item.id+1"
                                        style="display: inline-block;margin: 0;margin-right: 10px"
                                >
                                    {{item.name}}
                                </p>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="userNum" label="报名"/>
                    <el-table-column prop="activityStatus" label="状态">
                        <template slot-scope="scope">
                            {{ scope.row.activityStatus===1 ? "开启" :'关闭 ' }}
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button
                                    @click="Godetail(scope.row)"
                                    type="text"
                                    size="small"
                            >详情
                            </el-button
                            >
                        </template>
                    </el-table-column>
                </el-table>
                <pagination :total="total" @pageChange="pageChange"/>
            </div>
        </div>
        <div class="detail" v-if="isShow===2">
            <Deatail :userInfo="userInfo" @init="init"/>
        </div>
        <div class="detail" v-if="isShow===3">
            <Add @init="init"/>
        </div>
    </div>
</template>

<script>
    import pagination from '@com/el-pagination'
    import Deatail from './teamDetail'
    import Add from './add'
    import {mapState} from 'vuex'
    import {activityList} from '@http/activity'

    export default {
        name: "index",
        data() {
            return {
                formData: {pageNum: 1, pageSize: 10},
                tableData: {records: []},
                pageData: {},
                total: 0,
                userInfo: {}
            }
        },
        computed: {
            ...mapState({
                isShow: state => state.mecha_asset.AssetisShow
            })
        },
        components: {
            pagination,
            Add,
            Deatail
        },
        methods: {
            Godetail(data) {
                this.userInfo = data
                this.$store.dispatch('mecha_asset/setAsset', 2)
                this.$router.push({
                    name: "assetDetail",
                });
                this.$store.dispatch('baseData/setEvent', data)
                sessionStorage.setItem("EventData", JSON.stringify(data));
            },
            add() {
                this.$store.dispatch('mecha_asset/setAsset', 3)
                this.$router.push({
                    name: "assetAdd",
                });
            },
            async init() {
                let res = await activityList(this.formData)
                let {total, pageNum, pageSize, list} = res.data
                this.tableData.records = list
                this.tableData.records.forEach(item=>{
                    if (item&&item.name.length>=10){
                        item.name=`${item.name.substr(0,10)}...`
                        console.log(item.name.length);
                    }
                })

                this.total = total
            },
            pageChange(item) {
                this.formData.pageNum = item.page_index;
                this.formData.pageSize = item.page_limit;
                this.init()
            },
        },
        created() {
            this.init()
        }
    }
</script>

<style scoped>

</style>
