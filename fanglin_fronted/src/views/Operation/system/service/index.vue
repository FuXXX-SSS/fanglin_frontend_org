<template>
    <div class="service">
        <div class="my-block" v-if="isShow">
            <div class="sub-title" style="margin-bottom: 40px">
                <div style="display: inline-block">服务类型</div>
                <el-button type="danger" style="float: right" @click="isShow=false">新增</el-button>
            </div>
            <el-row>
                <el-col :span="12"><span>服务类型</span></el-col>
                <el-col :span="12"><span>适用机构</span></el-col>
            </el-row>
            <el-divider></el-divider>
            <el-row>
                <el-col :span="12"><span>服务类型</span></el-col>
                <el-col :span="12"><span>适用机构</span></el-col>
            </el-row>
        </div>
        <div class="my-block" v-else>
            <div class="sub-title">新增服务类型</div>
            <el-form
                    :inline="true"
                    :model="formData"
                    size="small"
                    class="demo-form-inline"
            >
                <el-form-item label="服务名称">
                    <el-input v-model="formData.name"></el-input>
                </el-form-item>
                <el-form-item label="状态">
                    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
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
                formData:{
                    checkList:[]
                },
                checkAll: false,
                checkedCities: ['上海', '北京'],
                cities: cityOptions,
                isIndeterminate: true

            }
        },
        methods:{
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