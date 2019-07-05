<template>
    <el-container class="login">
        <el-header style="background: #fff; padding: 0; ">
            <div class="nav-api-header">
                <div style="padding-top: 10px; margin-left: 10px">

                    <el-button
                        type="info"
                        size="small"
                        @click="go"
                    >了解更多
                    </el-button>

                    <el-button
                        type="primary"
                        size="small"
                        @click="goLogin"
                    >登录
                    </el-button>

                </div>
            </div>
        </el-header>
        <el-main>
            <!--<div style="position: relative; ">-->
                <!--<img src="../../assets/images/59936.jpg" alt="" style="width: 100%; height: 100%">-->
            <!--</div>-->
            <el-row>
                <el-col :span="24">
                    <div>
                        <img src="../../assets/images/59936.jpg" alt="" style="width: 100%">

                    </div>

                </el-col>
            </el-row>

        </el-main>
    </el-container>

</template>

<script>
    export default {
        name: "Cover",
        methods:{
            goLogin(){
                this.$router.push({name: "Login"})
            },
            go(){
                window.open("https://www.apeland.cn")
            }
        }
    }
</script>

<style scoped>

</style>



