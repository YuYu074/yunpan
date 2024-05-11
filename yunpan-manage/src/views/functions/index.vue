<template>
  <CommonPage>
    <MeCrud ref="$table" :scroll-x="1200" :columns="columns" :get-data="api.read"></MeCrud>
    <el-dialog v-model="dialogFormVisible" title="修改权限" width="500">
      <el-tree
        ref="eltreeRef"
        style="max-width: 600px"
        :data="dialogFormData"
        :props="dialogFormProps"
        node-key="id"
        :default-checked-keys="[...dialogFormCheckIndex]"
        show-checkbox
        @check-change="handleCheckChange"
      />
    </el-dialog>
  </CommonPage>
</template>

<script setup>
import { NButton } from 'naive-ui'
import { MeCrud, MeModal } from '@/components'
import { useCrud } from '@/composables'
import api from './api'
import { nextTick } from 'vue'

defineOptions({ name: 'UserMgt' })

const $table = ref(null)
const eltreeRef = ref(null)

onMounted(() => {
  $table.value?.handleSearch()
})

const columns = [
  {
    title: '管理员id',
    key: 'id',
    width: 150,
    ellipsis: { tooltip: true },
  },
  {
    title: '管理员等级',
    key: 'manage_name',
    width: 100,
    ellipsis: { tooltip: true },
  },

  // {
  //   title: '三个月定价',
  //   key: 'vip_price_quarter',
  //   width: 150,
  //   ellipsis: { tooltip: true },
  // },
  // {
  //   title: '一年定价',
  //   key: 'vip_price_year',
  //   width: 150,
  //   ellipsis: { tooltip: true },
  // },
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
            default: () => '修改权限',
            icon: () => h('i', { class: 'i-carbon:user-role text-14' }),
          }
        ),
      ]
    },
  },
]

const dialogFormVisible = ref(false)
const dialogFormProps = ref({
  children: 'children',
  label: 'label',
  disabled: 'disabled',
})
const dialogFormCheckIndex = ref([])
const dialogFormData = ref([])
async function handleOpenRolesSet(row) {
  if(row.manage_name == '超级管理员') {
    $message.warning('不能修改超级管理员的权限')
    return
  }
  console.log(row);
  let res = (await api.getRolePermissions(13720973952)).data
  console.log(res)
  dialogFormData.value = []
  res.forEach((i) => {
    if (i.function_index == '1') {
      dialogFormData.value.push({
        id: +i.id,
        label: i.function_name,
        children: [],
      })
    } else {
      dialogFormData.value.forEach((o) => {
        if (+i.parent_id === o.id) {
          o.children.push({
            id: +i.id,
            label: i.function_name,
            children: [],
          })
        }
      })
    }
  })
  if(+row.id == 1) {
    dialogFormCheckIndex.value = [1,2,3,4,5,7,8,9,10,11,13,14,16,17]
  }else if(+row.id == 2) {
    dialogFormCheckIndex.value = [2,3,5,7,9,11,16]
  }else if (+row.id == 3) {
    dialogFormCheckIndex.value = [2,5,9,11]
  }
  nextTick(() => {
    eltreeRef.value.setCurrentKey(dialogFormCheckIndex.value);
  });
  console.log(dialogFormCheckIndex.value);
  dialogFormVisible.value = true
}
</script>
