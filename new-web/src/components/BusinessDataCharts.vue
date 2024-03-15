
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
      <div><h3>近一个月营业额</h3>
                <div ref="lineChart" style="width: 100%; height: 400px;"></div>
          <h3>近一个月新增用户数</h3>
                <div ref="userLineChart" style="width: 100%; height: 400px;"></div>
          </div>
        <div ref="pieChart" style="width: 100%; height: 400px;"></div>
        </el-main>
            </el-container>
        </el-container>

    </div>
</template>

<script>
import * as echarts from 'echarts'

export default {
    data() {
        return {
            lineChart: null,
            pieChart: null,
            userLineChart:null,
              data: {
                dateList: [],
                moneyList: [],
                cardTypeList:[],
                valueList:[],
                userDateList:[],
                userList:[],
            },    
        }
    },
    methods: {
        initLineChart() {
            this.lineChart = echarts.init(this.$refs.lineChart)
            this.lineChart.setOption(this.option)
        },
        initPieChart() {
            this.pieChart = echarts.init(this.$refs.pieChart)
            this.pieChart.setOption(this.options)
        },
         initUserLineChart() {
            this.userLineChart = echarts.init(this.$refs.userLineChart)
            this.userLineChart.setOption(this.optioned)
        },
    },
    mounted() {
        setTimeout(() => {
            this.initLineChart()
            this.initPieChart()
            this.initUserLineChart()
        }, 100)
    },
     created: function () {
        this.$http.get("/admin/chart/money").then((Response) => {
            this.data.dateList = Response.data.data.dateList.split(",");
            this.data.moneyList = Response.data.data.moneyList.split(",").map(Number);
        }) ;
        this.$http.get("/admin/chart/cardType").then((Response) => {
            this.data.cardTypeList = Response.data.data.cardTypeList.split(",");
            this.data.valueList = Response.data.data.valueList.split(",").map(Number);

        });
        this.$http.get("/admin/chart/user").then((Response) => {
            this.data.userDateList = Response.data.data.userDateList.split(",");
            this.data.userList = Response.data.data.userList.split(",").map(Number);

        })

    },
    computed:{
        option(){
            return{
                xAxis: {
                    type: 'category',
                    data: this.data.dateList
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: this.data.moneyList,
                    type: 'line',
                    smooth: true,
                     label: {
                        show: true, // 显示标签
                        position: 'top' // 标签位置
                    }
                }]
            }
            },
            options(){
                return{ title: {
                    text: '会员卡销售占比',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b}: {c}人 ({d}%)'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    data: this.data.cardTypeList
                },
                series: [
                    {
                        name: '会员卡类型',
                        type: 'pie',
                        radius: ['50%', '70%'],
                        avoidLabelOverlap: false,
                        label: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: '30',
                                fontWeight: 'bold'
                            }
                        },
                        labelLine: {
                            show: false
                        },
                        data: this.data.cardTypeList.map((item, index) => {
                            return {
                                value: this.data.valueList[index],
                                name: item
                            };
                        })
                    }
                ]}
               
            },
            optioned(){
            return{
                xAxis: {
                    type: 'category',
                    data: this.data.userDateList
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: this.data.userList,
                    type: 'line',
                    smooth: true,
                     label: {
                        show: true, // 显示标签
                        position: 'top' // 标签位置
                    }
                }]
            }
            },
            }
        }



</script>

<style scoped>
.router-link-active {
    text-decoration: none;
    color: rgba(123，123，12);
}

a {
    text-decoration: none;
    color: rgb(7, 7, 7);
}

.container-header img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
</style>