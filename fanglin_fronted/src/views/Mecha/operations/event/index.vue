<template>
    <div>
        <div class="main" v-if="isShow===1">
            <div class="my-block">
                <div class="sub-title" style="margin-bottom: 40px">
                    <div style="display: inline-block">项目管理</div>
                    <el-button type="danger" style="float: right" @click="add()">新增</el-button>
                </div>
                <el-form
                        :inline="true"
                        :model="formData"
                        size="small"
                        class="demo-form-inline"
                >
                    <el-form-item label="项目名称">
                        <el-input v-model="formData.keyword" placeholder="项目名称"></el-input>
                    </el-form-item>
                    <el-form-item label="电话">
                        <el-input v-model="formData.phone" placeholder="电话"></el-input>
                    </el-form-item>
                    <el-form-item label="项目状态">
                        <el-select v-model="formData.projectStatus">
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
                    <el-table-column prop="publishTime" label="发布时间"/>
                    <el-table-column prop="name" label="活动名称"/>
                    <el-table-column prop="phone" label="联系电话"/>
                    <el-table-column prop="amount" label="募资目标"/>
                    <el-table-column prop="refundStd" label="回馈标准"/>
                    <el-table-column prop="donatedAmount" label="募集金额"/>
                    <el-table-column prop="activityCount" label="活动次数"/>
                    <el-table-column prop="activityUserCount" label="活动人数"/>
                    <el-table-column prop="serviceDuration" label="服务时长"/>
                    <el-table-column prop="projectStatus" label="状态">
                        <template slot-scope="scope">
                            {{ scope.row.projectStatus===1 ? "开启" :'关闭 ' }}
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
            <Deatail @Godetail="Godetail" :userInfo="userInfo"/>
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
    import {projectList} from '@http/project'

    import {mapState} from "vuex";

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
        components: {
            pagination,
            Add,
            Deatail
        },
        computed: {
            ...mapState({
                isShow: state => state.mecha_asset.EventisShow
            })
        },
        methods: {
            Godetail(data) {
                console.log(123);
                this.$store.dispatch('mecha_asset/setEvent', 2)
            },
            add() {
                this.$store.dispatch('mecha_asset/setEvent', 3)
            },
            async init() {

                let res = await projectList(this.formData)
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
            this.init()
        }
    }
</script>

<style scoped>

</style>