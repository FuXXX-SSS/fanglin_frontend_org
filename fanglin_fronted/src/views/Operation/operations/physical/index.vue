<template>
    <div>
        <div class="main" v-if="isShow">
            <div class="my-block">
                <div class="sub-title">兑换品管理</div>
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
                    <el-form-item label="入库时间">
                        <el-date-picker
                                v-model="formData.value2"
                                type="datetimerange"
                                :picker-options="pickerOptions"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                align="right">
                        </el-date-picker>
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
                    <el-table-column prop="name" label="发布时间"/>
                    <el-table-column prop="date" label="发布机构"/>
                    <el-table-column prop="name" label="物品名称"/>
                    <el-table-column prop="name" label="缩略图"/>
                    <el-table-column prop="name" label="兑换标准"/>
                    <el-table-column prop="name" label="入库数量"/>
                    <el-table-column prop="name" label="当前库存"/>
                    <el-table-column prop="name" label="供应单位"/>
                    <el-table-column prop="name" label="状态"/>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button
                                    @click="Godetail(scope.row)"
                                    type="text"
                                    size="small"
                            >详情
                            </el-button
                            >
                        </template>
                    </el-table-column>
                </el-table>
                <pagination/>
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
                isShow: true,
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
                },
                pickerOptions: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
            }
        },
        components: {
            pagination,
            Deatail
        },
        methods: {
            Godetail(data) {
                console.log(123);
                this.isShow=!this.isShow

            }
        }
    }
</script>

<style scoped>

</style>