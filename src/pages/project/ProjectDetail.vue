<template>
    <div >
        <ul class="title-project">
            <li class="title-li" title="Test API Project">
                <b>{{projectInfo.name}}</b>
                <b class="desc-li">{{projectInfo.desc}}</b>

            </li>
        </ul>
        <ul class="project_detail">
            <li class="pull-left">
                <p class="title-p"><i class="iconfont">&#xe74a;</i> &nbsp;{{projectInfo.api_count || 0}} 个接口</p>
                <p class="desc-p">接口总数</p>
            </li>

            <li class="pull-left">
                <p class="title-p"><i class="iconfont">&#xe6da;</i> &nbsp;{{projectInfo.case_count || 0}} 个用例</p>
                <p class="desc-p">用例集总数</p>
            </li>

            <li class="pull-left">
                <p class="title-p"><i class="iconfont">&#xee32;</i> &nbsp;{{projectInfo.config_count || 0}} 套配置</p>
                <p class="desc-p">配置总数</p>
            </li>

            <li class="pull-left">
                <p class="title-p"><i class="iconfont">&#xe692;</i> &nbsp;{{projectInfo.variables_count || 0}} 对变量</p>
                <p class="desc-p">全局变量对数</p>
            </li>
        </ul>

        <ul class="project_detail">
            <li class="pull-left">
                <p class="title-p"><i class="iconfont">&#xe609;</i> &nbsp;{{projectInfo.host_count || 0}} 套环境</p>
                <p class="desc-p">环境总数</p>
            </li>

            <li class="pull-left">
                <p class="title-p"><i class="iconfont">&#xe61e;</i> &nbsp;{{projectInfo.task_count || 0}} 项任务</p>
                <p class="desc-p">定时任务个数</p>
            </li>

            <li class="pull-left">
                <p class="title-p"><i class="iconfont">&#xe66e;</i> &nbsp;{{projectInfo.report_count || 0}} 个报告</p>
                <p class="desc-p">测试报告总数</p>
            </li>

        </ul>
        <div id="echartContainer"  class="chart"></div>


    </div>
</template>

<script>
    import { getProjectDetail} from '@/restful/api'
    // var echarts = require('echarts')
    import echarts from 'echarts'

    export default {
        name: "ProjectDetail",
        data() {
            return {
                projectInfo: {},
                projectValue:[],
            }
        },

        methods: {
            success(resp) {
                this.$notify({
                    message: resp["msg"],
                    type: 'success',
                    duration: 1000
                });
            },
            failure(resp) {
                this.$notify.error({
                    message: resp.msg,
                    duration: 1000
                });
            },

            getDetail() {
                let params = {
                    project_id:this.$route.params.id
                };
                getProjectDetail({
                    params: params
                }).then(res => {
                    this.projectInfo = res.data;
                    this.projectValue[0] = this.projectInfo.api_count
                    this.projectValue[1] = this.projectInfo.case_count
                    this.projectValue[2] = this.projectInfo.config_count
                    this.projectValue[3] = this.projectInfo.variables_count
                    this.projectValue[4] = this.projectInfo.host_count
                    this.projectValue[5] = this.projectInfo.task_count
                    this.projectValue[6] = this.projectInfo.report_count
                    this.chart()
                })
            },
            chart(){
                var myChart = echarts.init(document.getElementById('echartContainer'));
                myChart.setOption({
                    title: { text: 'ApiManage 项目详情' },
                    tooltip: {},
                    xAxis: {
                        data: ["接口","用例","配置","变量","环境","任务","报告"]
                    },
                    yAxis: {},
                    series: [{
                        name: '数量',
                        type: 'bar',
                        data: this.projectValue
                    }],

                })
            }
        },
        mounted() {
            this.getDetail();
        },

    }
</script>

<style scoped>


    .desc-p {
        padding-top: 10px;
        font-size: 12px;
        color: #b6b6b6;
    }

    .title-p {
        font-size: 18px;
        margin-top: 10px;
    }

    .title-project li a {
        font-size: 12px;
        text-decoration: none;
        color: #a3a3a3;
        margin-left: 20px;

    }

    .pull-left {
        float: left;
        margin-left: 10px;
    }

    .project_detail li {
        margin-top: 10px;
        text-indent: 20px;
        display: inline-block;
        height: 90px;
        width: calc(20% - 1.5px);
        border: 1px solid #ddd;
    }

    .project_detail {
        height: 100px;
        margin-top: 20px;
    }

    .title-project {
        margin-top: 40px;
        margin-left: 10px;
    }

    ul li {
        list-style: none;
    }

    .title-li {
        font-size: 24px;
        color: #607d8b;
    }

    .desc-li {
        margin-top: 10px;
        color: #b6b6b6;
        font-size: 14px;
    }
    .chart {
        margin-top: 20px;
        width:80%;
        height:500px
    }
</style>
