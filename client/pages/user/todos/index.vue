<script setup>
definePageMeta({
  layout: 'todos',
  middleware: 'auth'
})

import { timeDisplay } from '@/utils/time'
import { useTodoStore } from '@/store'
const todoStore = useTodoStore()

let initialTodos
const todos = ref()

const selectedStatus = computed(() => todoStore.selectedStatus)
const selectedPriority = computed(() => todoStore.selectedPriority)

onMounted(() => {
  todoStore.fetchTodos().then(res => {
    if (res) {
      initialTodos = [...todoStore.getTodos]
      todos.value = [...todoStore.getTodos]
    }
  })
})

watch([() => selectedStatus.value, () => selectedPriority.value], (newV, _oldV) => {
  todosUpdated()
})

const todosUpdated = () => {
  todos.value = initialTodos.filter(todo => {
    if (selectedStatus.value && selectedPriority.value) {
      return todo.status._id === selectedStatus.value && todo.priority._id === selectedPriority.value
    } else if (selectedStatus.value) {
      return todo.status._id === selectedStatus.value
    } else if (selectedPriority.value) {
      return todo.priority._id === selectedPriority.value
    } else {
      return true
    }
  })
}

const remove = id => {
  todoStore.deleteTodo(id).then(res => {
    if (res) {
      todos.value = todos.value.filter(todo => todo._id !== id)
      initialTodos = initialTodos.filter(todo => todo._id !== id)
    }
  })
}
</script>

<template>
  <div v-if="todos && Array.isArray(todos) && todos.length === 0" class="alert alert-danger" role="alert">
    There is no todo
    <span v-if="selectedPriority || selectedStatus">with these filters!</span>
  </div>

  <table v-else-if="todos" class="table table-striped table-hover">
    <caption>
      Todos Listing Table
    </caption>
    <thead>
      <tr>
        <th>Title</th>
        <th>Status</th>
        <th>Priority</th>
        <th>Created</th>
        <th>Last</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(todo, index) in todos" :key="index">
        <td>
          <router-link :to="'/user/todos/' + todo._id">{{ todo?.title }}</router-link>
        </td>
        <td>{{ todo?.status?.name || '-' }}</td>
        <td>{{ todo?.priority?.name || '-' }}</td>
        <td>{{ timeDisplay(todo?.createdTime) }}</td>
        <td>{{ timeDisplay(todo?.lastUpdatedDate) }}</td>
        <td>
          <router-link :to="`/user/todos/new?_id=${todo?._id}`">
            <Icon icon="pencil" class="me-2" />
          </router-link>
          <a @click="remove(todo._id)" class="text-danger">
            <Icon icon="close" />
          </a>
        </td>
      </tr>
    </tbody>
  </table>

  <p v-else class="placeholder-glow">
    <span class="placeholder col-12 placeholder-lg"></span>
    <span class="placeholder col-7"></span>
    <span class="placeholder col-6"></span>
    <span class="placeholder col-8"></span>
  </p>
</template>

<style scoped lang="scss">
a {
  color: hsla(160, 100%, 37%, 1);
  cursor: pointer;
}
</style>
