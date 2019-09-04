<template>

    <el-container>
        <el-header style="background: #fff; padding: 0; ">
            <div class="nav-api-header">
                <div style="padding-top: 10px; margin-left: 10px">
                    &nbsp环境:
                    <el-select
                        placeholder="请选择"
                        size="small"
                        tyle="margin-left: -6px"
                        v-model="currentHost"
                    >
                        <el-option
                            v-for="item in hostOptions.data"
                            :key="item.id"
                            :label="item.name"
                            :value="item.name">
                        </el-option>
                    </el-select>
                    &nbsp多进程:
                    <el-select
                        placeholder="请选择"
                        size="small"
                        tyle="margin-left: -6px"
                        v-model="currentConfig"
                    >
                        <el-option
                            v-for="item in configOptions.data"
                            :key="item.id"
                            :label="item.name"
                            :value="item.name">
                        </el-option>
                    </el-select>

                    <!--<el-button-->
                        <!--v-if="!addAPIFlag"-->
                        <!--style="margin-left: 20px"-->
                        <!--type="primary"-->
                        <!--icon="el-icon-caret-right"-->
                        <!--circle-->
                        <!--size="mini"-->
                        <!--@click="run = !run"-->
                    <!--&gt;</el-button>-->


                    <!--<el-button-->
                        <!--v-if="!addAPIFlag"-->
                        <!--type="danger"-->
                        <!--icon="el-icon-delete"-->
                        <!--circle-->
                        <!--size="mini"-->
                        <!--@click="del = !del"-->
                    <!--&gt;</el-button>-->

                    <el-button
                        size="mini"
                    >
                        编辑
                    </el-button>
                    <el-button
                        type="text"
                        size="small"
                        :disabled=status
                    >
                        查看
                    </el-button>


                </div>
            </div>
        </el-header>

        <el-container>

                <el-table
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange"
                >
                    <el-table-column
                        type="selection"
                        width="55">
                    </el-table-column>
                    <el-table-column
                        prop="method"
                        label="请求方式"
                        width="120">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="接口名"
                        width="120">
                    </el-table-column>
                    <el-table-column
                        prop="url"
                        label="接口"
                        show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                        prop="weight"
                        label="权重"
                        width="120">
                    </el-table-column>

                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button
                                size="mini"
                                @click="handleEdit(scope.$index, scope.row)">
                                编辑
                            </el-button>
                            <el-button
                                @click="handleClick(scope.row)"
                                type="text"
                                size="small"
                                :disabled=status
                            >
                                查看
                            </el-button>

                            <el-dialog title="压力测试" :visible.sync="dialogFormVisible">
                                <el-form
                                    :model="variablesForm"
                                >
                                    <el-form-item label="URL" :label-width="formLabelWidth">
                                        <el-input v-model="variablesForm.url" ></el-input>
                                    </el-form-item>
                                    <el-form-item label="Api" :label-width="formLabelWidth">
                                        <el-input v-model="variablesForm.api"></el-input>
                                    </el-form-item>
                                    <el-form-item label="Weight" :label-width="formLabelWidth">
                                        <el-input v-model="variablesForm.weight"></el-input>
                                    </el-form-item>

                                </el-form>
                                <div slot="footer" class="dialog-footer">
                                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                                    <el-button type="primary" @click="handleConfirm('variablesForm')">确 定</el-button>
                                </div>
                            </el-dialog>
                        </template>
                    </el-table-column>
                </el-table>
        </el-container>
    </el-container>

</template>

<script>
    export default {
        data() {
            return {
                dialogTableVisible: false,
                dialogFormVisible: false,
                formLabelWidth: '120px',
                status:true,
                variablesForm: {
                    url: '',
                    api: '',
                    weight: '',
                },


                configOptions: [],
                hostOptions: [],
                currentConfig: '请选择',
                currentHost: '请选择',
                back: false,
                del: false,
                run: false,

                response: '',

                rules: {
                    name: [
                        {required: true, message: '请输入节点名称', trigger: 'blur'},
                        {min: 1, max: 50, message: '最多不超过50个字符', trigger: 'blur'}
                    ]
                },
                addAPIFlag: false,

                tableData: [],
                multipleSelection: []
            }
        },

        mounted() {
            this.getAPIList();
        },

        methods: {
            handleEdit(index, row){
                this.dialogFormVisible = true
            },

            handleClick() {
                window.open("http://127.0.0.1:8089")
            },

            handleConfirm(formName) {

                this.dialogFormVisible = false;

                this.$api.runLocust(
                    this.variablesForm
                ).then(resp => {
                    console.log(34343434, resp)
                    if (resp.code != 0) {
                        this.$message.info({
                            message: resp.msg,
                            duration: 1000
                        })
                    } else {
                        this.status = false;
                    }
                })

            },


            getAPIList() {
                this.$api.apiList({
                    params: {
                        project: this.$route.params.id,
                    }
                }).then(res => {
                    this.tableData = res.data;
                })
            },



            toggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            }
        }
    }
</script>

<style scoped>


</style>
