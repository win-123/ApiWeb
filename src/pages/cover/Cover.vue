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

            <el-carousel :interval="5000" arrow="always" height="600px">
                <el-carousel-item v-for="(item, index) in swiperImg" :key="index">
                    <img :src="item.url" alt="" class="img">
                </el-carousel-item>

            </el-carousel>

            <el-footer height="100px" style="background: #3b4151">
                <span>关注我么！</span>
            </el-footer>

        </el-main>
    </el-container>

</template>

<script>
    export default {
        name: "Cover",
        data () {
            return {
                swiperImg:[
                    {url: require("../../assets/images/1.jpg")},
                    {url: require("../../assets/images/2.jpg")},
                    {url: require("../../assets/images/3.jpg")},
                    {url: require("../../assets/images/4.jpg")},
                ]

            }
        },
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

    .el-carousel__item {
        color: #475669;
        font-size: 18px;
        opacity: 0.75;
        line-height: 600px;
        margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }
    .img {
        width: 100%;
        height: auto;
    }


</style>



