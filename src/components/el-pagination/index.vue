<template>
    <div class="page-block">
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                layout="total,sizes,prev, pager, next, jumper"
                :page-sizes="[5, 10, 20, 40]"
                :total="total">
        </el-pagination>
    </div>
</template>

<script>
    export default {
        props: {
            total: {
                type: Number
            }
        },
        name: "index",
        methods: {
            handleSizeChange(val) {
                this.page.page_limit = val;
                this.$emit('pageChange', this.page)
            },
            handleCurrentChange(val) {
                this.page.page_index = val;
                this.$emit('pageChange', this.page)
            }
        },
        data() {
            return {
                page: {
                    page_index: 1,
                    page_limit: 10
                }
            };
        },
        created() {
        }
    }
</script>

<style scoped>
    .page-block {
        text-align: right;
        margin-top: 40px;
    }
</style>