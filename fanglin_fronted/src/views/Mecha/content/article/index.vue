<template>
    <div>
        <div class="main" v-if="isShow">
            <div class="my-block" style="">
                <div class="sub-title">
                    <div style="display: inline-block;margin-bottom: 10px">文章管理</div>
                    <el-button type="danger" style="float: right" @click="Godetail()">新增</el-button>
                </div>
                <el-table :data="tableData.records" border>

                    <el-table-column prop="title" label="文章标题"/>
                    <el-table-column prop="instName" label="发布者"/>
                    <el-table-column prop="publishDate" label="发布时间"/>
                    <el-table-column prop="abstractInfo" label="摘要"/>
                    <el-table-column prop="keywords" label="关键字"/>
                    <el-table-column prop="articleStatus" label="状态">
                        <template slot-scope="scope">
                            {{ scope.row.articleStatus===1 ? "开启" :'关闭 ' }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="top" label="置顶">
                        <template slot-scope="scope">
                            {{ scope.row.top ? "是" :'否 ' }}
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button
                                    type="text"
                                    size="small"
                                    @click="deleteInfo(scope.row)"
                            >删除
                            </el-button>
                            <el-button
                                    type="text"
                                    size="small"
                                    @click="StatusInfo(scope.row)"
                            > {{ scope.row.articleStatus===0 ? "开启" :'关闭 ' }}
                            </el-button>
                            <el-button
                                    type="text"
                                    size="small"
                            >推荐
                            </el-button>
<!--                            <el-button-->
<!--                                    type="text"-->
<!--                                    size="small"-->
<!--                                    @click="Godetail()"-->
<!--                            >编辑-->
<!--                            </el-button>-->

                        </template>
                    </el-table-column>
                </el-table>
                <pagination/>
            </div>
        </div>
        <div class="detail" v-else>
            <Deatail @Godetail="Godetail" :userInfo="userInfo" @init="init"/>
        </div>
    </div>
</template>

<script>
    import pagination from '@com/el-pagination'
    import Deatail from './teamDetail'
    import {articleList, Delete, deal} from '@http/article'

    export default {
        name: "index",
        data() {
            return {
                isShow: true,
                formData: {pageNum: 1, pageSize: 10},
                tableData: {
                    records: []
                },
                pageData: {},
                total: 0,

                userInfo: {}
            }
        },
        components: {
            pagination,
            Deatail
        },
        methods: {
            Godetail(data) {
                this.userInfo = data
                this.isShow = !this.isShow
            },
            async init() {
                let obj = {
                    pageSize: this.formData.pageSize,
                    pageNum: this.formData.pageNum,
                }
                let res = await articleList(obj)
                let {total, pageNum, pageSize, list} = res.data
                this.tableData.records = list
                this.total = total

            },
            pageChange(item) {
                this.formData.pageNum = item.page_index;
                this.formData.pageSize = item.page_limit;
                this.init()
            },
            async deleteInfo(data) {
                let res = await  Delete(data.articleId)
                console.log(res);
                if (res && res.code === 1000) {
                    this.$tools.$mes('删除成功', 'success')
                    this.init()
                }
            },
            async StatusInfo(data) {
                let obj = `${data.articleStatus}` + '/' + `${data.articleId}`
                let res = await deal(obj)
                console.log(res);
                if (res && res.code === 1000) {
                    this.$tools.$mes('操作成功', 'success')
                    this.init()
                }
            },
        },
        created() {
            this.init()
        }
    }
</script>

<style scoped>

</style>