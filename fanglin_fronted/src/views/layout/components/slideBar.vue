<template>
    <div class="side-bar">

        <el-scrollbar>
            <el-menu
                    class="el-menu-vertical-demo"
                    background-color="#282d2f"
                    text-color="#fff"
                    active-text-color="#FF9F08"
                    :router="true"
                    style="flex: 1"
                    :default-openeds="openeds"
            >

                <sidebarItem
                        :item="item"
                        v-for="item in routerList"
                        :key="item.path"
                ></sidebarItem>
            </el-menu>
        </el-scrollbar>

    </div>
</template>

<script>

    import sidebarItem from "./slideBarItem";
    import {RouteData} from "@/utils/routesList";

    export default {
        name: "sidebar",
        data() {
            return {
                routerList: [],
                openeds: ['1'],
            };
        },
        computed: {
            activeMenu() {
                const route = this.$route;
                const { meta, path } = route;
                if (meta.activeMenu) {
                    return meta.activeMenu;
                }
                return path;
            },

        },
        components: {
            sidebarItem
        },
        created() {
            this.routerList=RouteData
        }
    };
</script>

<style lang="less" scoped>
    .side-bar{
        width:13%;
        height: 100vh;
        background: #282d2f;
        display: flex;
        flex-direction: column;
        position: fixed;
    }

    .addToIndex {
        line-height: 40px;
        background: #515151;
        font-size: 12px;
        text-align: center;
        color: #ff9f08;
        border-top: 1px solid #999;
        flex: 0 0 40px;
        &.addToIndexEd {
            color: #c9c9c9;
        }
    }
    .logo {
        flex: 0 0 80px;
        overflow: hidden;
        background: #ff9f08;
        text-align: center;
    }
    .side-bar /deep/ {
        .el-menu-item is-active{
            background: #232829;
        }
    }
</style>
<style lang="less">
    .el-menu-vertical-demo {
        .iconfont {
            margin-right: 10px;
        }
    }
    .el-scrollbar__wrap{
        overflow-x: hidden!important;
    }
</style>
