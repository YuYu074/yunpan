<template>
  <AppPage show-footer>
    <div class="flex">
      <n-card class="min-w-200 w-30%">
        <div class="flex items-center">
          <n-avatar round :size="60" :src="userStore.avatar" class="flex-shrink-0" />
          <div class="ml-20 flex-col">
            <span class="text-20 opacity-80">
              Hello, {{ userStore.nickName ?? userStore.username }}
            </span>
            <span class="mt-4 opacity-50">当前角色：{{ userStore.currentRole?.name }}</span>
          </div>
        </div>

        <p class="mt-28 text-14 opacity-60">一个人几乎可以在任何他怀有无限热忱的事情上成功。</p>
      </n-card>
      <n-card class="ml-12 w-70%" title="✨ 欢迎使用 小鱼网盘后台管理系统V2.0">

        <p class="opacity-60">
          欢迎使用我的个人网盘系统，这是一款专为个人用户打造的云端存储与分享解决方案。
        </p>
        <p class="opacity-60">
          小鱼网盘系统致力于为用户提供安全、高效、便捷的文件存储与共享体验。
        </p>
        <footer class="mt-12 flex items-center justify-end">
          <n-button
            type="primary"
            class="ml-12"
            tag="a"
            href="https://gitee.com/yu-yang686/yunpan"
            target="__blank"
          >
            代码仓库
          </n-button>
        </footer>
      </n-card>
    </div>
    <div class="mt-12 flex">
      <n-card class="w-50%" title="💯 我们的优势" segmented>
        <!-- <template #header-extra>
          <span class="opacity-90 text-highlight">👏 历经十几次重构和细节打磨</span>
        </template> -->

        <ul class="opacity-90">
          <li class="py-4">
            🍇 
            <b>海量存储</b>
            : 提供大容量的云存储空间，满足您日益增长的存储需求。
          </li>
          <li class="py-4">
            🍇 
            <b>高速上传下载</b>
            : 采用先进的网络传输技术，确保文件上传和下载的高速稳定。
          </li>
          <li class="py-4">
            🍇 
            <b>文件管理与分类</b>
            : 支持文件夹创建、文件移动、重命名等操作，方便您轻松管理自己的文件。
          </li>
          <li class="py-4">
            🍇 
            <b>安全保障</b>
            : 采用多重加密技术，确保用户数据的安全与隐私。同时，提供定期备份和恢复功能，防止数据丢失。
          </li>
          <li class="py-4">
            🍇 
            <b>简单易用</b>
            : 界面简洁明了，操作便捷，无需复杂设置即可轻松上手。
          </li>
          <li class="py-4">
            🍇 
            <b>免费试用与升级</b>
            : 提供免费试用版本，让您体验我们的网盘系统。同时，提供多种付费升级选项，满足您不同层次的存储需求。
          </li>
        </ul>

        <n-divider class="mb-0! mt-12!">
          <p class="text-14 opacity-60">
            👉 更多实用功能，持续开发中...
          </p>
        </n-divider>
      </n-card>

      <n-card class="ml-12 w-50%" title="🛠️ 技术栈" segmented>
        <VChart :option="skillOption" autoresize />
      </n-card>
    </div>

    <n-card class="mt-12" title="⚡️ 用户趋势" segmented>
      <VChart :option="trendOption" :init-options="{ height: 400 }" autoresize />
    </n-card>
  </AppPage>
</template>

<script setup>
import { useUserStore } from '@/store'
import * as echarts from 'echarts/core'
import { TooltipComponent, GridComponent, LegendComponent } from 'echarts/components'
import { BarChart, LineChart, PieChart } from 'echarts/charts'
import { UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'
import VChart from 'vue-echarts'

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
        { value: 38.5, name: 'Vue' },
        { value: 37.0, name: 'JavaScript' },
        { value: 6.5, name: 'CSS' },
        { value: 6.2, name: 'HTML' },
        { value: 1.8, name: 'Other' },
      ],
    },
  ],
}

const message = $message
</script>
