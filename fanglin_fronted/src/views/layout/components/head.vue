<template>
    <div>
        <div class="index">
            <div class="context">
                <img :src="imgSrc" alt="" v-if="imgSrc!==''">
                <img src="@/assets/LOGO.jpg" alt="" v-else>
                <p>芳邻时间银行机构管理后台</p>
            </div>
            <div class="rightcontext">
                <div class="item">用户：{{userName}}</div>
                <span class="el-dropdown-link" @click="logout">
                    退出登录
                  </span>
                <!--                    <el-dropdown-menu slot="dropdown">-->
                <!--                        <el-dropdown-item command="a">我的信息</el-dropdown-item>-->
                <!--                        <el-dropdown-item command="b">-->
                <!--                            <span >退出登录</span>-->
                <!--                        </el-dropdown-item>-->

                <!--                    </el-dropdown-menu>-->
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import {logout} from '@http/managerUser'

    export default {
        data() {
            return {
                dialogPs: false,
                userName: '',
                rules: {
                    pwd: {
                        trigger: "blur",
                        required: true,
                        message: "旧密码不能为空"
                    },
                    newPwd: {
                        trigger: "blur",
                        required: true,
                        message: "新密码不能为空"
                    }
                },
                psData: {},
                imgSrc: ''
            };
        },
        methods: {
            async logout() {
                this.$store.dispatch("tagView/removeViews")
                this.$store.dispatch("Switch/switchChange", false)
                let res = await logout()
                if (res && res.code === 1000) {
                    sessionStorage.clear()
                    this.$tools.$mes('退出登录', 'success')
                    setTimeout(() => {
                        this.$router.push("/login");
                    }, 1000);
                }
            },
            init() {
                this.userName = JSON.parse(sessionStorage.getItem("userInfo")).userName
                this.imgSrc = JSON.parse(sessionStorage.getItem("InfoData")).avatar

            }
        },
        created() {
            this.init()
        }
    };
</script>
<style lang="less" scoped>
    .index {
        background: #2f3638;
        height: 80px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        width: 100%;
        font-size: 14px;
        color: #fff;

        .rightcontext {
            margin-right: 30px;

            .item {
                margin-right: 30px;
                float: left;
            }
        }

        .el-dropdown {
            margin-right: 30px;
            cursor: pointer;
            color: #fff;
        }

        .context {
            flex: 1;

            img {
                width: 200px;
                height: 80px;
                float: left;
            }

            p {
                font-size: 20px;
                font-weight: bold;
                float: left;
                line-height: 40px;
                color: #fff;
                margin-left: 15px;
            }
        }
    }

    .el-dropdown-link:hover {
        color: #3a8ee6;
        transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
    }
</style>
