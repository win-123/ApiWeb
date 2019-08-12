<template>
    <el-container v-if="reportData.data">
        <el-header style="padding: 0; height: 50px; margin-top: 10px">
            <div style="padding-top: 8px; padding-left: 30px;">
                <el-row>
                    <el-col :span="6" v-if="reportData.data.length >= 1">
                        <el-input placeholder="请输入报告名称" clearable v-model="search">
                            <el-button slot="append" icon="el-icon-search" @click="getReportList"></el-button>
                        </el-input>
                    </el-col>

                    <el-col :span="1">
                        <el-button
                            v-show="reportData.data.length !== 0"
                            style="margin-left: 20px"
                            type="danger"
                            icon="el-icon-delete"
                            circle
                            size="mini"
                            @click="delSelectionReports"
                        ></el-button>
                    </el-col>

                    <el-col :span="7">
                        <el-pagination
                            :page-size="11"
                            v-show="reportData.data.length !== 0 "
                            background
                            @current-change="handleCurrentChange"
                            :current-page.sync="currentPage"
                            layout="total, prev, pager, next, jumper"
                            :total="reportData.data.length"
                        >
                        </el-pagination>
                    </el-col>


                </el-row>

            </div>
        </el-header>

        <el-container>
            <el-main style="padding: 0; margin-left: 10px;">
                <div style="position: fixed; bottom: 0; right:0; left: 220px; top: 120px">
                    <el-table
                        highlight-current-row
                        :data="reportData.data"
                        :show-header="reportData.data.length !== 0 "
                        stripe
                        height="calc(100%)"
                        @cell-mouse-enter="cellMouseEnter"
                        @cell-mouse-leave="cellMouseLeave"
                        @selection-change="handleSelectionChange"
                    >
                        <el-table-column
                            type="selection"
                            width="55"
                        >
                        </el-table-column>

                        <el-table-column
                            label="报告类型"
                        >
                            <template slot-scope="scope">
                                <el-tag color="#2C3E50" style="color: white">{{scope.row.type | formatReportType}}</el-tag>
                            </template>
                        </el-table-column>

                        <el-table-column
                            label="报告名称"
                            width="200"
                        >
                            <template slot-scope="scope">
                                <div>{{scope.row.name}}</div>
                            </template>
                        </el-table-column>

                        <el-table-column
                            label="通过状态"
                            width="150"
                        >
                            <template slot-scope="scope">
                                <div
                                    :class="{'pass': scope.row.success, 'fail':!scope.row.success}"
                                    v-text="scope.row.success === true ? 'Pass' :'Fail'"
                                ></div>
                            </template>
                        </el-table-column>

                        <el-table-column
                            label="操作"
                            width="100">

                                <template slot-scope="scope">
                                    <el-button @click="handleClick(scope.row.summary)" type="text" size="small">查看</el-button>
                                    <el-dialog title="报告详情" :visible.sync="dialogTableVisible" :modal="false" width="65%">
                                        <el-table :data="reportData2">
                                            <el-table-column width="80"  label="通过状态">
                                                <template slot-scope="prop">
                                                    <div
                                                        :class="{'pass': scope.row.success, 'fail':!scope.row.success}"
                                                        v-text="scope.row.success === true ? 'Pass' :'Fail'"
                                                    ></div>
                                                </template>
                                            </el-table-column>
                                            <el-table-column width="160" label="测试时间">
                                                <template slot-scope="prop">
                                                    <div>{{prop.row.time.start_at|timestampToTime}}</div>
                                                </template>
                                            </el-table-column>
                                            <el-table-column width="100"  label="持续时间">
                                                <template slot-scope="prop">
                                                    <div v-text="prop.row.time.duration.toFixed(3)+' 秒'"></div>
                                                </template>
                                            </el-table-column>
                                            <el-table-column width="80" label="总计接口">
                                                <template slot-scope="prop">
                                                     <el-tag>{{ prop.row.stat.teststeps.total }}</el-tag>
                                                </template>
                                            </el-table-column>
                                            <el-table-column width="80"  label="通过个数">
                                                <template slot-scope="prop">
                                                    <el-tag type="success"> {{ prop.row.stat.teststeps.successes }}</el-tag>
                                                </template>
                                            </el-table-column>
                                            <el-table-column width="80" label="失败个数">
                                                <template slot-scope="prop">
                                                    <el-tag type="danger">{{ prop.row.stat.teststeps.failures }}</el-tag>
                                                </template>
                                            </el-table-column>
                                            <el-table-column width="80" label="异常个数">
                                                <template slot-scope="prop">
                                                    <el-tag type="warning">{{ prop.row.stat.teststeps.errors }}</el-tag>
                                                </template>
                                            </el-table-column>
                                            <el-table-column width="80"  label="跳过个数">
                                                <template slot-scope="prop">
                                                    <el-tag type="info">{{ prop.row.stat.teststeps.skipped }}</el-tag>
                                                </template>
                                            </el-table-column>
                                            <el-table-column width="150"  label="系统信息">
                                                <template slot-scope="prop">
                                                    <el-popover trigger="hover" placement="top">
                                                        <p>HttpRunner: {{ prop.row.platform.httprunner_version }}</p>
                                                        <p>Platform: {{ prop.row.platform.platform }}</p>
                                                        <div slot="reference" class="name-wrapper">
                                                            <el-tag size="medium">{{ prop.row.platform.python_version }}</el-tag>
                                                        </div>
                                                    </el-popover>
                                                </template>
                                            </el-table-column>
                                        </el-table>
                                    </el-dialog>
                                </template>
                        </el-table-column>

                        <el-table-column>
                            <template slot-scope="scope">
                                <el-row v-show="currentRow === scope.row">
                                    <el-button
                                        type="info"
                                        icon="el-icon-view"
                                        circle size="mini"
                                        @click="handleWatchReports(scope.$index, scope.row.id)"
                                    >
                                    </el-button>

                                    <el-button
                                        type="danger"
                                        icon="el-icon-delete"
                                        circle size="mini"
                                        @click="handleDelReports(scope.$index, scope.row.id)"
                                    >
                                    </el-button>
                                </el-row>
                            </template>

                        </el-table-column>

                    </el-table>
                </div>
            </el-main>
        </el-container>
    </el-container>

</template>

<script>
    import { reportList, deleteReports, delAllReports} from '@/restful/api'
    export default {


        data() {
            return {
                search: '',
                selectReports: [],
                currentRow: '',
                currentPage: 1,
                reportData: {
                    "results": {}
                },
                reportData2: [],
                dialogTableVisible: false,
            }
        },
        filters :{
            formatReportType (num){
                if (num == 1) {
                    return "调试用例报告"
                }
                if (num == 2) {
                    return "异步任务报告"
                }
                else {
                    return "定时任务报告"
                }
            }
        },
        methods: {

            handleClick(row) {
                var row_data = '';
                row_data = row.toLowerCase();

                this.reportData2 = eval(row_data);
                this.dialogTableVisible = true
            },

            cellMouseEnter(row) {
                this.currentRow = row;
            },

            cellMouseLeave(row) {
                this.currentRow = '';
            },

            handleWatchReports(index, row) {
                window.open(this.$api.baseUrl + "/api/reports/" + index + "/")
            },

            handleSelectionChange(val) {
                this.selectReports = val;
            },


            handleCurrentChange(val) {
                this.$api.getReportsPaginationBypage({
                    params: {
                        page: this.currentPage,
                        project: this.$route.params.id,
                        search: this.search
                    }
                }).then(resp => {
                    this.reportData = resp;
                })
            },

            handleDelReports(index, row) {
                this.$confirm('此操作将永久删除该测试报告，是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }).then(() => {
                    this.$api.deleteReports(index).then(resp => {
                        if (resp.success) {
                            this.getReportList();
                        } else {
                            this.$message.error(resp.msg);
                        }
                    })
                })
            },

            delSelectionReports() {
                if (this.selectReports.length !== 0) {
                    this.$confirm('此操作将永久删除勾选的测试报告，是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                    }).then(() => {
                        this.$api.delAllReports({data: this.selectReports}).then(resp => {
                            this.getReportList();
                        })
                    })
                } else {
                    this.$notify.warning({
                        title: '提示',
                        message: '请至少勾选一个测试报告',
                        duration: 1000
                    })
                }
            },
            getReportList() {
                reportList({
                    params: {
                        project: this.$route.params.id,
                        search: this.search
                    }
                }).then(resp => {
                    this.reportData = resp;
                })
            },
        },
        name: "ReportList",
        mounted() {
            this.getReportList();
        }
    }
</script>

<style scoped>
    .pass {
        font-weight: bold;
        color: #13ce66;
    }
    .fail {
        font-weight: bold;
        color: red;
    }


</style>
