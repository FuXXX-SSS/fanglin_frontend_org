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
                    <el-table-column type="index" label="序号" width="50" />
                    <el-table-column prop="name" label="发布时间" />
                    <el-table-column prop="date" label="活动名称" />
                    <el-table-column prop="address" label="发布者" />
                    <el-table-column prop="name" label="联系电话" />
                    <el-table-column prop="name" label="任务地点" />
                    <el-table-column prop="name" label="开始时间" />
                    <el-table-column prop="name" label="时长" />
                    <el-table-column prop="name" label="价值/人" />
                    <el-table-column prop="name" label="价值/人" />
                    <el-table-column prop="name" label="人员" />
                    <el-table-column prop="name" label="报名" />
                    <el-table-column prop="name" label="状态" />
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button
                                    @click="Godetail(scope.row)"
                                    type="text"
                                    size="small"
                            >项目详情</el-button
                            >
                        </template>
                    </el-table-column>
                </el-table>
                <pagination />
            </div>
        </div>
        <div class="detail" v-if="isShow===2">
            <Deatail />
        </div>
        <div class="detail" v-if="isShow===3">
            <Add />
        </div>
    </div>
</template>

<script>
    import pagination from '@com/el-pagination'
    import Deatail from './teamDetail'
    import Add from './add'

    import {mapState} from "vuex";
    export default {
        name: "index",
        data() {
            return {
                formData: {},
                tableData:{
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
                        }, {
                            date: '2016-05-03',
                            name: '王小虎',
                            address: '上海市普陀区金沙江路 1516 弄'
                        }]
                }
            }
        },
        components:{
            pagination,
            Add,
            Deatail
        },
        computed:{
            ...mapState({
                isShow:state => state.mecha_asset.EventisShow
            })
        },
        methods:{
            Godetail(data){
                console.log(123);
                this.$store.dispatch('mecha_asset/setEvent',2)
            },
            add(){
                this.$store.dispatch('mecha_asset/setEvent',3)
            },
        }
    }
</script>

<style scoped>

</style>