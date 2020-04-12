<template>
    <div>
        <div class="main" v-if="isShow">
            <div class="my-block">
                <div class="sub-title" style="margin-bottom: 40px">
                    <div style="display: inline-block">推荐管理</div>
                </div>
                <el-form
                        :inline="true"
                        :model="formData"
                        size="small"
                        class="demo-form-inline"
                >
                    <el-form-item label="推荐机构">
                        <el-input v-model="formData.name" placeholder="推荐机构"></el-input>
                    </el-form-item>
                    <el-form-item label="推荐类型">
                        <el-input v-model="formData.name" placeholder="推荐类型"></el-input>
                    </el-form-item>
                    <el-form-item label="推荐栏目">
                        <el-input v-model="formData.name" placeholder="推荐栏目"></el-input>
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
                    <el-table-column prop="created" label="推荐时间"/>
                    <!--                    <el-table-column prop="instName" label="推荐机构"/>-->
                    <el-table-column prop="title" label="推荐标题"/>
                    <el-table-column prop="oriTitle" label="原标题"/>
                    <el-table-column prop="type" label="类型">
                        <template slot-scope="scope">
                            {{ scope.row.type === 0 ? "文章" :
                            scope.row.type == 1 ? '活动':
                            scope.row.type == 2 ? '项目':
                            scope.row.type == 3 ? '兑换品':
                            scope.row.type == 4 ? '志愿者':
                            scope.row.type == 5 ? '团队':
                            scope.row.type == 6 ? '机构':
                            '' }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="columnName" label="推荐栏目"/>
                    <el-table-column prop="url" label="推荐链接"/>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button
                                    @click="Godetail(scope.row)"
                                    type="text"
                                    size="small"
                            >推荐
                            </el-button
                            >
                        </template>
                    </el-table-column>

                </el-table>
                <pagination :total="total" @pageChange="pageChange"/>
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
    import {recommendList} from '@http/recommend'

    export default {
        name: "index",
        data() {
            return {
                isShow: true,
                formData: {pageNum: 1, pageSize: 10},

                tableData: {
                    records: []
                },
                total: 0,

                pageData: {},
            }
        },
        components: {
            pagination,
            Deatail
        },
        methods: {
            Godetail(data) {
                this.$router.push({
                    name: "recommend",
                    params: {
                        columnId: data.columnId,
                        oriTitle: data.oriTitle
                    }
                });
            },
            async init() {
                let obj = {
                    pageSize: this.formData.pageSize,
                    pageNum: this.formData.pageNum,
                }
                let res = await recommendList(obj)
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