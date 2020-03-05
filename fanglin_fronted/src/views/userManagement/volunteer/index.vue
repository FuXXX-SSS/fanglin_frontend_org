<template>
    <div>
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
                <el-table-column prop="name" label="用户头像"/>
                <el-table-column prop="date" label="昵称"/>
                <el-table-column prop="address" label="性别"/>
                <el-table-column prop="name" label="城市"/>
                <el-table-column prop="name" label="认证"/>
                <el-table-column prop="name" label="加入时间"/>
                <el-table-column prop="name" label="邀请人数"/>
                <el-table-column prop="name" label="服务时长"/>
                <el-table-column prop="name" label="服务次数"/>
                <el-table-column prop="name" label="评分"/>
                <el-table-column prop="name" label="状态"/>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                                @click="Godetail(scope.row)"
                                type="text"
                                size="small"
                        >查看日志
                        </el-button
                        >
                    </template>
                </el-table-column>
            </el-table>
            <pagination/>
        </div>
    </div>
</template>

<script>
    import pagination from '@com/el-pagination'

    export default {
        name: "index",
        data() {
            return {
                formData: {},
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
                        }, {
                            date: '2016-05-03',
                            name: '王小虎',
                            address: '上海市普陀区金沙江路 1516 弄'
                        }]
                }
            }
        },
        components: {
            pagination
        },

        methods: {
            Godetail(data) {
                console.log(data);
            }
        }
    }
</script>

<style scoped>

</style>