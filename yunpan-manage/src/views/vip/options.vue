<template>
  <CommonPage>
    <MeCrud ref="$table" :scroll-x="1200" :columns="columns" :get-data="api.read"></MeCrud>

    <MeModal ref="modalRef" width="520px">
      <n-form
        ref="modalFormRef"
        label-placement="left"
        label-align="left"
        :label-width="80"
        :model="modalForm"
        :disabled="modalAction === 'view'"
      >
        <n-form-item
          label="会员名称"
          path="vip_name"
          :rule="{
            required: true,
            message: '请输入会员名称',
            trigger: ['input', 'blur'],
          }"
        >
          <n-input v-model:value="modalForm.vip_name" :disabled="modalAction !== 'add'" />
        </n-form-item>
        <n-form-item
          label="一个月定价"
          path="vip_price_month"
          :rule="{
            required: true,
            message: '请输入一个月定价',
            trigger: ['input', 'blur'],
          }"
        >
          <n-input v-model:value="modalForm.vip_price_month" />
        </n-form-item>
        <n-form-item
          label="三个月定价"
          path="vip_price_quarter"
          :rule="{
            required: true,
            message: '请输入三个月定价',
            trigger: ['input', 'blur'],
          }"
        >
          <n-input v-model:value="modalForm.vip_price_quarter" />
        </n-form-item>
        <n-form-item
          label="一年定价"
          path="vip_price_year"
          :rule="{
            required: true,
            message: '请输入一年定价',
            trigger: ['input', 'blur'],
          }"
        >
          <n-input v-model:value="modalForm.vip_price_year" />
        </n-form-item>
      </n-form>
    </MeModal>
  </CommonPage>
</template>

<script setup>
import { NButton } from 'naive-ui'
import { MeCrud, MeModal } from '@/components'
import { useCrud } from '@/composables'
import api from './api'

defineOptions({ name: 'UserMgt' })

const $table = ref(null)

onMounted(() => {
  $table.value?.handleSearch()
})

const columns = [
  {
    title: '会员名称',
    key: 'vip_name',
    width: 100,
    ellipsis: { tooltip: true },
  },
  {
    title: '一个月定价',
    key: 'vip_price_month',
    width: 150,
    ellipsis: { tooltip: true },
  },
  {
    title: '三个月定价',
    key: 'vip_price_quarter',
    width: 150,
    ellipsis: { tooltip: true },
  },
  {
    title: '一年定价',
    key: 'vip_price_year',
    width: 150,
    ellipsis: { tooltip: true },
  },
  {
    title: '操作',
    key: 'actions',
    width: 80,
    align: 'right',
    fixed: 'right',
    hideInExcel: true,
    render(row) {
      return [
        h(
          NButton,
          {
            size: 'small',
            type: 'primary',
            secondary: true,
            onClick: () => handleOpenRolesSet(row),
          },
          {
            default: () => '更改价格',
            icon: () => h('i', { class: 'i-carbon:user-role text-14' }),
          }
        ),
      ]
    },
  },
]

function handleOpenRolesSet(row) {
  if (row.vip_name == '普通会员') {
    $message.warning('普通会员不能修改价格')
    return
  }
  const { id, vip_name, vip_price_month, vip_price_quarter, vip_price_year } = row
  handleOpen({
    action: 'setRole',
    title: '更改价格',
    row: { id, vip_name, vip_price_month, vip_price_quarter, vip_price_year },
    onOk: onSave,
  })
}

const { modalRef, modalFormRef, modalForm, modalAction, handleOpen, handleSave } = useCrud({
  name: '用户',
  initForm: { enable: true },
  doUpdate: api.update,
  refresh: () => $table.value?.handleSearch(),
})

function onSave() {
  if (modalAction.value === 'setRole') {
    return handleSave({
      api: () => api.update(modalForm.value),
      cb: () => $message.success('修改成功'),
    })
  }
  handleSave()
}
</script>
