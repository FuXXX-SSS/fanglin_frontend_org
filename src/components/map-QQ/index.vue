<template>
    <div>
        <div id="container" style="width:100%;height:380px;"></div>
    </div>
</template>

<script>
    import {serviceDetail} from '@http/order'

    export default{
         props: {
            checkInCo: {
                type: String,
            }, userInfo: {
                type: Object,
            },
        },
        mounted() {
            this.init();
        },
        methods:{
          async  init() {
                  let res = await serviceDetail(this.userInfo.id)
                let info  =''
                if (res.data.checkInCo!==''){
                    info=res.data.checkInCo
                }
                console.log(info);
                //步骤：定义map变量 调用 qq.maps.Map() 构造函数   获取地图显示容器
                //设置地图中心点
                           var myLatlng = new qq.maps.LatLng(info.split(",")[1], info.split(",")[0]);
                //定义工厂模式函数
                var myOptions = {
                    zoom: 8,               //设置地图缩放级别
                    center: myLatlng,      //设置中心点样式
                    mapTypeId: qq.maps.MapTypeId.ROADMAP  //设置地图样式详情参见MapType
                }
                //获取dom元素添加地图信息
                var map = new qq.maps.Map(document.getElementById("container"), myOptions);
                setTimeout(function(){
                    var marker=new qq.maps.Marker({
                        position:myLatlng,
                        animation:qq.maps.MarkerAnimation.DROP,
                        map:map
                    });
                    //marker.setAnimation(qq.maps.Animation.DROP);
                },2000);
            }
        }
    }
    </script>

<style scoped lang="less">

</style>