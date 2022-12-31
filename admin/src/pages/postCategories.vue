<script setup>
import { usePostStore } from '@/store/all'

const postStore = usePostStore()
const data = computed(() => {
  return postStore.getPostCategories
})

const headers = [
  { text: 'ID', value: '_id' },
  { text: 'CATEGORY', value: 'name' },
  { text: 'URL', value: 'url' },
  { text: 'ACTION', value: 'action' },
]
</script>

<template>
  <VCard>
    <VCardTitle class="text-right">
      <VBtn
        class="ma-2"
        color="success"
        to="postCategory"
      >
        Create New Post Categories
      </VBtn>
    </VCardTitle>
    <VTable
      :headers="headers"
      :items="data"
      class="table-rounded"
      hide-default-footer
    >
      <thead>
        <tr>
          <th
            v-for="header in headers"
            :key="header.value"
            scope="col"
            :class="{ 'text-center': header.value === 'action' }"
          >
            {{ header.text }}
          </th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="row in data"
          :key="row._id"
        >
          <td v-text="row._id" />
          <td v-text="row.name" />
          <td v-text="row.url" />
          <td class="text-center">
            <VBtn
              color="error"
              class="mr-3"
              :to="'posts?categoryId=' + row._id"
            >
              Show Posts
            </VBtn>
            <VBtn :to="'postCategory/' + row._id">
              <VIcon class="mr-2" icon="mdi-pencil" /> Edit
            </VBtn>
          </td>
        </tr>
      </tbody>
    </VTable>
  </VCard>
</template>
