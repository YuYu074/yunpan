<template>
    <div>
        <el-container style="height: 700px; border: 1px solid #eee">
            <el-header
                style="display: flex; justify-content: center; align-items: center; border: 1px solid #6477DC; 
            background-color: #6477DC;font-size:30px; font-family: Arial,sans-serif;color: #eee; text-align: center; white-space: nowrap;">
                <img src="../assets/title.png" alt="title" style="height: 70; height: 70px;">
                书豪自习室管理系统
            </el-header>
            <el-container>
                <el-aside width="230px" style="border-bottom: 30px solid #eee;background-color: #eee;border-radius: 5%;">
                    <el-menu :default-openeds="[]">
                        <el-submenu index="1" style="background-color:#eee">
                            <template slot="title"><i class="el-icon-s-platform"></i>座位管理</template>
                            <el-menu-item-group>
                                <el-menu-item index="1-1">
                                    <router-link to="/FirstPage">座位管理</router-link>
                                </el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                        <el-submenu index="2" style="background-color:#eee">
                            <template slot="title"><i class="el-icon-s-home"></i>价格管理</template>
                            <el-menu-item-group>
                                <el-menu-item index="2-1"><router-link to="/PriceSet">价格管理
                                    </router-link>
                                </el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                        <el-submenu index="3" style="background-color: #eee">
                            <template slot="title"><i class="el-icon-truck"></i>公告管理</template>
                            <el-menu-item-group>
                                <el-menu-item index="3-1">
                                    <router-link to="/NoticeSet">公告管理</router-link>
                                </el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                        <el-submenu index="4" style="background-color: #eee">
                            <template slot="title"><i class="el-icon-s-data"></i>用户管理</template>
                            <el-menu-item-group>
                                <el-menu-item index="4-1"><router-link to="/UserSet">用户管理</router-link>
                                </el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                        <el-submenu index="5" style="background-color: #eee">
                            <template slot="title"><i class="el-icon-phone"></i>营业数据 </template>
                            <el-menu-item-group>
                                <el-menu-item index="5-1"> <router-link to="/BusinessData">订单信息</router-link>
                                </el-menu-item>
                                <el-menu-item index="5-2"> <router-link to="/BusinessDataCharts">营业数据</router-link>
                                </el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                    </el-menu>
                </el-aside>
                <el-main>

                   <!--  <el-form :model="form" ref="form">
                        <el-row style="height: 100px;"> -->
<!--                             <el-col :span="2">
                                <el-form-item>
                                    <el-button type="primary" @click="handleQuery">查询</el-button>
                                </el-form-item></el-col>
                            <el-col :span="7">
                                <el-input v-model="form.name" placeholder="请输入座位号" class="my-input"></el-input>
                            </el-col>

                            <el-col :span="6">
                                <el-form-item label="座位类型">
                                    <el-radio-group v-model="form.type" class="my-input">
                                        <el-radio label="1">沉浸式</el-radio>
                                        <el-radio label="0">普通座</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                            </el-col>
                            <el-col :span="7">
                                <el-form-item label="使用情况">
                                    <el-radio-group v-model="form.status" class="my-input">
                                        <el-radio label="1">已使用</el-radio>
                                        <el-radio label="0">未使用</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                            </el-col>
                            <el-col :span="7">
                                <el-input v-model="form.remarks" placeholder="请输入使用情况" class="my-input"></el-input>
                            </el-col> -->
                               <!--  <el-col :span="6">
                                    <el-form-item>
                            <el-button type="primary" round @click="dialogFormVisible = true"
                                class="right-btn">发布新公告</el-button>
                                    </el-form-item>
                                </el-col>
                            <el-dialog title="发布公告" :visible.sync="dialogFormVisible">
                                <el-form :model="form">
                                    <el-form-item label="公告内容" :label-width="formLabelWidth">
                                        <el-input v-model="form.name" autocomplete="off" placeholder="请输入公告内容"></el-input>
                                    </el-form-item>
                                </el-form>
                                <slot slot="footer" class="dialog-footer">
                                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                                    <el-button type="primary" @click="addItem">确 定</el-button>
                                </slot>
                            </el-dialog> -->
                     <!--    </el-row>
                    </el-form> -->
                    <el-table :data="tableData" style="width: 100%" :row-class-name="tableRowClassName">

                        <el-table-column prop="number" label="订单号" width="160">
                        </el-table-column>
                        <el-table-column prop="status" label="支付状态" width="80">
                             <template slot-scope="scope">
                          {{ scope.row.status == 1 ? '未付款' : (scope.row.status == 2?'已付款':'已取消') }}
                        </template>
                        </el-table-column>
                        <el-table-column prop="orderTime" label="下单时间" width="160">
                        </el-table-column>
                        <el-table-column prop="cardType" label="会员卡类型"  width="90">
                        </el-table-column>
                        <el-table-column prop="amount" label="金额" width="90">
                        </el-table-column>
                        <el-table-column prop="userName" label="下单人" width="100">
                        </el-table-column>
                        <el-table-column prop="phone" label="电话" width="120">
                        </el-table-column>
                        <el-table-column prop="cancelReason" label="取消原因" width="80">
                        </el-table-column>
                        <el-table-column prop="cancelTime" label="取消时间" :formatter="dateFormat" width="160">
                        </el-table-column>
                       <!--  <el-table-column fixed="right" label="操作" width="370">
                            <template slot-scope="scope">
                                <el-button @click="edit(scope.row)" type="primary" round size="small"
                                    class="el-icon-mouse">编辑</el-button> -->
                                <!-- <el-dialog title="修改座位" :visible.sync="dialogVisible">
                                 <el-form :model="form">
                            <el-form-item label="座位号" :label-width="formLabelWidth">
                              <el-input v-model="scope.row.name" autocomplete="on" ></el-input>
                            </el-form-item>
                            <el-form-item label="座位类型" :label-width="formLabelWidth">
                                  <el-select v-model="form.type" placeholder="座位类型">
                                    <el-option label="沉浸式" value="1"></el-option>
                                    <el-option label="普通座" value="0"></el-option>
                                  </el-select>
                                </el-form-item>
                                <el-form-item label="使用情况" :label-width="formLabelWidth">
                                  <el-select v-model="form.status" placeholder="使用情况">
                                    <el-option label="已使用" value="1"></el-option>
                                    <el-option label="未使用" value="0"></el-option>
                                  </el-select>
                                </el-form-item>
                            <el-form-item label="备注" :label-width="formLabelWidth">
                              <el-input v-model="form.remarks" autocomplete="on" ></el-input>
                            </el-form-item>
                                 </el-form>
                      <slot slot="footer" class="dialog-footer">
                        <el-button @click="dialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="modify" >确 定</el-button>
                        </slot>
                            </el-dialog> -->
                                <!-- <el-popconfirm title="确定删除座位吗？" @confirm="deleteUser(scope.row.id)">
                                    <el-button type="primary" slot="reference" round size="small"
                                        class="el-icon-delete-solid">删除</el-button>
                                </el-popconfirm>

                            </template>
                        </el-table-column> -->
                    </el-table>
                </el-main>
            </el-container>
        </el-container>

    </div>
</template>

<script>
import { ColorPicker } from 'element-ui';

export default {
    methods: {
        addItem() {
            // 向list新增item
            this.$http.post("/admin/notice/save", this.form)
                .then(response => {
                    //request success handler
                    //const message = JSON.stringify(response.data.msg) */// 假设后端返回数据格式为 {message: '添加数据成功'}
                    if (response.data.code === 1) {
                        this.$message({
                            message: "添加公告成功",
                            type: 'success'
                        });// 在前端页面上展示提示信息
                        this.dialogFormVisible = false;
                        this.form = {};
                        this.handleQuery();
                    } else {
                        this.$message({
                            message: response.data.msg,
                            type: 'error'
                        })// 在前端页面上展示提示信息}

                    }
                })
        },
        edit(row) {
            this.form = row;
            this.dialogFormVisible = true;
        },

        dateFormat(row, column, cellValue, index) {
        return new Date(cellValue).toLocaleString();
        },
      
      /*   deleteUser(id) {
            this.$http.delete('/seat/${id}').then((response) => {
                console.log(response);
                // 更新用户列表视图
            });
        }, */
        /*  handleClick(row) {
            
             this.$alert(dialogVisible = true ,{
                 callback: action => {
                     this.$message({
                         type: 'info',
                         message: `action: ${action}`
                     });
                 }
             });
         },  */
        handleQuery() {
           this.$http.get("/admin/data/show").then((Response) => {
                this.tableData = Response.data.data
            })

        },
        tableRowClassName({ row, rowIndex }) {
            if (rowIndex % 2 === 1) {
                return 'warning-row';
            } else if (rowIndex % 2 === 0) {
                return 'success-row';
            }
            return '';
        }
    },
    created: function () {
        this.$http.get("/admin/data/show").then((Response) => {
            this.tableData = Response.data.data
        })

    },

    data() {
        return {
            tableData: [],
            gridData: [],
            dialogVisible: false,
            dialogFormVisible: false,
            form: {
                number:'',
                status:'',
                orderTime:'',
                amount:'',
                userName:'',
                phone:'',
                cardType:'',
                cancelReason:'',
                cancelTime:'',
                id: ''
            },
            formLabelWidth: '120px'
        }
    }

}
</script>

<style scoped>
.router-link-active {
    text-decoration: none;
    color: rgba(138, 4, 4);
}

a {
    text-decoration: none;
    color: rgb(7, 7, 7);
}

.container-header {
    background: linear-gradient(to bottom, #4d4f4e, #d6d8d8);
}

.container-header img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}


.container {
    position: relative;
}

.right-btn {
    position: fixed;
}

.my-input>>>.el-input__inner {
    height: 28px;
    width: 185px;
    font-size: 14px;
}

.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
}

.el-table>>>.warning-row {
    background: rgb(255, 255, 255);
}

.el-table>>>.success-row {
    background: #ffffff;
}</style>