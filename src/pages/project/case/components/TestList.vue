<template>
    <el-container   v-if="testData.data">
        <el-header style="padding-top: 10px; height: 50px;">
            <div style="overflow: hidden">
                <el-row :gutter="50">
                    <el-col :span="6" v-if="testData.data.length >= 1">
                        <el-input placeholder="请输入用例名称" clearable v-model="search">
                            <el-button slot="append" icon="el-icon-search" @click="getTestList"></el-button>
                        </el-input>
                    </el-col>
                    <el-col :span="7">
                        <el-pagination
                            @current-change="handleCurrentChange"
                            :current-page.sync="currentPage"
                            :page-size="11"
                            v-show="testData.data.length !== 0 "
                            background
                            layout="total, prev, pager, next, jumper"
                            :total="testData.data.length"
                        >
                        </el-pagination>
                    </el-col>
                </el-row>
            </div>
        </el-header>

        <el-container>
            <el-main style="padding: 0; margin-left: 10px;">
                <div style="position: fixed; bottom: 0; right:0; left: 500px; top: 160px">
                    <el-dialog
                        v-if="dialogTableVisible"
                        :visible.sync="dialogTableVisible"
                        width="70%"
                        :modal-append-to-body="false"
                    >
                        <report :summary="summary"></report>
                    </el-dialog>

                    <el-dialog
                        title="Run Case"
                        :visible.sync="dialogTreeVisible"
                        width="45%"
                        :modal-append-to-body="false"
                    >
                        <div>
                            <div>
                                <el-row :gutter="2">
                                    <el-col :span="8">
                                        <el-switch
                                            style="margin-top: 10px"
                                            v-model="asyncs"
                                            active-color="#13ce66"
                                            inactive-color="#ff4949"
                                            active-text="异步执行"
                                            inactive-text="同步执行">
                                        </el-switch>
                                    </el-col>
                                    <el-col :span="10">
                                        <el-input
                                            v-show="asyncs"
                                            clearable
                                            placeholder="请输入报告名称"
                                            v-model="reportName"
                                            :disabled="false">
                                        </el-input>

                                    </el-col>
                                </el-row>
                            </div>
                            <div style="margin-top: 20px">
                                <el-input
                                    placeholder="输入关键字进行过滤"
                                    v-model="filterText"
                                    size="medium"
                                    clearable
                                    prefix-icon="el-icon-search"
                                >
                                </el-input>

                                <el-tree
                                    :filter-node-method="filterNode"
                                    :data="dataTree"
                                    show-checkbox
                                    node-key="id"
                                    :expand-on-click-node="false"
                                    check-on-click-node
                                    :check-strictly="true"
                                    :highlight-current="true"
                                    ref="tree"
                                >
                            <span class="custom-tree-node" slot-scope="{ node, data }">
                                <span>
                                    <i class="iconfont" v-html="expand"></i>&nbsp;&nbsp;
                                    {{ node.label }}
                                </span>
                            </span>
                                </el-tree>
                            </div>

                        </div>
                        <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogTreeVisible = false">取 消</el-button>
                    <el-button type="primary" @click="runTree">确 定</el-button>
                  </span>
                    </el-dialog>
                    <el-table

                        highlight-current-row
                        v-loading="loading"
                        ref="multipleTable"
                        :data="testData.data"
                        :show-header="testData.data.length !== 0 "
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
                            label="用例名称"
                        >
                            <template slot-scope="scope">
                                <div>{{scope.row.name}}</div>
                            </template>
                        </el-table-column>

                        <el-table-column
                            label="API个数"
                        >
                            <template slot-scope="scope">
                                <div>{{scope.row.length}} 个</div>
                            </template>
                        </el-table-column>

                        <el-table-column
                            label="用例类型"
                        >
                            <template slot-scope="scope">
                                <el-tag>{{ scope.row.tag | formatTestType}}</el-tag>
                                <!--<el-tag v-if="scope.row.tag==='冒烟用例'">{{scope.row.tag}}</el-tag>-->
                                <!--<el-tag v-if="scope.row.tag==='集成用例'" type="success">{{scope.row.tag}}</el-tag>-->
                                <!--<el-tag v-if="scope.row.tag==='监控脚本'" type="danger">{{scope.row.tag}}</el-tag>-->
                            </template>
                        </el-table-column>


                        <el-table-column
                            label="更新时间"
                        >
                            <template slot-scope="scope">
                                <div>{{scope.row.update_time || date | formatDate}}</div>

                            </template>
                        </el-table-column>

                        <el-table-column
                        >
                            <template slot-scope="scope">
                                <el-row v-show="currentRow === scope.row">
                                    <el-button
                                        type="info"
                                        icon="el-icon-edit"
                                        circle size="mini"
                                        @click="handleEditTest(scope.row.id)"
                                    ></el-button>

                                    <el-button
                                        type="primary"
                                        icon="el-icon-caret-right"
                                        circle size="mini"
                                        @click="handleRunTest(scope.row.id, scope.row.name)"
                                    ></el-button>

                                    <el-button
                                        type="success"
                                        icon="el-icon-document"
                                        circle size="mini"
                                        @click="handleCopyTest(scope.row.id)"
                                    >
                                    </el-button>

                                    <el-button
                                        type="danger"
                                        icon="el-icon-delete"
                                        circle size="mini"
                                        @click="handleDelTest(scope.row.id)"
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
    import Report from '../../../reports/DebugReport'

    export default {

        name: "TestList",
        components: {
            Report
        },

        props: {
            run: Boolean,
            back: Boolean,
            project: {
                require: true
            },
            host: {
                require: true
            },
            node: {
                require: false
            },
            del: Boolean
        },

        watch: {
            filterText(val) {
                this.$refs.tree.filter(val);
            },

            run() {
                this.asyncs = false;
                this.reportName = "";
                this.getTree();
            },
            node() {
                this.search = '';
                this.getTestList();
            },

            back() {
                this.getTestList();
            },

            del() {
                if (this.selectTest.length !== 0) {
                    this.$confirm('此操作将永久删除测试用例集，是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                    }).then(() => {
                        this.$api.delAllTest({data: this.selectTest}).then(resp => {
                            this.getTestList();
                        })
                    })
                } else {
                    this.$notify.warning({
                        title: '提示',
                        message: '请至少选择一个用例集',
                        duration: 1000
                    })
                }
            }
        },
        data() {
            return {
                search: '',
                reportName: '',
                asyncs: false,
                filterText: '',
                expand: '&#xe65f;',
                dialogTreeVisible: false,
                dataTree: {},
                loading: false,
                dialogTableVisible: false,
                selectTest: [],
                summary: {},
                currentRow: '',
                testData: {
                    count: 0,
                    results: []
                },
                currentPage: 1,
                date: new Date(),
            }
        },
        filters: {
            formatDate:function (value) {
                var date = new Date(value);
                var year = date.getFullYear();
                var month = date.getMonth()+1;
                var day = date.getDate();
                var hours = date.getHours();
                var minutes = date.getMinutes();
                var seconds = date.getSeconds();
                return year + '-' + month + '-' + day + ' ' + ' ' + hours + ':' + minutes + ':' + seconds;
            },
            formatTestType (num){
                if (num == 1) {
                    return "冒烟用例"
                }
                if (num == 2) {
                    return "集成用例"
                }
                else {
                    return "监控脚本"
                }
            }
        },

        methods: {
            getTree() {
                this.$api.getTree({
                    params: {
                        project: this.$route.params.id,
                        type: 2
                    }
                }).then(resp => {
                    this.RelationData = resp;
                    for(var i=0; i< this.RelationData.data.length; i++){
                        this.dataTree = eval('('+ this.RelationData.data[i].tree+ ')');
                        this.treeId = this.RelationData.data[i].id;
                        this.maxId = this.RelationData.data[i].maxId;
                        for(var j=0; j<this.dataTree.length; j++){
                            this.treeData = this.dataTree[j]
                        }
                    }
                    this.dialogTreeVisible = true;
                })
            },

            filterNode(value, data) {
                if (!value) return true;
                return data.label.indexOf(value) !== -1;
            },

            runTree() {
                this.dialogTreeVisible = false;
                const relation = this.$refs.tree.getCheckedKeys();
                if (relation.length === 0) {
                    this.$notify.error({
                        title: '提示',
                        message: '请至少选择一个节点',
                        duration: 1500
                    });
                } else {
                    this.$api.runSuiteTree({
                        "host":this.host,
                        "project": this.project,
                        "relation": relation,
                        "async": this.asyncs,
                        "name": this.reportName
                    }).then(resp => {
                        if (resp.hasOwnProperty("status")) {
                            this.$message.info({
                                message: resp.msg,
                                duration: 1500
                            });
                        } else {
                            this.summary = resp;
                            this.dialogTableVisible = true;
                        }
                    })
                }
            },

            handleRunTest(id, name) {
                this.loading = true;
                this.$api.runTestByPk({
                    params: {
                        id: id,
                        project: this.project,
                        name: name,
                        host:this.host
                    }
                }).then(resp => {
                    this.summary = resp;
                    this.dialogTableVisible = true;
                    this.loading = false;
                }).catch(resp => {
                    this.loading = false;
                })
            },
            handleCurrentChange(val) {
                this.$api.getTestPaginationBypage({
                    params: {
                        page: this.currentPage,
                        project: this.project,
                        node: this.node,
                        search: this.search
                    }
                }).then(resp => {
                    this.testData = resp;
                })
            },

            handleEditTest(id) {
                this.$api.editTest(id).then(resp => {
                    console.log(4544545, resp)
                    this.$emit('testStep', resp);
                })
            },

            handleCopyTest(id) {
                this.$prompt('请输入用例集名称', '提示', {
                    confirmButtonText: '确定',
                    inputPattern: /^[\s\S]*.*[^\s][\s\S]*$/,
                    inputErrorMessage: '用例集不能为空'
                }).then(({value}) => {
                    this.$api.coptTest(id, {
                        'name': value,
                        'relation': this.node,
                        'project': this.project
                    }).then(resp => {
                        if (resp.success) {
                            this.getTestList();
                        } else {
                            this.$message.error(resp.msg);
                        }
                    })
                })
            },

            handleSelectionChange(val) {
                this.selectTest = val;
            },

            handleDelTest(id) {
                this.$confirm('此操作将永久删除该测试用例集，是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }).then(() => {
                    this.$api.deleteTest(id).then(resp => {
                        if (resp.success) {
                            this.getTestList();
                        } else {
                            this.$message.error(resp.msg)
                        }
                    })
                })
            },
            getTestList() {
                this.$api.testList({
                    params: {
                        project: this.project,
                        node: this.node,
                        search: this.search
                    }
                }).then(resp => {
                    this.testData = resp;
                })
            },
            cellMouseEnter(row) {
                this.currentRow = row;
            },

            cellMouseLeave(row) {
                this.currentRow = '';
            }
        },
        mounted() {
           this.getTestList()
        }
    }
</script>

<style scoped>

</style>
