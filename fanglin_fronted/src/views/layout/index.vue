<template>
    <div>
        <HeadBar />
        <SlideBar />
        <div class="rightPanel">
            <keep-alive >
                <router-view />
            </keep-alive>
        </div>
    </div>
</template>

<script>
    import HeadBar from './components/head'
    import SlideBar from './components/slideBar'
    export default {
        name: "index",
        components:{
            HeadBar,
            SlideBar
        }
    }
</script>

<style scoped>
    .rightPanel{
        background: #f0f2f5;
        padding: 25px 35px;
        box-sizing: border-box;
        height: calc(100vh - 80px);
        overflow-y: auto;
        margin-left: 240px;
    }
</style>