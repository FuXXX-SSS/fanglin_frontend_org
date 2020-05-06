<template>
    <div class="service">
        <div class="my-block" v-if="isShow">
            <div class="sub-title" style="margin-bottom: 40px">
                <div style="display: inline-block">栏目管理</div>
                <el-button type="danger" style="float: right" @click="isShow=false">新增</el-button>
            </div>
            <el-table :data="tableData.records" border>
                <el-table-column type="index" label="序号" width="50"/>
                <el-table-column prop="name" label="栏目代码"/>
                <el-table-column prop="date" label="栏目名称"/>
                <el-table-column prop="address" label="栏目类型"/>
                <el-table-column prop="name" label="适用机构"/>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                                @click="Godetail(scope.row)"
                                type="text"
                                size="small"
                        >编辑
                        </el-button
                        >
                    </template>
                </el-table-column>
            </el-table>

        </div>
        <div class="my-block" v-else>
            <div class="sub-title">新增栏目</div>
            <el-form
                    :inline="true"
                    :model="formData"
                    size="small"
                    class="demo-form-inline"
            >
                <el-form-item label="栏目名称">
                    <el-input v-model="formData.name"></el-input>
                </el-form-item>
                <el-form-item label="栏目代码">
                    <el-input v-model="formData.name"></el-input>
                </el-form-item>
                <el-form-item label="栏目类型">
                    <el-select v-model="formData.accType">
                        <el-option label="开启" value="1"></el-option>
                        <el-option label="关闭" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <br>
                <el-form-item label="适用机构">
                    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选
                    </el-checkbox>
                    <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                        <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item class="options">
                    <el-button @click="formData = {}
            " size="medium">保存
                    </el-button>
                    <el-button type="primary" size="medium" @click="isShow=true">取消</el-button>
                </el-form-item>

            </el-form>

        </div>
    </div>
</template>

<script>
    const cityOptions = ['上海', '北京', '广州', '深圳'];
    export default {
        name: "index",
        data() {
            return {
                isShow: true,
                formData: {
                    checkList: []
                },
                checkAll: false,
                checkedCities: ['上海', '北京'],
                cities: cityOptions,
                isIndeterminate: true,
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
        methods: {
            handleCheckAllChange(val) {
                this.checkedCities = val ? cityOptions : [];
                this.isIndeterminate = false;
            },
            handleCheckedCitiesChange(value) {
                let checkedCount = value.length;
                this.checkAll = checkedCount === this.cities.length;
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
            }
        }
    }
</script>

<style scoped>
    .el-col-12 {
    }
</style>