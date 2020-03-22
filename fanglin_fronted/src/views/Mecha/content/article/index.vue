<template>
    <div>
        <div class="main" v-if="isShow">
            <div class="my-block">
                <div class="sub-title" style="margin-bottom: 40px">
                    <div style="display: inline-block">文章管理</div>
                    <el-button type="danger" style="float: right" @click="Godetail()">新增</el-button>
                </div>
                <el-table :data="tableData.records" border>

                    <el-table-column type="index" label="序号" width="50" />
                    <el-table-column prop="name" label="文章标题" />
                    <el-table-column prop="date" label="发布者" />
                    <el-table-column prop="name" label="发布时间" />
                    <el-table-column prop="name" label="摘要" />
                    <el-table-column prop="name" label="关键字" />
                    <el-table-column prop="name" label="状态" />
                    <el-table-column prop="name" label="置顶" />
                    <el-table-column label="操作">
                        <template >
                            <el-button
                                    type="text"
                                    size="small"
                            >删除</el-button>  <el-button
                                    type="text"
                                    size="small"
                            >开启</el-button>  <el-button
                                    type="text"
                                    size="small"
                            >推荐</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <pagination />
            </div>
        </div>
        <div class="detail" v-else>
            <Deatail @Godetail="Godetail"/>
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
                this.isShow = !this.isShow

            }
        }
    }
</script>

<style scoped>

</style>