<template>
  <CommonPage>
    <template #action>
      <!-- <n-button v-permission="'AddUser'" type="primary" @click="handleAdd()"> -->
      <n-button type="primary" @click="handleAdd()">
        <i class="i-material-symbols:add mr-4 text-18" />
        创建新用户
      </n-button>
    </template>

    <MeCrud
      ref="$table"
      v-model:query-items="queryItems"
      :scroll-x="1200"
      :columns="columns"
      :get-data="api.read"
    >
      <MeQueryItem label="用户名" :label-width="50">
        <n-input
          v-model:value="queryItems.username"
          type="text"
          placeholder="请输入用户名"
          clearable
        />
      </MeQueryItem>

      <MeQueryItem label="手机号" :label-width="50">
        <n-input
          v-model:value="queryItems.userphone"
          type="text"
          placeholder="请输入手机号"
          clearable
        />
      </MeQueryItem>

      <MeQueryItem label="状态" :label-width="50">
        <n-select
          v-model:value="queryItems.enable"
          clearable
          :options="[
            { label: '启用', value: 1 },
            { label: '停用', value: 0 },
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
          label="用户名"
          path="username"
          :rule="{
            required: true,
            message: '请输入用户名',
            trigger: ['input', 'blur'],
          }"
        >
          <n-input v-model:value="modalForm.username" :disabled="modalAction !== 'add'" />
        </n-form-item>
        <n-form-item
          label="手机号"
          path="userphone"
          :rule="{
            required: true,
            message: '请输入手机号',
            trigger: ['input', 'blur'],
          }"
        >
          <n-input v-model:value="modalForm.userphone" :disabled="modalAction !== 'add'" />
        </n-form-item>
        <n-form-item
          v-if="['add', 'reset'].includes(modalAction)"
          :label="modalAction === 'reset' ? '重置密码' : '初始密码'"
          path="password"
          :rule="{
            required: true,
            message: '请输入密码',
            trigger: ['input', 'blur'],
          }"
        >
          <n-input v-model:value="modalForm.password" />
        </n-form-item>

        <n-form-item
          v-if="['add', 'setRole'].includes(modalAction)"
          label="会员等级"
          path="roleIds"
          :rule="{
            required: true,
            message: '请选择会员等级',
          }"
        >
          <n-select
            v-model:value="modalForm.roleIds"
            :options="roles"
            label-field="name"
            value-field="id"
            clearable
            filterable
          />
        </n-form-item>

        <n-form-item
          v-if="['add', 'setRole'].includes(modalAction) && [2, 3, 4].includes(+modalForm.roleIds)"
          label="会员到期时间"
          path="vip_ddl"
          :rule="{
            required: true,
            message: '请输入会员到期时间',
          }"
        >
          <n-input v-model:value="modalForm.vip_ddl" placeholder="请输入(格式: YYYY-MM-DD)" />
        </n-form-item>

        <n-form-item v-if="modalAction === 'add'" label="状态" path="enable">
          <n-switch v-model:value="modalForm.enable">
            <template #checked>启用</template>
            <template #unchecked>停用</template>
          </n-switch>
        </n-form-item>
      </n-form>
      <n-alert v-if="modalAction === 'add'" type="warning" closable>
        详细信息需由用户本人补充修改
      </n-alert>
    </MeModal>
  </CommonPage>
</template>

<script setup>
import { NAvatar, NButton, NSwitch, NTag } from 'naive-ui'
import { formatDateTime } from '@/utils'
import { MeCrud, MeQueryItem, MeModal } from '@/components'
import { useCrud } from '@/composables'
import api from '../user/api'
import dayjs from 'dayjs'

defineOptions({ name: 'UserMgt' })

const $table = ref(null)
/** QueryBar筛选参数（可选） */
const queryItems = ref({})

onMounted(() => {
  $table.value?.handleSearch()
})

const genders = [
  { label: '男', value: 1 },
  { label: '女', value: 2 },
]
const roles = ref([])
api.getAllVip().then(({ data = [] }) => {
  roles.value = data.map((i) => ({
    ...i,
    name: i.vip_name,
    enable: true,
  }))
})

const columns = [
  { title: '用户名', key: 'user_name', width: 150, ellipsis: { tooltip: true } },
  {
    title: '会员等级',
    key: 'vip_name',
    width: 100,
    ellipsis: { tooltip: true },
  },
  {
    title: '账号',
    key: 'user_phone',
    width: 150,
    ellipsis: { tooltip: true },
  },
  { title: '会员到期时间', key: 'vip_ddl', width: 180, ellipsis: { tooltip: true }, render({ vip_ddl }) {
      return vip_ddl ? dayjs(vip_ddl).format('YYYY-MM-DD HH:mm:ss') : "--"
    }
  },
  {
    title: '创建时间',
    key: 'user_signtime',
    width: 180,
    render({ user_signtime }) {
      return dayjs(user_signtime).format('YYYY-MM-DD HH:mm:ss')
    },
  },
  {
    title: '状态',
    key: 'status',
    width: 120,
    render: (row) =>
      h(
        NSwitch,
        {
          size: 'small',
          rubberBand: false,
          value: !!row.status,
          loading: !!row.enableLoading,
          onUpdateValue: () => handleEnable(row),
        },
        {
          checked: () => '启用',
          unchecked: () => '停用',
        }
      ),
  },
  {
    title: '操作',
    key: 'actions',
    width: 320,
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
            default: () => '更改会员',
            icon: () => h('i', { class: 'i-carbon:user-role text-14' }),
          }
        ),
        h(
          NButton,
          {
            size: 'small',
            type: 'primary',
            style: 'margin-left: 12px;',
            onClick: () => resetPwd(row),
          },
          {
            default: () => '重置密码',
            icon: () => h('i', { class: 'i-radix-icons:reset text-14' }),
          }
        ),

        h(
          NButton,
          {
            size: 'small',
            type: 'error',
            style: 'margin-left: 12px;',
            onClick: () => deleteUser(row.id),
          },
          {
            default: () => '删除',
            icon: () => h('i', { class: 'i-material-symbols:delete-outline text-14' }),
          }
        ),
      ]
    },
  },
]

async function handleEnable(row) {
  row.enableLoading = true
  try {
    await api.updateStatus({ id: row.id, status: row.status == 1 ? 0 : 1 })
    row.enableLoading = false
    $message.success('操作成功')
    $table.value?.handleSearch()
  } catch (error) {
    row.enableLoading = false
  }
}

function handleOpenRolesSet(row) {
  console.log(roles.value)
  const roleIds = roles.value.map((item) => item.id)
  handleOpen({
    action: 'setRole',
    title: '更改会员',
    row: { username: row.user_name, userphone: row.user_phone, roleIds },
    onOk: onSave,
  })
}

function resetPwd(row) {
  const d = $dialog.warning({
    content: '确定重置密码吗？',
    title: '提示',
    positiveText: '确定',
    negativeText: '取消',
    async onPositiveClick() {
      try {
        d.loading = true
        const data = await api.resetPwd({id: row.id})
        $message.success('重置成功')
        d.loading = false
        $table.value?.handleSearch()
      } catch (error) {
        d.loading = false
      }
    }
  })
}

function deleteUser(id) {
  const d = $dialog.warning({
    content: '确定删除该用户吗？',
    title: '提示',
    positiveText: '确定',
    negativeText: '取消',
    async onPositiveClick() {
      try {
        d.loading = true
        const data = await api.delete({id})
        $message.success('删除成功')
        d.loading = false
        $table.value?.handleSearch()
      } catch (error) {
        d.loading = false
      }
    }
  })
}

const {
  modalRef,
  modalFormRef,
  modalForm,
  modalAction,
  handleAdd,
  handleDelete,
  handleOpen,
  handleSave,
} = useCrud({
  name: '用户',
  initForm: { enable: true },
  doCreate: api.create,
  doDelete: api.delete,
  doUpdate: api.update,
  refresh: () => $table.value?.handleSearch(),
})

function onSave() {
  if (modalAction.value === 'setRole') {
    return handleSave({
      api: () => api.update(modalForm.value),
      cb: () => $message.success('分配成功'),
    })
  } else if (modalAction.value === 'reset') {
    return handleSave({
      api: () => api.resetPwd(modalForm.value.id, modalForm.value),
      cb: () => $message.success('密码重置成功'),
    })
  }
  handleSave()
}
</script>
