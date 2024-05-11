<template>
  <CommonPage>
    <MeCrud
      v-model:query-items="queryItems"
      ref="$table"
      :scroll-x="1200"
      :columns="columns"
      :get-data="api.getAllFeedback"
    >
    <MeQueryItem label="状态" :label-width="50">
        <n-select
          v-model:value="queryItems.feedstatus"
          clearable
          :options="[
            { label: '已回复', value: 1 },
            { label: '待回复', value: 0 },
          ]"
        />
      </MeQueryItem>
  </MeCrud>

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
          label="反馈内容"
          path="content"
          :rule="{
            required: true,
            message: '请输入会员名称',
            trigger: ['input', 'blur'],
          }"
        >
          <n-input v-model:value="modalForm.content" :disabled="modalAction !== 'add'" />
        </n-form-item>
        <n-form-item
          label="反馈回复"
          path="result"
          :rule="{
            required: true,
            message: '请输入反馈回复',
            trigger: ['input', 'blur'],
          }"
        >
          <n-input v-model:value="modalForm.result" />
        </n-form-item>
      </n-form>
    </MeModal>
  </CommonPage>
</template>

<script setup>
import { NButton } from 'naive-ui'
import { MeCrud, MeQueryItem, MeModal } from '@/components'
import { useCrud } from '@/composables'
import api from './api'
import dayjs from 'dayjs'

defineOptions({ name: 'UserMgt' })

const $table = ref(null)
/** QueryBar筛选参数（可选） */
const queryItems = ref({})

onMounted(() => {
  $table.value?.handleSearch()
})

const columns = [
  {
    title: '用户名称',
    key: 'user_name',
    width: 100,
    ellipsis: { tooltip: true },
  },
  {
    title: '用户手机号',
    key: 'user_phone',
    width: 150,
    ellipsis: { tooltip: true },
  },
  {
    title: '反馈时间',
    key: 'feed_time',
    width: 150,
    ellipsis: { tooltip: true },
    render({ feed_time }) {
      return dayjs(feed_time).format('YYYY-MM-DD HH:mm:ss')
    },
  },
  {
    title: '反馈内容',
    key: 'content',
    width: 150,
    ellipsis: { tooltip: true },
  },
  {
    title: '反馈结果',
    key: 'result',
    width: 150,
    ellipsis: { tooltip: true },
    render({ result }) {
      return result ? result : '等待回复'
    },
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
            default: () => '处理反馈',
            icon: () => h('i', { class: 'i-carbon:user-role text-14' }),
          }
        ),
      ]
    },
  },
]

function handleOpenRolesSet(row) {
  if (row.feedstatus != 0) {
    $message.warning('该反馈已处理')
    return
  }
  const { id, content, result } = row
  handleOpen({
    action: 'setRole',
    title: '处理反馈',
    row: { id, content, result },
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
