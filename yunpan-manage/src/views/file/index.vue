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
          label="文件名称"
          path="file_name"
          :rule="{
            required: true,
            message: '请输入会员名称',
            trigger: ['input', 'blur'],
          }"
        >
          <n-input v-model:value="modalForm.file_name" :disabled="modalAction !== 'add'" />
        </n-form-item>
        <n-form-item
          label="审核结果"
          path="result"
          :rule="{
            required: true,
            message: '请选择审核结果',
          }"
        >
          <n-select
            v-model:value="modalForm.result"
            :options="resultRole"
            label-field="name"
            value-field="id"
            clearable
            filterable
          />
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
    title: '文件名称',
    key: 'show_name',
    width: 100,
    ellipsis: { tooltip: true },
  },
  {
    title: '上传时间',
    key: 'last_time',
    width: 150,
    ellipsis: { tooltip: true },
  },
  {
    title: '文件大小',
    key: 'size',
    width: 150,
    ellipsis: { tooltip: true },
  },
  {
    title: '上传者',
    key: 'user_name',
    width: 150,
    ellipsis: { tooltip: true },
  },
  {
    title: '危险等级',
    key: 'danger',
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
            default: () => '审核文件',
            icon: () => h('i', { class: 'i-carbon:user-role text-14' }),
          }
        ),
      ]
    },
  },
]

const resultRole = ref([{
  id: 0,
  name: '审核通过，解除危险提示',
  enable: true
},
{
  id: 1,
  name: '审核不通过，立即锁定并删除文件',
  enable: true
}])

function handleOpenRolesSet(row) {
  const result = resultRole.value.map((item) => item.id)
  handleOpen({
    action: 'setRole',
    title: '审核文件',
    row: { ...row, result },
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
      cb: () => $message.success('提交成功'),
    })
  }
  handleSave()
}
</script>
