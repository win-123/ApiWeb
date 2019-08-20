<template>
    <el-container class="login">
        <el-header style="background: #242F42; padding: 0; ">
            <div style="padding-top: 10px; margin-left: 20px">
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
        </el-header>
        <el-container>
            <el-main>
                <div>
                    <el-carousel :interval="5000" arrow="always" height="600px">
                        <el-carousel-item v-for="(item, index) in swiperImg" :key="index">
                            <img :src="item.url" alt="" class="img">
                        </el-carousel-item>
                    </el-carousel>
                </div>
                <div class="diy">
                    <el-steps :active="active" finish-status="success">
                        <el-step title="步骤 1"></el-step>
                        <el-step title="步骤 2"></el-step>
                        <el-step title="步骤 3"></el-step>
                    </el-steps>

                    <el-button style="margin-top: 12px;" @click="next">下一步</el-button>
                </div>

            </el-main>
        </el-container>

        <el-footer class="footer">
            <home-footer></home-footer>
        </el-footer>
    </el-container>

</template>

<script>
    import HomeFooter from '../home/components/Footer'

    export default {
        name: "Cover",
        components: {
            HomeFooter
        },
        data () {
            return {
                swiperImg:[
                    {url: require("../../assets/images/1.jpg")},
                    {url: require("../../assets/images/2.jpg")},
                    {url: require("../../assets/images/3.jpg")},
                    {url: require("../../assets/images/4.jpg")},
                ],
                active: 0
            }
        },
        methods:{
            goLogin(){
                this.$router.push({name: "Login"})
            },
            go(){
                window.open("https://www.apeland.cn")
            },
            next() {
                if (this.active++ > 2) this.active = 0;
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
    .diy {
        margin-top: 50px;
        text-align: center;
    }
    .img {
        width: 100%;
        height: auto;
    }
    .footer {
        background: #3b4151;
        color: #FFFFFF;
        text-align: center;
        line-height: 60px;
        bottom: 0px;
        position: absolute;
        width: 100%;
    }


</style>



