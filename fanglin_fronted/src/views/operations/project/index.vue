<template>
    <div>
        <div class="main" v-if="isShow">
            <div class="my-block">
                <div class="sub-title">项目列表</div>
                <el-form
                        :inline="true"
                        :model="formData"
                        size="small"
                        class="demo-form-inline"
                >
                    <el-form-item label="客户姓名">
                        <el-input v-model="formData.name"></el-input>
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
                <el-button type="warning" class="form_btn">新增</el-button>
                <el-table :data="tableData.records" border>
                    <el-table-column type="index" label="序号" width="50" />
                    <el-table-column prop="name" label="发布时间" />
                    <el-table-column prop="date" label="活动名称" />
                    <el-table-column prop="name" label="联系电话" />
                    <el-table-column prop="name" label="募资目标" />
                    <el-table-column prop="name" label="回馈标准" />
                    <el-table-column prop="name" label="募集金额" />
                    <el-table-column prop="name" label="活动次数" />
                    <el-table-column prop="name" label="活动人数" />
                    <el-table-column prop="name" label="服务时长" />
                    <el-table-column prop="name" label="状态" />
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button
                                    @click="Godetail(scope.row)"
                                    type="text"
                                    size="small"
                            >查看日志</el-button
                            >
                        </template>
                    </el-table-column>
                </el-table>
                <pagination />
            </div>
        </div>
        <div class="detail" v-else>
            <Deatail />
        </div>
    </div>
</template>

<script>
    import pagination from '@com/el-pagination'
    import Deatail from './teamDetail'
    export default {
        name: "index",
        data() {
            return {
                isShow:true,
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
            Deatail
        },
        methods:{
            Godetail(data){
                console.log(123);
                this.isShow=false
            }
        }
    }
</script>

<style scoped>

</style>