<template>
    <div>
        <div class="main" v-if="isShow===1">
            <div class="my-block">
                <div class="sub-title" style="margin-bottom: 40px">
                    <div style="display: inline-block">物资管理</div>
                    <el-button type="danger" style="float: right" @click="add()">新增</el-button>
                </div>
                <el-form
                        :inline="true"
                        :model="formData"
                        size="small"
                        class="demo-form-inline"
                >
                    <el-form-item label="商品名称">
                        <el-input v-model="formData.name" placeholder="商品名称"></el-input>
                    </el-form-item>
                    <el-form-item label="发布机构">
                        <el-input v-model="formData.instName" placeholder="发布机构"></el-input>
                    </el-form-item>
                    <el-form-item label="上架状态">
                        <el-select v-model="formData.goodsStatus">
                            <el-option label="上架" value="1"></el-option>
                            <el-option label="下架" value="0"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="入库时间">
                        <el-date-picker
                                v-model="formData.created"
                                type="date"
                                value-format="timestamp"
                                placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item class="options">
                        <el-button  @click="formData = {pageNum: 1, pageSize: 10,type:0},init()" size="medium">重 置
                        </el-button>
                        <el-button type="primary" size="medium" @click="init()">查 询</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="my-block">
                <el-table :data="tableData.records" border>
                    <el-table-column type="index" label="序号" width="50"/>

                    <el-table-column prop="publishTime" label="入库时间"/>
                    <el-table-column prop="name" label="物品名称"/>
                    <el-table-column prop="name" label="缩略图">
                        <template slot-scope="scope">
                            <img :src="scope.row.image" min-width="70" height="70"/>
                        </template>
                    </el-table-column>
                    <el-table-column prop="exhAmount" label="兑换标准"/>
                    <el-table-column prop="totalStock" label="入库数量"/>
                    <el-table-column prop="stock" label="当前库存"/>
                    <el-table-column prop="provider" label="供应单位"/>
                    <el-table-column prop="name" label="状态">
                        <template slot-scope="scope">
                            {{ scope.row.goodsStatus === 1 ? "上架" : scope.row.goodsStatus === 0 ? '下架':'' }}
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button
                                    @click="Godetail(scope.row)"
                                    type="text"
                                    size="small"
                            >查看详情
                            </el-button
                            >
                        </template>
                    </el-table-column>
                </el-table>
                <pagination :total="total" @pageChange="pageChange"/>

            </div>
        </div>
        <div class="detail" v-if="isShow===2">
            <Deatail :userInfo="userInfo"/>
        </div>
        <div class="detail" v-if="isShow===3" >
            <Add @init="init"/>
        </div>
    </div>
</template>

<script>
    import pagination from '@com/el-pagination'
    import Deatail from './teamDetail'
    import {mapState} from "vuex";
    import Add from './add'
    import {exhList} from '@http/exh'

    export default {
        name: "index",
        data() {
            return {
                formData: {pageNum: 1, pageSize: 10},
                total: 0,
                pageData: {},
                userInfo: {},
                tableData: {
                    records: []
                },
            }
        },
        components: {
            pagination,
            Add,
            Deatail
        }, computed: {
            ...mapState({
                isShow: state => state.mecha_asset.ProjectisShow
            })
        },
        methods: {
            Godetail(data) {
                this.$store.dispatch('mecha_asset/setProject', 2)
                this.userInfo = data
                this.$router.push({
                    name: "projectDetail",
                });
                this.$store.dispatch('baseData/setPhysial', data)
                sessionStorage.setItem("PhysicalData", JSON.stringify(data));

            },
            add() {
                this.$store.dispatch('mecha_asset/setProject', 3)
                this.$router.push({
                    name: "projectAdd",
                });
            },
            async init() {
                let res = await exhList(this.formData)
                let {total, pageNum, pageSize, list} = res.data
                this.tableData.records = list
                this.total = total
                this.tableData.records.forEach(item=>{
                    if (item&&item.name.length>=10){
                        item.name=`${item.name.substr(0,10)}...`
                        console.log(item.name.length);
                    }
                })
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
