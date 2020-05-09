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
                        <el-form-item label="活动价值：">
                            <div style="color: red;font-weight: bold;font-size: 16px">{{calValue}}{{assetsUnitName}}/人
                                共计{{toatalValue}}{{assetsUnitName}}
                            </div>
                        </el-form-item>
                        <el-form-item label="活动名称 : ">
                            <el-input v-model="formData.activityName" placeholder="活动名称"></el-input>
                        </el-form-item>
                        <el-form-item label="联系电话：">
                            <el-input v-model="formData.phone" placeholder="联系电话"
                                      onkeyup="this.value=this.value.replace(/[^\d.]/g,'');"></el-input>
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
                                    placeholder="开始时间"
                                    format="yyyy-MM-dd HH:mm"
                                    value-format="timestamp"
                                    align="right"
                                    @change="changeTime"
                            >
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="结束时间：">
                            <el-date-picker
                                    v-model="formData.endTime"
                                    type="datetime"
                                    placeholder="结束时间"
                                    format="yyyy-MM-dd HH:mm"
                                    value-format="timestamp"
                                    align="right"
                                    @change="changeTime"
                            >
                            </el-date-picker>
                        </el-form-item>

                        <!--                        <el-form-item label="服务时长：">-->
                        <!--                            <el-input-number v-model.number="formData.duration"-->
                        <!--                                             :min="0.5"-->
                        <!--                                             :step="0.5"-->
                        <!--                                             step-strictly-->
                        <!--                                             @change="change"-->
                        <!--                                             size="medium"></el-input-number>-->
                        <!--                            <p style="display: inline-block;margin: 0;margin-left:10px!important;">服务时长以半小时为单位</p>-->
                        <!--                        </el-form-item>-->
                        <el-form-item label="重复：">
                            <el-radio-group v-model="formData.repeatActivity" @change="changeRadio">
                                <el-radio label="0">单次</el-radio>
                                <el-radio label="1">每天</el-radio>
                                <el-radio label="2">每周</el-radio>
                                <el-radio label="3">每月</el-radio>
                                <el-radio label="4">每年</el-radio>
                            </el-radio-group>

                            <el-form-item label="重复截止日期：" style="margin-top: 30px">
                                <el-date-picker
                                        v-model="formData.repeatEndTime"
                                        type="datetime"
                                        placeholder="重复截止日期"
                                        format="yyyy-MM-dd HH:mm"
                                        value-format="timestamp"
                                        align="right"
                                        @change="changeTime"
                                >
                                </el-date-picker>
                            </el-form-item>
                        </el-form-item>
                        <el-form-item label="年龄：">
                            <vue-slider v-model="value2" :tooltip="'always'"
                                        :max="75"
                                        :min="6"
                                        :tooltip-placement="['bottom', 'bottom']"></vue-slider>
                        </el-form-item>

                        <br>

                        <el-form-item label="专长要求：">
                            <el-checkbox-group v-model="formData.serviceCatIdList" :max="3">
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
                            <el-input v-model="formData.userNum"
                                      placeholder="人数要求"
                                      onkeyup="this.value=this.value.replace(/[^\d.]/g,'');"
                                      @change="numChange"></el-input>
                        </el-form-item>

                        <el-form-item label="性别：">
                            <el-radio v-model="formData.gender" label="1">男</el-radio>
                            <el-radio v-model="formData.gender" label="0">女</el-radio>
                            <el-radio v-model="formData.gender" label="-1">不限</el-radio>
                        </el-form-item>
                        <el-form-item label="实名认证：">
                            <el-radio v-model="formData.idCert" label=1>要求</el-radio>
                            <el-radio v-model="formData.idCert" label=0>不要求</el-radio>
                        </el-form-item>
                        <el-form-item label="地点：">
                            <el-input v-model="mapLocation.address" @focus="focus" placeholder="地点">
                                <template slot="append">
                                    <p style="display: inline-block;margin: 0;cursor: pointer" @click="focus">地图标注</p>
                                    <i slot="suffix" class="el-input__icon el-icon-s-opportunity"
                                       @click="focus"
                                       style="font-size: 18px;color: #0099ff;cursor: pointer">

                                    </i>
                                </template>

                            </el-input>
                        </el-form-item>
                        <el-form-item label="详细地址：">
                            <el-input v-model="formData.positionName" placeholder="详细地址"
                            ></el-input>
                        </el-form-item>
                        <el-form-item>

                        </el-form-item>
                        <br>
                        <el-form-item label="缩略图：" style="margin-right: 10px">
                            <Elupload @load="load" :isDetail="isDetail"/>
                        </el-form-item>
                        <el-form-item label="活动介绍：">
                            <!-- <el-input
                                    type="textarea"
                                    :autosize="{ minRows: 2, maxRows: 4}"
                                    placeholder="请输入内容"
                                    v-model="formData.description">
                            </el-input> -->
                            <Quill ref="kindeditor" :content="formData.detail" @input="qutil"></Quill>

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
            <!--            <el-autocomplete-->
            <!--                    v-model="mapLocation.address"-->
            <!--                    :fetch-suggestions="querySearch"-->
            <!--                    placeholder="请输入详细地址"-->
            <!--                    style="width: 100%"-->
            <!--                    :trigger-on-focus="false"-->
            <!--                    @select="handleSelect"-->
            <!--            >-->
            <!--                <template slot="append">-->
            <!--                    <el-button type="primary" @click="sure">确定</el-button>-->
            <!--                </template>-->
            <!--            </el-autocomplete>-->
            <div style="margin: 5px">
                <baidu-map class="bm-view"
                           :center="mapCenter"
                           :zoom="mapZoom"
                           :scroll-wheel-zoom="true"
                           ak="baidu-ak"
                           @click="getClickInfo"
                           :autoLocation="true"
                           style="display: none"
                           @ready="handlerBMap"
                >
                </baidu-map>
                <div class="map">
                    <el-autocomplete
                            v-model="mapvalue"
                            :fetch-suggestions="querySearchAsync"
                            @select="handleSelect"
                            placeholder="请输入内容"
                            style="width: 100%"
                            @keyup.native="keyup()"
                    >
                        <template slot="append">
                            <el-button type="primary" @click="sure">确定</el-button>
                        </template>
                    </el-autocomplete>

                    <el-main id="container"
                         style="width:100%;height:380px;"
                         :autoLocation="true"
                             v-loading="pictLoading"
                             element-loading-background="rgba(0, 0, 0, 0.5)"
                             element-loading-text="获取当前位置中"
                             element-loading-spinner="el-icon-loading"
                    ></el-main>
                </div>
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
    import Jsonp from 'vue-jsonp'
    import Quill from '@com/quill-editor'

    var geocoder, map, marker = null;
    export default {
        name: "teamDetail",
        data() {
            return {
                value2: [6, 75],
                tags: [
                    {name: '人数', type: ''},
                    {name: '年龄', type: 'success'},
                    {name: '性别', type: 'info'},
                    {name: '实名认证', type: 'warning'},
                ],
                formData: {
                    duration: 0.5,
                    serviceCatIdList: [],
                    userNum: 1,
                    projectId: '',
                    image: '',
                    mapvalue: '',
                    repeatActivity: 0,
                    beginTime: new Date().getTime() + 3600000,
                    endTime: new Date().getTime() + 7199820,
                    repeatEndTime: new Date().getTime(),
                },
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
                calValue: 0,
                toatalValue: 0,
                isDetail: true,
                assetsUnitName: '',
                beginTime: 0,
                endTime: 0,
                repeatEndTime: 0,
                map: null,
                getAddress: null,
                getAddCode: null,
                addressKeyword: "",
                lat: '',
                lng: '',
                mapvalue: '',
                restaurants: [],
                state: '',
                timeout: null,
                options: [],
                value: [],
                list: [],
                loading: false,
                pictLoading:true
            }
        },
        components: {
            VueSlider,
            Elupload,
            Quill,
            BaiduMap
        },
        watch: {
            mapvalue(newVla) {
                setTimeout(() => {
                    //异步请求的数据
                }, 500)
            }
        },
        methods: {
            qutil(data) {
                this.formData.description = data
            },
            keyup() {
                this.onSearch()
            },
            remoteMethod(query) {
                if (query !== '') {
                    this.loading = true;
                    setTimeout(() => {
                        this.loading = false;
                        this.options = this.list.filter(item => {
                            return item.label.toLowerCase()
                                .indexOf(query.toLowerCase()) > -1;
                        });
                    }, 200);
                } else {
                    this.options = [];
                }
            },
            getClickInfo(e) {
                let geocoder = new BMap.Geocoder();  //创建地址解析器的实例
                geocoder.getLocation(e.point, rs => {
                    //地址描述(string)=
                    this.formData.positionCo = `${e.point.lng},${e.point.lat}`
                    this.mapLocation.address = rs.address
                    // console.log(rs);    //这里打印可以看到里面的详细地址信息，可以根据需求选择想要的
                    // console.log(rs.addressComponents);//结构化的地址描述(object)
                    // console.log(rs.addressComponents.province); //省
                    // console.log(rs.addressComponents.city); //城市
                    // console.log(rs.addressComponents.district); //区县
                    // console.log(rs.addressComponents.street); //街道
                    // console.log(rs.addressComponents.streetNumber); //门牌号
                    // console.log(rs.surroundingPois); //附近的POI点(array)
                    // console.log(rs.business); //商圈字段，代表此点所属的商圈(string)
                });

            },
            changeRadio() {
                this.cal()
            },
            getUnixTime(dateStr) {
                var newstr = dateStr.replace(/-/g, '/');
                var date = new Date(newstr);
                var time_str = date.getTime().toString();
                return time_str.substr(0, 10)
            },
            changeTime() {
                this.cal()
            },
            back() {
                this.$store.dispatch('mecha_asset/setAsset', 1)
                this.$router.go(-1)

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
            async handlerBMap({BMap, map}) {
                let self= this
                this.BMap = BMap
                this.map = map
                var geolocation = new BMap.Geolocation()
                 geolocation.getCurrentPosition(function (r) {
                     console.log(r);
                     self.lat = r.point.lat
                     self.lng = r.point.lng
                     self.pictLoading=false
                     self.initMap()
                 })
            },
            // querySearch(queryString, cb) {
            //     var that = this
            //     var myGeo = new this.BMap.Geocoder()
            //     myGeo.getPoint(queryString, function (point) {
            //         if (point) {
            //             that.mapLocation.coordinate = point
            //             that.makerCenter(point)
            //         } else {
            //             that.mapLocation.coordinate = null
            //         }
            //     }, this.locationCity)
            //     var options = {
            //         onSearchComplete: function (results) {
            //             if (local.getStatus() === 0) {
            //                 // 判断状态是否正确
            //                 var s = []
            //                 for (var i = 0; i < results.getCurrentNumPois(); i++) {
            //                     var x = results.getPoi(i)
            //                     var item = {value: x.address + x.title, point: x.point}
            //                     s.push(item)
            //                     cb(s)
            //                 }
            //             } else {
            //                 cb()
            //             }
            //         }
            //     }
            //     var local = new this.BMap.LocalSearch(this.map, options)
            //     local.search(queryString)
            // },
            // handleSelect(item) {
            //     var {point} = item
            //     this.mapLocation.coordinate = point
            //     this.makerCenter(point)
            //     this.formData.positionCo = `${point[Object.keys(point)[0]]},${point[Object.keys(point)[1]]}`
            //     console.log(this.formData.positionCo);
            // },
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
                this.mapLocation.address = this.mapvalue
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
                if (res2) {
                    this.serviceList = res2.data
                } else {
                    this.serviceList = []

                }
                this.assetsUnitName = JSON.parse(sessionStorage.getItem("userInfo")).assetsUnitName
            },
            async submit() {
                if (this.formData.image === "") {
                    this.$tools.$mes("图片没上传到服务器，无法提交发布", "warning");
                    return false;
                }
                console.log(this.formData);
                this.formData.value = this.calValue
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
                    repeatEndTime: this.formData.repeatEndTime,
                    serviceCatIdList: this.formData.serviceCatIdList,
                    beginTime: this.formData.beginTime,
                    endTime: this.formData.endTime,
                    repeat: this.formData.repeatActivity,
                }
                let res = await cal(obj)
                this.calValue = res.data.value
                this.toatalValue = parseInt(this.calValue) * parseInt(this.formData.userNum)
            },
            numChange() {
                this.toatalValue = parseInt(this.calValue) * parseInt(this.formData.userNum)
                console.log(this.toatalValue);
            },
            city() {    //定义获取城市方法
                const geolocation = new this.BMap.Geocoder()
                var _this = this
                geolocation.getCurrentPosition(function getinfo(position) {
                    console.log(position);
                    let city = position.address.city;             //获取城市信息
                    let province = position.address.province;     //获取省份信息
                    _this.LocationProvince = province
                    _this.LocationCity = city
                }, function (e) {
                    _this.LocationCity = "定位失败"
                }, {provider: 'baidu'});
            },
            onchange() {
                console.log(this.mapvalue);
            },
            onSearch(value) {
                console.log(this.formData.mapvalue)
                const key = 'TQOBZ-4F432-Q2VUH-CDSN5-YHDCT-ZNFOT'
                var param = {
                    "content-type": "application/xml",
                    "keyword": '武汉',
                    "region": '中国',
                    "key": key,
                };
                let url = 'https://apis.map.qq.com/ws/place/v1/suggestion';
                // let url = "https:/api.douban.com/v2/movie/in_theaters";
                // let url = 'https://apis.map.qq.com/ws/geocoder/v1/';
                // this.$jsonp(url, {
                //     key: key,
                //     output: 'jsonp',
                //     keyword: this.formData.mapvalue,
                // })
                //     .then(json => {
                //         console.log(json);
                //         let array = []
                //         json.data.forEach(item => {
                //             array.push(item.address)
                //         })
                //         this.restaurants = array
                //         this.options = json.data
                //     })
                //     .catch(err => {
                //         console.log(err)
                //     })
            },
            querySearchAsync(queryString, cb) {

                let url = 'https://apis.map.qq.com/ws/place/v1/suggestion';
                const key = 'TQOBZ-4F432-Q2VUH-CDSN5-YHDCT-ZNFOT'
                this.$jsonp(url, {
                    key: key,
                    output: 'jsonp',
                    keyword: this.mapvalue,
                })
                    .then(json => {
                        console.log(json);
                        var list = [{}];

                        json.data.forEach(item => {
                            item.value = item.address
                        })
                        list = json.data;
                        console.log(list);
                        cb(list);
                    })
                    .catch(err => {
                        console.log(err);
                    })
            },
            createStateFilter(queryString) {
                return (state) => {
                    console.log(state);
                    return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },
            handleSelect(item) {
                console.log(item);
                this.lat = item.location.lat
                this.lng = item.location.lng
                this.formData.positionCo = `${item.location.lng},${item.location.lat}`
                this.initMap()
            },
            loadAll() {
                return this.restaurants;
            },

            // handleSelect(item) {
            //     console.log(item);
            // },
            async initMap() {
                //步骤：定义map变量 调用 qq.maps.Map() 构造函数   获取地图显示容器
                //设置地图中心点
                console.log(this.lat);
                var myLatlng = await new qq.maps.LatLng(this.lat, this.lng);
                //定义工厂模式函数
                var myOptions = {
                    zoom: 12,               //设置地图缩放级别
                    center: myLatlng,      //设置中心点样式
                    mapTypeId: qq.maps.MapTypeId.ROADMAP  //设置地图样式详情参见MapType
                }
                //获取dom元素添加地图信息
                var map = new qq.maps.Map(document.getElementById("container"), myOptions);
                setTimeout(function () {
                    var marker = new qq.maps.Marker({
                        position: myLatlng,
                        animation: qq.maps.MarkerAnimation.DROP,
                        map: map
                    });
                    //marker.setAnimation(qq.maps.Animation.DROP);
                }, 500);
                console.log(myLatlng);
                this.restaurants = this.loadAll();
                var thit = this
                qq.maps.event.addListener(map, 'click', async function (event) {
                    let name = await thit.analysis(event.latLng)
                    console.log(name);
                    this.mapvalue = name
                });
                console.log(this.mapvalue);
            },
            analysis(data1) {
                console.log(data1);
                this.lat = data1.lat
                this.lng = data1.lng
                let url = 'https://apis.map.qq.com/ws/geocoder/v1/?';
                const key = 'TQOBZ-4F432-Q2VUH-CDSN5-YHDCT-ZNFOT'
                var data = {
                    location: data1.lat + ',' + data1.lng,
                }
                data.output = 'jsonp'
                return new Promise((resolve, reject) => {
                    this.$jsonp(url, {
                        output: 'jsonp',
                        key: key,
                        location: data1.lat + ',' + data1.lng,
                    })
                        .then(json => {
                            this.mapvalue = json.result.formatted_addresses.recommend
                            resolve(json.result.formatted_addresses.recommend)
                        })
                        .catch(err => {
                            console.log(err);
                        })
                })
            },
        },
        created() {
            this.init()
        },

    }
</script>

<style scoped>
    .el-image {
        width: 686px;
        height: 218px;
    }

    .bm-view {
        width: 100%;
        height: 500px;
    }

    .my-block /deep/ .el-upload {
        width: 686px;
        height: 218px;
    }
</style>
