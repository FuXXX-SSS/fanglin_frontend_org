<template>
    <div>
        <el-tag
                v-for="tag in tagView"
                :key="tag.fullPath"
                :closable="isclose"
                type="info"
                effect="plain"
                @close="handleClose(tag)"
                @click="routeNext(tag)"
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
                }else {
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
            routeNext(view){
                if (view){
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
    .el-tag{
        cursor: pointer;
        line-height: 35px;
        height: 35px;
        font-size: 14px;
    }
</style>