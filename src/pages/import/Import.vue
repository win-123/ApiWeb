<template>
    <el-container>
        <el-header style="background: #fff; padding: 0; ">
          <div>
              用于对excel 文件进行导入，导出
          </div>
        </el-header>

        <el-container>
            <el-main style="padding: 0;">
                <el-input id="upload" type="file" @change="importfxx(this)" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" style="width: 200px; margin-right: 50px">

                </el-input>

                <el-button @click="outExe" type="info">导出</el-button>

            </el-main>
        </el-container>
    </el-container>

</template>

<script>
    export default {
        name: "Import",
        data() {
            return {
                dataList: [],
            };
        },
        methods: {

            // 导入函数
            importfxx(obj) {
                let _this = this;
                let inputDOM = this.$refs.inputer;
                // 通过DOM取文件数据

                this.file = event.currentTarget.files[0];

                var rABS = false; //是否将文件读取为二进制字符串
                var f = this.file;

                var reader = new FileReader();
                //if (!FileReader.prototype.readAsBinaryString) {
                FileReader.prototype.readAsBinaryString = function(f) {
                    var binary = "";
                    var rABS = false; //是否将文件读取为二进制字符串
                    var pt = this;
                    var wb; //读取完成的数据
                    var outdata;
                    var reader = new FileReader();
                    reader.onload = function(e) {
                        var bytes = new Uint8Array(reader.result);
                        var length = bytes.byteLength;
                        for (var i = 0; i < length; i++) {
                            binary += String.fromCharCode(bytes[i]);
                        }
                        var XLSX = require("xlsx");
                        console.log(12121212, XLSX)
                        if (rABS) {
                            wb = XLSX.read(btoa(fixdata(binary)), {
                                //手动转化
                                type: "base64"
                            });
                        } else {
                            wb = XLSX.read(binary, {
                                type: "binary"
                            });
                        }
                        // 拿到outdata 后可以进行操作 e.g 写入等。
                        outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]); //outdata就是你想要的东西

                        console.log(33333333, outdata)
                        _this.$message({
                            message: "导入成功",
                            type: "SUCCESS"
                        })
                    };

                    reader.readAsArrayBuffer(f);
                };
                if (rABS) {
                    reader.readAsArrayBuffer(f);
                } else {
                    reader.readAsBinaryString(f);
                }
            },

            // 导出函数
            outExe() {
                this.$confirm('此操作将导出excel文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.excelData = this.dataList //你要导出的数据list。
                    this.export2Excel()
                }).catch(() => {

                });
            },

            formatJson(filterVal, jsonData) {
                console.log(22222, jsonData)
                return jsonData.map(v => filterVal.map(j => v[j]))
            },

            export2Excel() {
                var that = this;
                require.ensure([], () => {
                    const { export_json_to_excel } = require('../../assets/excel/Export2Excel'); //这里必须使用绝对路径
                    const tHeader = ['事项','重要程度','状态','成果物','开始时间','结束时间','延期时间','成果物'];// 导出的表头名
                    const filterVal = ['title', 'level', 'status', 'gain','startdate', 'enddate', 'newenddate','description', ];// 导出的表头字段名
                    var xlsxTable = that.excelData
                    xlsxTable.forEach((item,i)=>{
                        console.log(item)
                        if(item.level==2){
                            item.level = "重要"
                        }else{
                            item.level = "一般"
                        }
                        if(item.status==1){
                            item.status="进行中"
                        }else if(item.status==2){
                            item.status ="审核中"
                        }else{
                            item.status="已完成"
                        }
                    })
                    const list = xlsxTable;
                    const data = this.formatJson(filterVal, list);

                    export_json_to_excel(tHeader, data, `管理`);// 导出的表格名称，根据需要自己命名
                })
            },


        }

    }

</script>

<style scoped>

</style>
