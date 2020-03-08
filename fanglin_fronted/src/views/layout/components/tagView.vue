<template>
    <div class="tagView box">
        <div class="scrollbar"></div>

        <el-tag
                v-for="tag in tagView"
                :key="tag.fullPath"
                :closable="isclose"
                type="info"
                effect="plain"
                @close="handleClose(tag)"
                @click="routeNext(tag)"
                :class="isActive(tag) ? 'tag-view-item active' : 'tag-view-item'"
        >
            {{tag.meta.title}}
        </el-tag>

    </div>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        name: "tagView",
        data() {
            return {
                tags: ['success', 'info', 'warning', 'danger'],
                tagView: [],
                isclose: true
            }
        },
        computed: {
            getStoreItem() {
                return this.$store.state.tagView.visitedViews
            },
            // ...mapState({
            //     tagView:state=>state.tagView.visitedViews
            // })
        },
        watch: {
            $route() {
                this.addViewTag();
            },
            getStoreItem() {
                this.tagView = this.$store.state.tagView.visitedViews
                if (this.tagView.length === 0 || this.tagView.length === 1) {
                    this.isclose = false
                } else {
                    this.isclose = true
                }
            },
        },

        methods: {
            addViewTag() {
                const {path} = this.$route
                if (path) {
                    this.$store.dispatch("tagView/addVisitedView", this.$route);
                }
            },
            isActive(route) {
                return route.path === this.$route.path;
            },
            beforeunloadFn(e) {
                console.log(e);
            },
            handleClose(view) {
                this.$store.dispatch("tagView/delVisitedView", view).then(res => {
                    this.toLastView(res.visitedViews, view);
                });
            },
            toLastView(visitedViews, view) {
                const latestView = visitedViews.slice(-1)[0];
                if (latestView) {
                    this.$router.push(latestView.path);
                } else {
                    if (view.path === "/index/userManagement/volunteer") {
                        this.$router.replace({path: "/index/userManagement/volunteer"});
                    } else {
                        this.$router.push("/");
                    }
                }
            },
            routeNext(view) {
                if (view) {
                    this.$router.push(view.path)
                }
            }
        },
        mounted() {
            let {visitedViews} = this.$store.state.tagView
            if (visitedViews.length === 0) {
                this.$store.dispatch("tagView/addVisitedView", this.$route);
            }
            window.addEventListener('beforeunload', e => this.beforeunloadFn(e))
        }
    }
</script>

<style scoped lang="less">
    .el-tag {
        cursor: pointer;
        line-height: 35px;
        height: 35px;
        font-size: 14px;
        padding: 0 19px;
        color: #0099CC;
        background: transparent;
        text-align: center;
        display: inline-block;
        -webkit-transition-duration: 0.4s; /* Safari */
        transition-duration: 0.4s;
        text-decoration: none;
        text-transform: uppercase;

        &:hover {
            background-color: #2f3638;
            color: white;
        }
    }

    .tagView /deep/ .active {
        background-color: #2f3638;
        color: white;
    }

    .tagView {
        width: 100%;
        white-space: nowrap;
        overflow-x: scroll;

    }
    .scrollbar{
        height: 2px;
        margin: 0 auto;

    }

    /*滚动条整体样式*/
    .box::-webkit-scrollbar {
        width: 10px;
        height: 8px;
    }
    /*滚动条滑块*/
    .box::-webkit-scrollbar-thumb {
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        background: #535353;
    }
    /*滚动条轨道*/
    .box::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 1px rgba(0,0,0,0);
        border-radius: 10px;
        background: #e6e6e6;
    }
</style>