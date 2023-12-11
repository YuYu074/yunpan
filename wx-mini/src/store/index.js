import { defineStore } from "@mpxjs/pinia"
import { ref, computed } from "@mpxjs/core"

const useSetupStore = defineStore("useSetup", () => {
  let tabbarIndex = ref(0)
  const getTabbarIndex = computed(() => tabbarIndex.value)
  const setTabbarIndex = (e) => (tabbarIndex.value = e)

  return {
    tabbarIndex,
    getTabbarIndex,
    setTabbarIndex
  }
})

export { useSetupStore }
