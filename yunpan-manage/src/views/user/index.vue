<template>
  <CommonPage>
    <div class="mt-12 flex">
      <n-card class="ml-12 w-50%" title="会员等级" segmented>
        <VChart :option="skillOption" :init-options="{ height: 400 }" autoresize />
      </n-card>

      <n-card class="ml-12 w-50%" title="用户空间使用量" segmented>
        <VChart :option="skillOption2" :init-options="{ height: 400 }" autoresize />
      </n-card>
    </div>

    <n-card class="mt-12" title="⚡️ 活跃用户趋势" segmented>
      <VChart :option="trendOption" :init-options="{ height: 400 }" autoresize />
    </n-card>
  </CommonPage>
</template>

<script setup>
import { useUserStore } from '@/store'
import * as echarts from 'echarts/core'
import { TooltipComponent, GridComponent, LegendComponent } from 'echarts/components'
import { BarChart, LineChart, PieChart } from 'echarts/charts'
import { UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'
import VChart from 'vue-echarts'
import api from './api'

defineOptions({ name: 'UserMgt' })
const userStore = useUserStore()

echarts.use([
  TooltipComponent,
  GridComponent,
  LegendComponent,
  BarChart,
  LineChart,
  CanvasRenderer,
  UniversalTransition,
  PieChart,
])

const trendOption = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      crossStyle: {
        color: '#999',
      },
    },
  },
  legend: {
    top: '5%',
    data: ['user'],
  },
  xAxis: [
    {
      type: 'category',
      data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      axisPointer: {
        type: 'shadow',
      },
    },
  ],
  yAxis: [
    {
      type: 'value',
      min: 0,
      max: 500,
      interval: 100,
      axisLabel: {
        formatter: '{value}',
      },
    },
  ],
  series: [
    {
      name: 'user',
      yAxisIndex: 0,
      type: 'bar',
      data: [40, 72, 110, 115, 121, 175, 180, 201, 260, 398, 423, 455]
    },
  ],
}

const skillOption = {
  tooltip: {
    trigger: 'item',
    formatter({ name, value }) {
      return `${name} ${value}%`
    },
  },
  legend: {
    left: 'center',
  },
  series: [
    {
      top: '12%',
      type: 'pie',
      radius: ['35%', '90%'],
      avoidLabelOverlap: true,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2,
      },
      label: {
        show: false,
        position: 'center',
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 36,
          fontWeight: 'bold',
        },
      },
      labelLine: {
        show: false,
      },
      data: [
        { value: 38.5, name: '普通会员' },
        { value: 37.0, name: '黄金会员' },
        { value: 12.7, name: '白金会员' },
        { value: 1.8, name: '黑金会员' }
      ],
    },
  ],
}

const skillOption2 = {
  tooltip: {
    trigger: 'item',
    formatter({ name, value }) {
      return `${name} ${value}%`
    },
  },
  legend: {
    left: 'center',
  },
  series: [
    {
      top: '12%',
      type: 'pie',
      radius: ['35%', '90%'],
      avoidLabelOverlap: true,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2,
      },
      label: {
        show: false,
        position: 'center',
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 36,
          fontWeight: 'bold',
        },
      },
      labelLine: {
        show: false,
      },
      data: [
        { value: 22, name: '< 1GB' },
        { value: 36, name: '1GB - 5GB' },
        { value: 29, name: '5GB - 20GB' },
        { value: 13, name: '> 20GB' }
      ],
    },
  ],
}

const message = $message
</script>
