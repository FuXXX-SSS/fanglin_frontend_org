<template>
    <div>
        <div class="my-block">
            <div class="sub-title">发布活动</div>
            <el-row :gutter="20">

                <el-col :span="12">
                    <el-form
                            :inline="false"
                            :model="formData"
                            size="small"
                            class="demo-form-inline"
                            label-width="110px"

                    >
                        <el-form-item label="活动名称 : ">
                            <el-input v-model="formData.value"></el-input>

                        </el-form-item>
                        <el-form-item label="联系电话：">
                            <el-input v-model="formData.value"></el-input>

                        </el-form-item>
                        <el-form-item label="所属项目：">
                            <el-select v-model="formData.accType">
                                <el-option label="开启" value="1"></el-option>
                                <el-option label="关闭" value="2"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="开始时间：">
                            <el-date-picker
                                    v-model="formData.value2"
                                    type="date"
                                    placeholder="选择日期"
                                    align="right">
                            </el-date-picker>
                        </el-form-item>

                        <el-form-item label="服务时长：">
                            <el-input-number v-model="formData.num"  :min="0.5" :step="0.5"  size="medium"></el-input-number>
                        </el-form-item>
                        <el-form-item label="重复：">
                            <el-radio v-model="formData.radio" label="1">备选项</el-radio>
                            <el-radio v-model="formData.radio" label="2">备选项</el-radio>
                            <el-radio v-model="formData.radio" label="3">备选项</el-radio>
                            <el-radio v-model="formData.radio" label="4">备选项</el-radio>
                            <el-radio v-model="formData.radio" label="5">备选项</el-radio>
                            <el-form-item label="重复截至日期：" style="margin-top: 30px">
                                <el-date-picker
                                        v-model="formData.value2"
                                        type="date"
                                        placeholder="选择日期"
                                        align="right">
                                </el-date-picker>
                            </el-form-item>
                        </el-form-item>
                        <el-form-item label="年龄：">
                            <vue-slider v-model="value_2" :tooltip="'always'"
                                        :tooltip-placement="['bottom', 'bottom']"></vue-slider>
                        </el-form-item>

                        <br>

                        <el-form-item label="人员要求：">
                            <el-tag
                                    v-for="tag in tags"
                                    :key="tag.name"
                                    closable
                                    :type="tag.type">
                                {{tag.name}}
                            </el-tag>
                        </el-form-item>
                        <el-form-item label="活动状态：">
                            <div>用户名称</div>
                        </el-form-item>
                        <el-form-item label="性别：">
                            <el-radio v-model="formData.radio" label="1">备选项</el-radio>
                            <el-radio v-model="formData.radio" label="2">备选项</el-radio>
                            <el-radio v-model="formData.radio" label="3">备选项</el-radio>
                        </el-form-item>
                        <el-form-item label="实名认证：">
                            <el-radio v-model="formData.radio" label="1">备选项</el-radio>
                            <el-radio v-model="formData.radio" label="2">备选项</el-radio>
                            <el-radio v-model="formData.radio" label="3">备选项</el-radio>
                        </el-form-item>
                        <el-form-item label="地点：">
                            <el-input v-model="formData.value">
                                <i slot="suffix" class="el-input__icon el-icon-s-opportunity"
                                   style="font-size: 18px;color: #0099ff;cursor: pointer"></i>
                            </el-input>
                        </el-form-item>
                        <el-form-item>

                        </el-form-item>
                        <br>
                        <el-form-item label="缩略图：" style="margin-right: 10px">
                            <el-image :src="src"></el-image>
                        </el-form-item>
                        <el-form-item label="活动介绍：">
                            <el-input
                                    type="textarea"
                                    :autosize="{ minRows: 2, maxRows: 4}"
                                    placeholder="请输入内容"
                                    v-model="formData.textarea2">
                            </el-input>
                        </el-form-item>
                    </el-form>

                </el-col>
            </el-row>
        </div>
        <!--        <div class="my-block">-->
        <!--            <div class="sub-title">实施情况</div>-->
        <!--            <el-form-->
        <!--                    :inline="true"-->
        <!--                    :model="formData"-->
        <!--                    size="small"-->
        <!--                    class="demo-form-inline"-->
        <!--            >-->
        <!--                <el-form-item label="报名人数：">-->
        <!--                    <div>用户名称</div>-->
        <!--                </el-form-item>-->
        <!--                <el-form-item label="签退人数：">-->
        <!--                    <div>用户名称</div>-->
        <!--                </el-form-item>-->
        <!--            </el-form>-->

        <!--        </div>-->
        <div class="my-block">
            <el-row type="flex" class="row-bg" justify="center">

                <el-col :span="3">
                    <el-button type="warning">提交</el-button>
                </el-col>
                <el-col :span="3">
                    <el-button type="info" @click="back">返回</el-button>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import detailBottom from '@com/detailBottom'
    import VueSlider from 'vue-slider-component'

    import 'vue-slider-component/theme/default.css'

    export default {
        name: "teamDetail",
        data() {
            return {
                value_2: [0, 150],
                tags: [
                    {name: '人数', type: ''},
                    {name: '年龄', type: 'success'},
                    {name: '性别', type: 'info'},
                    {name: '实名认证', type: 'warning'},
                ],
                formData: {},
                src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
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
                        },]
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
        components: {VueSlider},
        methods: {
            back() {
                this.$store.dispatch('mecha_asset/setAsset', 1)
            },
        },
    }
</script>

<style scoped>
    .el-image {
        width: 300px;
        height: 150px;
    }
</style>