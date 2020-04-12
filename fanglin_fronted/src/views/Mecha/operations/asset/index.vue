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
                    <el-form-item label="关键字查询">
                        <el-input v-model="formData.name" placeholder="请输入关键字查询"></el-input>
                    </el-form-item>
                    <el-form-item label="状态">
                        <el-select v-model="formData.accType">
                            <el-option label="开启" value="1"></el-option>
                            <el-option label="关闭" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item class="options">
                        <el-button @click="formData = {}
            " size="medium">重 置
                        </el-button>
                        <el-button type="primary" size="medium">查 询</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="my-block">
                <el-table :data="tableData.records" border>
                    <el-table-column type="index" label="序号" width="50"/>
                    <el-table-column prop="publishTime" label="发布时间"/>
                    <el-table-column prop="name" label="活动名称"/>
                    <el-table-column prop="instName" label="发布者"/>
                    <el-table-column prop="phone" label="联系电话"/>
                    <el-table-column prop="position" label="任务地点"/>
                    <el-table-column prop="beginTime" label="开始时间"/>
                    <el-table-column prop="duration" label="时长"/>
                    <el-table-column prop="value" label="价值/人"/>
                    <el-table-column prop="userName" label="人员"/>
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
            <Deatail  :userInfo="userInfo"/>
        </div>
        <div class="detail" v-if="isShow===3">
            <Add/>
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
                this.userInfo=data
                this.$store.dispatch('mecha_asset/setAsset', 2)
            },
            add() {
                this.$store.dispatch('mecha_asset/setAsset', 3)
            },
            async activityList() {
                let obj = {
                    pageSize: this.formData.pageSize,
                    pageNum: this.formData.pageNum,
                    activityStatus: '',
                    keyword: '',
                }
                let res = await activityList(obj)
                let {total, pageNum, pageSize, list} = res.data
                this.tableData.records = list
                this.total = total
            },
            pageChange(item) {
                this.formData.pageNum = item.page_index;
                this.formData.pageSize = item.page_limit;
                this.init()
            },
        },
    created() {
        this.activityList()
    }
    }
</script>

<style scoped>

</style>