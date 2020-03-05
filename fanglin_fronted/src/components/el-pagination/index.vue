<template>
    <div class="page-block">
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage3"
                :page-sizes="[100, 200, 300, 400]"
                :page-size="100"
                layout="sizes,prev, pager, next, jumper"
                :total="1000">
        </el-pagination>
    </div>
</template>

<script>
    export default {
        name: "index",
        methods: {
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            }
        },
        data() {
            return {
                currentPage1: 5,
                currentPage2: 5,
                currentPage3: 5,
                currentPage4: 4
            };
        }
    }
</script>

<style scoped>
    .page-block{
        text-align: right;
        margin-top: 40px;
    }
</style>