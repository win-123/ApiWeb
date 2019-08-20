<template>
    <div class="body">
        <div class="panels">
            <table class="table table-hover" rules=rows frame=below>
                <thead>
                <tr>
                    <th>序号</th>
                    <th>活动标题</th>
                    <th>发布时间</th>
                    <th>作者</th>
                    <th>活动类型</th>
                    <th>所属学校</th>
                    <th>回复/查看</th>
                    <th>状态</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(list, index) in currentList">
                    <td>{{index + 1}}</td>
                    <td class="blue">{{list.title}}</td>
                    <td>{{list.date}}</td>
                    <td>{{list.auther}}</td>
                    <td>{{list.type}}</td>
                    <td>{{list.school}}</td>
                    <td>{{list.reply}}/{{list.view}}</td>
                    <td>{{list.status}}</td>
                    <td><span class="blue">编辑</span>&nbsp;&nbsp;<span class="red">删除</span></td>
                </tr>
                </tbody>
            </table>
        </div>
        <pagination :num="num" :limit="limit" @getNew="getNew"></pagination>
        <div>
            <h1>
                该组件是直接使用Vue，编写的可以直接的重复使用， 不需要引入第三方的包
            </h1>

            <el-collapse accordion>
                <el-collapse-item>
                    <template slot="title">
                        组件代码
                    </template>
                    <div>

                    </div>
                    <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
                </el-collapse-item>
                <el-collapse-item title="反馈 Feedback">
                    <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
                    <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
                </el-collapse-item>

            </el-collapse>

        </div>
    </div>
</template>

<script>
    import pagination from "./DiyPage"
    import data_list from "./Data"

    export default {
        name: 'activity',
        data() {
            return {
                num: 0,
                limit: 10,
                currentList: [],
                activityList: data_list,
            }
        },
        components: {
            pagination
        },
        methods: {
            editorInit: function () {
                require('brace/ext/language_tools') //language extension prerequsite...
                require('brace/mode/html')
                require('brace/mode/javascript')    //language
                require('brace/mode/less')
                require('brace/theme/chrome')
                require('brace/snippets/javascript') //snippet
            },
            getNew(value) {
                this.currentList = this.activityList.slice(value, value + this.limit);
            }
        },
        mounted() {
            this.getNew(0);
            this.num = this.activityList.length;
        }
    }
</script>

<style scoped>
    .body {
        background-color: #ffffff;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        justify-content: flex-start;
        font-size: 12px;
        color: #606266;
        text-align: center;
    }
    .blue {
        color: #409EFF;
    }
    .red {
        color: #FF6947;
    }
    .panels {
        width: 100%;
        height: 100%;
        text-align: center;
    }
    .panels tr {
        height: 40px;
        text-align: center;
    }
    .panels th {
        text-align: center;
    }
    table {
        border: #eeeeee;
    }
</style>
