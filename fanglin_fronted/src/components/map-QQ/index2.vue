<template>
    <div>
        <div id="container2" style="width:100%;height:380px;"></div>
    </div>
</template>

<script>
    export default{
        mounted() {
            this.init();
        },
        methods:{
            init() {
                //步骤：定义map变量 调用 qq.maps.Map() 构造函数   获取地图显示容器
                //设置地图中心点
                var myLatlng = new qq.maps.LatLng(31.226527,113.4197128);
                //定义工厂模式函数
                var myOptions = {
                    zoom: 8,               //设置地图缩放级别
                    center: myLatlng,      //设置中心点样式
                    mapTypeId: qq.maps.MapTypeId.ROADMAP  //设置地图样式详情参见MapType
                }
                //获取dom元素添加地图信息
                var map = new qq.maps.Map(document.getElementById("container2"), myOptions);
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