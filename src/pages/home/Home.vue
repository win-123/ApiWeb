<template>

    <el-container>
        <el-aside style="width: 202px;">
            <home-side></home-side>
        </el-aside>
        <el-container>
            <el-header style="background: #fff; padding: 0; height: 50px">
                <home-header></home-header>
            </el-header>
            <el-container>
                <el-main>
                    <router-view></router-view>
                </el-main>
                <el-footer class="footer">
                    <home-footer></home-footer>
                </el-footer>
            </el-container>
        </el-container>
    </el-container>

</template>

<script>
    import HomeHeader from './components/Header'
    import HomeSide from './components/Side'
    import HomeFooter from './components/Footer'

    export default {
        name: "Home",
        components: {
            HomeHeader,
            HomeSide,
            HomeFooter
        }

    }
</script>

<style scoped>
    .el-main {
        padding: 0px;
    }
    .footer {
        background-color: #242F42;
        color: #333;
        text-align: center;
        line-height: 60px;
        bottom: 0px;
        position: absolute;
        width: 100%;
    }

</style>
