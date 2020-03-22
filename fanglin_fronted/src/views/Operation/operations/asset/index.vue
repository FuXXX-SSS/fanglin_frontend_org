<template>
    <div>
        <div class="main" v-if="isShow===2">
            <div class="my-block">
                <div class="sub-title">汇率列表</div>
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
                <el-button type="warning" class="form_btn" @click="add">新增</el-button>
                <el-button type="info" class="form_btn" @click="back">返回</el-button>
                <el-table :data="tableData.records" border>
                    <el-table-column type="index" label="序号" width="50" />
                    <el-table-column prop="name" label="本方" />
                    <el-table-column prop="date" label="外方" />
                    <el-table-column prop="address" label="交易单位" />
                    <el-table-column prop="name" label="汇率" />
                    <el-table-column prop="name" label="状态" />
                </el-table>
                <pagination />
            </div>
        </div>
        <div class="detail" v-if="isShow===1">
            <Deatail />
        </div>
        <div class="detail" v-if="isShow===3">
            <Add />
        </div>
    </div>
</template>

<script>
    import pagination from '@com/el-pagination'
    import Deatail from './teamDetail'
    import Add from './add'
    import {mapState} from 'vuex'
    export default {
        name: "index",
        data() {
            return {
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
            Add,
            Deatail
        },
        computed:{
          ...mapState({
              isShow:state => state.mecha_asset.AssetisShow
          })
        },
        methods:{
            Godetail(data){
                console.log(123);
                this.isShow=2
            },
            add(){
                this.$store.dispatch('mecha_asset/setAsset',3)
            },back(){
                this.$store.dispatch('mecha_asset/setAsset',1)
            },
        },
        created() {
            console.log(this.isShow);
        }
    }
</script>

<style scoped>

</style>