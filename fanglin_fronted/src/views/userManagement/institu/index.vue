<template>
    <div>
        <div class="main" v-if="isShow">
            <div class="my-block">
                <el-form
                        :inline="true"
                        :model="formData"
                        size="small"
                        class="demo-form-inline"
                >
                    <el-form-item label="客户姓名">
                        <el-input v-model="formData.name"></el-input>
                    </el-form-item>
                    <el-form-item label="审核状态">
                        <el-select v-model="formData.accType">
                            <el-option label="通过" value="1"></el-option>
                            <el-option label="不通过" value="2"></el-option>
                            <el-option label="待审核" value="3"></el-option>
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
                    <el-table-column prop="name" label="用户头像" />
                    <el-table-column prop="date" label="名称" />
                    <el-table-column prop="address" label="创始人" />
                    <el-table-column prop="name" label="手机号" />
                    <el-table-column prop="name" label="成立时间" />
                    <el-table-column prop="name" label="人数" />
                    <el-table-column prop="name" label="资产" />
                    <el-table-column prop="name" label="活动数量" />
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
    import Deatail from './instituDetail'
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