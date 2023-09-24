<script setup>
import { useMessageStore, useUserStore } from '@/store'
import Edit from '@/components/Users/Edit.vue'
import Delete from '@/components/Users/Delete.vue'

const userStore = useUserStore()
const messageStore = useMessageStore()

const data = computed(() => userStore.getUsers)
const editing = ref(false)

const user = ref({})

const edit = value => {
  user.value = { ...value }
  editing.value = true
}

const headers = ref([
  { title: 'Id', key: '_id', align: ' d-none' },
  { title: 'Username', key: 'username' },
  { title: 'E-Mail', key: 'email' },
  { title: 'Roles', key: 'roles' },
  { title: 'isActive', key: 'isActive' },
  { title: 'Created Time', key: 'createdTime' },
  { title: 'Action', key: 'action', width: '180px' },
])
</script>

<template>
  <VContainer>
    <VRow>
      <VCol cols="12">
        <VAlert
          v-if="messageStore.error"
          border="bottom"
          color="error"
          dark
          class="mb-4"
          v-html="messageStore.error"
        />
        <VAlert
          v-if="messageStore.isSuccess"
          border="bottom"
          color="success"
          dark
          class="text-center mb-4"
        >
          {{ messageStore.isSuccess }}
        </VAlert>
      </VCol>
    </VRow>
  </VContainer>

  <Edit
    v-if="editing"
    :editing="editing"
    :user="user"
    @updateEditing="val => (editing = val)"
  />
  <VDataTable
    v-if="!editing"
    items-per-page="10"
    :headers="headers"
    :items="data"
    item-value="name"
    class="elevation-1"
  >
    <template #[`item.isActive`]="{ item }">
      <VBtn
        :color="item.columns.isActive === true ? 'success' : 'error'"
        disabled
      >
        {{ item.columns.isActive ? 'Active' : 'Not Active' }}
      </VBtn>
    </template>
    <template #[`item.roles`]="{ item }">
      {{ item.columns.roles.map(role => role.name).join(', ') }}
    </template>
    <template #[`item.action`]="{ item }">
      <VBtn
        @click="edit(item.columns)"
        class="mr-2"
      >
        <VIcon icon="mdi-pencil" />
      </VBtn>

      <Delete
        :user="user"
        @click="user = item.columns"
      />
    </template>
    <template #[`item.createdTime`]="{ item }">
      <!-- {{ new Date(item.columns.createdTime).toLocaleString() }} -->
      <span v-if="item.columns.createdTime">{{ item.columns.createdTime.substring(0, 16).replace('T', ', 	') }}</span>
    </template>
  </VDataTable>
</template>
