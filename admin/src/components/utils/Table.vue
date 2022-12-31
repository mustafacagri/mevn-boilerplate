<script setup>
const props = defineProps({
  headers: { type: Array, required: true },
  items: { type: Array, required: true },
})
</script>

<template>
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
        >
          {{ header.text }}
        </th>
      </tr>
    </thead>

    <tbody>
      <tr
        v-for="row in items"
        :key="row._id"
      >
        <td
          v-for="colName in headers"
          :key="colName.value"
        >
          {{ row[colName.value] }}
        </td>
      </tr>
    </tbody>
  </VTable>
</template>
