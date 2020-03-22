<template>
    <div>

        <div class="index">
            <div class="context">
                <img src="@/assets/LOGO.jpg" alt="">
                <p>芳邻时间银行机构管理后台</p>
            </div>
            <div class="rightcontext">
                <div class="item">用户：123123</div>
                <el-dropdown >
                  <span class="el-dropdown-link">
                    退出登录<i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="a">我的信息</el-dropdown-item>
                        <el-dropdown-item command="b" >
                            <span @click="logout">退出登录</span>
                        </el-dropdown-item>

                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
        data() {
            return {
                dialogPs: false,
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
                psData: {}
            };
        },
        methods: {
            logout() {
                this.$store.dispatch("tagView/removeViews")
                this.$store.dispatch("Switch/switchChange",false)

                setTimeout(() => {
                    this.$router.push("/login");
                    // window.location.reload();
                }, 1000);
            },

        },

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
        .rightcontext{
            width: 17%;
            .item{
                margin-right: 30px;
                float: left;
            }
        }

        .el-dropdown{
            margin-right: 30px;
            cursor: pointer;
            color: #fff;
        }
        .context{
            flex: 1;
            img{
                width:250px;
                height: 80px;
                float:left;
            }
            p{
                font-size: 20px;
                font-weight: bold;
                float:left;
                line-height: 40px;
                color: #fff;
                margin-left: 15px;
            }
        }
    }

</style>
