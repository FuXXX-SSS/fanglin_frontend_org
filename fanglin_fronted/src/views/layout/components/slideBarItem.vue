<template>
    <div class="menu-wrapper">
        <template v-if="!item.children">
            <template slot="title">
                <i :class="item.meta.icon" v-if="item.meta.icon"></i>
                <span>{{ item.meta && item.meta.title }}</span>
            </template>
            <el-menu-item :index="resolvePath(item.path)">{{
                item.meta.title
                }}</el-menu-item>
        </template>

        <template v-else>
            <el-submenu :index="item.name">
                <template slot="title">
                    <i :class="item.meta.icon" v-if="item.meta.icon"></i>
                    <span>{{ item.meta && item.meta.title }}</span>
                </template>
                {{item.mata}}
                <sidebarItem
                        v-for="(i, index) in item.children"
                        :key="index"
                        :item="i"
                        :basePath="resolvePath(item && item.path)"
                ></sidebarItem>
            </el-submenu>
        </template>
    </div>
</template>

<script>
    import path from "path";
    export default {
        name: "sidebarItem",
        props: {
            item: {
                type: Object,
                required: true
            },
            basePath: {
                type: String,
                default: ""
            }
        },
        methods: {
            //递归增加路由路经
            resolvePath(routePath) {
                return path.resolve(this.basePath, routePath);
                console.log(path);
            }
        }
    };
</script>
