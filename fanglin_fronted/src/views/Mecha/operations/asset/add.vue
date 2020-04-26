<template>
    <div>
        <div class="my-block">
            <div class="sub-title">发布活动</div>
            <el-row :gutter="20">

                <el-col :span="14">
                    <el-form
                            :inline="false"
                            :model="formData"
                            size="small"
                            class="demo-form-inline"
                            label-width="110px"

                    >
                        <el-form-item label="活动名称 : ">
                            <el-input v-model="formData.activityName" placeholder="活动名称"></el-input>
                        </el-form-item>
                        <el-form-item label="联系电话：">
                            <el-input v-model="formData.phone" placeholder="联系电话"></el-input>

                        </el-form-item>
                        <el-form-item label="所属项目：">
                            <el-select filterable v-model="formData.projectId" placeholder="所属项目">
                                <el-option
                                        :label="i.projectName"
                                        :value="i.projectId"
                                        v-for="i in project"
                                        :key="i.projectId"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="开始时间：">
                            <el-date-picker
                                    v-model="formData.beginTime"
                                    type="datetime"
                                    value-format="timestamp"
                                    placeholder="开始时间"
                                    align="right">
                            </el-date-picker>
                        </el-form-item>

                        <el-form-item label="服务时长：">
                            <el-input-number v-model.number="formData.duration"
                                             :min="0.5"
                                             :step="0.5"
                                             step-strictly
                                             @change="change"
                                             size="medium"></el-input-number>
                            <p style="display: inline-block;margin: 0;margin-left:10px!important;">服务时长以半小时为单位</p>
                        </el-form-item>
                        <el-form-item label="重复：">
                            <el-radio v-model="formData.repeatActivity" label="0">单次</el-radio>
                            <el-radio v-model="formData.repeatActivity" label="1">每天</el-radio>
                            <el-radio v-model="formData.repeatActivity" label="2">每周</el-radio>
                            <el-radio v-model="formData.repeatActivity" label="3">每月</el-radio>
                            <el-radio v-model="formData.repeatActivity" label="4">每年</el-radio>
                            <el-form-item label="重复截止日期：" style="margin-top: 30px">
                                <el-date-picker
                                        v-model="formData.endTime"
                                        type="date"
                                        value-format="timestamp"
                                        placeholder="重复截止日期"
                                        align="right">
                                </el-date-picker>
                            </el-form-item>
                        </el-form-item>
                        <el-form-item label="年龄：">
                            <vue-slider v-model="value2" :tooltip="'always'"
                                        :tooltip-placement="['bottom', 'bottom']"></vue-slider>
                        </el-form-item>

                        <br>

                        <el-form-item label="人员要求：">
                            <el-checkbox-group v-model="formData.serviceCatIdList">
                                <el-checkbox
                                        v-for="i in serviceList"
                                        :label="i.serviceCatId"
                                        :value="i.serviceCatName"
                                        :key="i.serviceCatId"
                                        @change="selectChange"
                                >
                                    {{i.serviceCatName}}
                                </el-checkbox>

                            </el-checkbox-group>
                        </el-form-item>
                        <el-form-item label="人数要求 : ">
                            <el-input v-model="formData.userNum" placeholder="人数要求" @change="numChange"></el-input>
                        </el-form-item>
                        <el-form-item label="活动价值：">
                            <div>{{calValue}}积分/人 共计{{toatalValue}}积分</div>
                        </el-form-item>
                        <el-form-item label="性别：">
                            <el-radio v-model="formData.gender" label="1">男</el-radio>
                            <el-radio v-model="formData.gender" label="0">女</el-radio>
                            <el-radio v-model="formData.gender" label="-1">不限</el-radio>
                        </el-form-item>
                        <el-form-item label="实名认证：">
                            <el-radio v-model="formData.radio" label="1">要求</el-radio>
                            <el-radio v-model="formData.radio" label="0">不要求</el-radio>
                        </el-form-item>
                        <el-form-item label="地点：">
                            <el-input v-model="mapLocation.address" @focus="focus" placeholder="地点">
                                <i slot="suffix" class="el-input__icon el-icon-s-opportunity"
                                   style="font-size: 18px;color: #0099ff;cursor: pointer"></i>
                            </el-input>
                        </el-form-item>
                        <el-form-item>

                        </el-form-item>
                        <br>
                        <el-form-item label="缩略图：" style="margin-right: 10px">
                            <Elupload @load="load" :isDetail="isDetail"/>
                        </el-form-item>
                        <el-form-item label="活动介绍：">
                            <el-input
                                    type="textarea"
                                    :autosize="{ minRows: 2, maxRows: 4}"
                                    placeholder="请输入内容"
                                    v-model="formData.description">
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
                    <el-button type="warning" @click="submit">提交</el-button>
                </el-col>
                <el-col :span="3">
                    <el-button type="info" @click="back">返回</el-button>
                </el-col>
            </el-row>
        </div>
        <el-dialog
                title="地址"
                :visible.sync="dialog"
                width="50%"
                center
        >
            <el-autocomplete
                    v-model="mapLocation.address"
                    :fetch-suggestions="querySearch"
                    placeholder="请输入详细地址"
                    style="width: 100%"
                    :trigger-on-focus="false"
                    @select="handleSelect"
            >
                <template slot="append">
                    <el-button type="primary" @click="sure">确定</el-button>
                </template>
            </el-autocomplete>
            <div style="margin: 5px">
                <baidu-map class="bm-view"
                           :center="mapCenter"
                           :zoom="mapZoom"
                           :scroll-wheel-zoom="true"
                           ak="baidu-ak"
                           @ready="handlerBMap">
                </baidu-map>

            </div>
        </el-dialog>
    </div>
</template>

<script>
    import VueSlider from 'vue-slider-component'
    import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
    import 'vue-slider-component/theme/default.css'
    import Elupload from '@com/el-upload'
    import {projectname} from '@http/project'
    import {publish, cal} from '@http/activity'
    import {instList} from '@http/service'

    var geocoder, map, marker = null;
    export default {
        name: "teamDetail",
        data() {
            return {
                value2: [0, 150],
                tags: [
                    {name: '人数', type: ''},
                    {name: '年龄', type: 'success'},
                    {name: '性别', type: 'info'},
                    {name: '实名认证', type: 'warning'},
                ],
                formData: {duration: 0.5, serviceCatIdList: [], userNum: 1, projectId: ''},
                num: '',
                dialog: false,
                markersArray: [],
                input2: '',
                mapZoom: 15,
                mapCenter: {lng: 0, lat: 0},
                mapLocation: {
                    address: undefined,
                    coordinate: undefined
                },
                center: {
                    lng: 116.404,
                    lat: 39.915
                },
                zoom: 15,
                project: [],
                serviceList: [],
                calValue: '',
                toatalValue: '',
                isDetail: true,
            }
        },
        components: {
            VueSlider,
            Elupload,
            BaiduMap,
        },
        methods: {
            back() {
                this.$store.dispatch('mecha_asset/setAsset', 1)
            },
            change(currentValue, oldValue) {
                console.log(currentValue);
                console.log(oldValue);
                console.log((Math.round(currentValue * 100) / 100));
            },
            load(data) {
                this.formData.image = data
            },
            focus() {
                this.dialog = true
            },
            handlerBMap({BMap, map}) {
                this.BMap = BMap
                this.map = map
                if (this.mapLocation.coordinate && this.mapLocation.coordinate.lng) {
                    this.mapCenter.lng = this.mapLocation.coordinate.lng
                    this.mapCenter.lat = this.mapLocation.coordinate.lat
                    this.mapZoom = 15
                    map.addOverlay(new this.BMap.Marker(this.mapLocation.coordinate))
                } else {
                    this.mapCenter.lng = 113.271429
                    this.mapCenter.lat = 23.135336
                    this.mapZoom = 10
                }
            },
            querySearch(queryString, cb) {
                var that = this
                var myGeo = new this.BMap.Geocoder()
                myGeo.getPoint(queryString, function (point) {
                    if (point) {
                        that.mapLocation.coordinate = point
                        that.makerCenter(point)
                    } else {
                        that.mapLocation.coordinate = null
                    }
                }, this.locationCity)
                var options = {
                    onSearchComplete: function (results) {
                        if (local.getStatus() === 0) {
                            // 判断状态是否正确
                            var s = []
                            for (var i = 0; i < results.getCurrentNumPois(); i++) {
                                var x = results.getPoi(i)
                                var item = {value: x.address + x.title, point: x.point}
                                s.push(item)
                                cb(s)
                            }
                        } else {
                            cb()
                        }
                    }
                }
                var local = new this.BMap.LocalSearch(this.map, options)
                local.search(queryString)
            },
            handleSelect(item) {
                var {point} = item
                this.mapLocation.coordinate = point
                this.makerCenter(point)
                this.formData.positionCo = `${point[Object.keys(point)[0]]},${point[Object.keys(point)[1]]}`
            },
            makerCenter(point) {
                if (this.map) {
                    this.map.clearOverlays()
                    this.map.addOverlay(new this.BMap.Marker(point))
                    this.mapCenter.lng = point.lng
                    this.mapCenter.lat = point.lat
                    this.mapZoom = 15
                }
            },
            sure() {
                this.dialog = false
            },
            async init() {
                let res = await projectname()
                let res2 = await instList()
                if (res && res.data.list !== null) {
                    this.project = res.data
                } else {
                    this.project = []
                }
                console.log(res2.data);
                if (res2 ) {
                    this.serviceList = res2.data
                } else {
                    this.serviceList = []

                }
                console.log(this.serviceList);
            },
            async submit() {
                console.log(this.formData);
                this.formData.value = this.calValue
                this.formData.positionName = this.mapLocation.address
                this.formData.maxAge = this.value2[1]
                this.formData.minAge = this.value2[0]
                let res = await publish(this.formData)
                if (res && res.code === 1000) {
                    this.$tools.$mes('发布成功', 'success')
                    this.back()
                    this.$emit('init')
                }
            },
            async selectChange() {
                console.log(this.formData.serviceCatIdList);
                this.cal()
            },
            async cal() {
                let obj = {
                    duration: this.formData.duration,
                    serviceCatIdList: this.formData.serviceCatIdList
                }
                let res = await cal(obj)
                this.calValue = res.data.value
                this.toatalValue = parseInt(this.calValue) * parseInt(this.formData.userNum)
            },
            numChange() {
                this.toatalValue = parseInt(this.calValue) * parseInt(this.formData.userNum)
            }
        },
        created() {
            this.init()
            this.cal()
        }
    }
</script>

<style scoped>
    .el-image {
        width: 300px;
        height: 150px;
    }

    .bm-view {
        width: 100%;
        height: 500px;
    }
</style>