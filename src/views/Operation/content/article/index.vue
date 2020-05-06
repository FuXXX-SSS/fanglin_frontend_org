<template>
    <div>
        <div class="main" v-if="isShow">
            <div class="my-block">
                <div class="sub-title">文章管理</div>

                <el-table :data="tableData.records" border>
                    <el-table-column type="index" label="序号" width="50" />
                    <el-table-column prop="name" label="文章标题" />
                    <el-table-column prop="date" label="发布机构" />
                    <el-table-column prop="address" label="作者" />
                    <el-table-column prop="name" label="发布时间" />
                    <el-table-column prop="name" label="摘要" />
                    <el-table-column prop="name" label="关键字" />
                    <el-table-column prop="name" label="状态" />
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button
                                    @click="Godetail(scope.row)"
                                    type="text"
                                    size="small"
                            >详情</el-button
                            >
                        </template>
                    </el-table-column>
                </el-table>
                <pagination />
            </div>
        </div>
        <div class="detail" v-else>
            <Deatail @Godetail="Godetail" />

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
                this.isShow=!this.isShow

            }
        }
    }
</script>

<style scoped>

</style>