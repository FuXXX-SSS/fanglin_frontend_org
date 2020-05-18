<template>
    <div>
        <HeadBar/>
        <SlideBar/>
        <div class="rightPanel">
            <TagView />
                <transition
                        name="fade-transform"
                        mode="out-in"
                >

                    <router-view/>

                </transition>
        </div>
    </div>
</template>

<script>
    import HeadBar from './components/head'
    import SlideBar from './components/slideBar'
    import TagView from './components/tagView'

    export default {
        name: "index",
        data() {
            return {}
        },
        components: {
            HeadBar,
            SlideBar,
            TagView
        },
        methods: {
        },
        created() {
        }

    }
</script>

<style scoped>
    .rightPanel {
        background: #e6e6e6;
        padding: 10px 14px;
        box-sizing: border-box;
        height: calc(100vh - 80px);
        overflow-y: auto;
        margin-left: 200px;
    }
    /* fade */
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.28s;
    }

    .fade-enter,
    .fade-leave-active {
        opacity: 0;
    }

    /* fade-transform */
    .fade-transform-leave-active,
    .fade-transform-enter-active {
        transition: all .5s;
    }

    .fade-transform-enter {
        opacity: 0;
        transform: translateX(-30px);
    }

    .fade-transform-leave-to {
        opacity: 0;
        transform: translateX(30px);
    }

</style>
