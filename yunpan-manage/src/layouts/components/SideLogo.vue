<template>
  <router-link class="h-60 f-c-c" to="/">
    <img src="@/assets/images/logo2.png" class="h-40" />
    <!-- <TheLogo class="rounded-8!" /> -->
    <h2
      v-show="!appStore.collapsed"
      class="ml-10 max-w-140 flex-shrink-0 text-16 color-primary font-bold"
    >
      {{ title }}
    </h2>
  </router-link>
</template>

<script setup>
import { useAppStore } from '@/store'
const title = '网盘后台管理系统'

const appStore = useAppStore()
</script>
