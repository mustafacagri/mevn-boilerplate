<script setup>
definePageMeta({
  layout: 'todos',
  middleware: 'auth'
})

const router = useRouter()

import { useMessageStore, useTodoStore } from '@/store'

const todoStore = useTodoStore()
const messageStore = useMessageStore()

const isSubmitting = ref(false)
const isEditing = ref(false)
const initialFormData = {
  title: '',
  description: ''
}

initialFormData.priority = todoStore.priorities?.find(p => p.order === 2)?._id || ''
initialFormData.status = todoStore.statuses?.find(s => s.order === 0)?._id || ''

const formData = ref({ ...initialFormData })

const clear = () => {
  formData.value = { ...initialFormData }
}

const submit = () => {
  isSubmitting.value = true

  for (const [key, value] of Object.entries(formData.value)) {
    let error

    if (!value) {
      error = `${key} is a mandatory field!`
    }

    if (error) {
      messageStore.setError({ error })

      setTimeout(() => {
        isSubmitting.value = false
      }, 2000) // prevent serial clicks

      return
    }
  }

  if (isEditing.value) {
    todoStore.updateTodo(formData.value._id, { ...formData.value }).then(res => {
      if (res) {
        router.push('/user/todos')
      }

      isSubmitting.value = false
    })
  } else {
    todoStore.createTodo({ ...formData.value }).then(res => {
      if (res) {
        clear()
      }

      isSubmitting.value = false
    })
  }
}

onMounted(() => {
  if (router?.currentRoute?.value?.query) {
    const { _id } = router.currentRoute.value.query

    if (_id) {
      const todo = todoStore.getTodoById(_id)

      if (todo) {
        isEditing.value = true

        const {
          _id,
          title,
          description,
          priority: { _id: priority },
          status: { _id: status }
        } = todo

        formData.value = { ...formData.value, _id, title, description, priority, status }
      } else {
        router.push('/user/todos')
      }
    }
  }
})
</script>

<template>
  <div class="form-group row mb-2">
    <label for="priority" class="col-sm-3 col-form-label text-end">Priority:</label>
    <div class="col-sm-9">
      <select class="form-control" id="priority" v-model="formData.priority">
        <option v-for="priority in todoStore.getPriorities" :value="priority._id">
          {{ priority.name }}
        </option>
      </select>
    </div>
  </div>

  <div class="form-group row mb-2">
    <label for="status" class="col-sm-3 col-form-label text-end">Status:</label>
    <div class="col-sm-9">
      <select class="form-control" id="status" v-model="formData.status">
        <option v-for="status in todoStore.getStatuses" :value="status._id">
          {{ status.name }}
        </option>
      </select>
    </div>
  </div>

  <div class="form-group row mb-2">
    <label for="title" class="col-sm-3 col-form-label text-end">Title:</label>
    <div class="col-sm-9">
      <input type="text" class="form-control" id="title" placeholder="Todo Title" v-model="formData.title" />
    </div>
  </div>

  <div class="form-group row">
    <label for="description" class="col-sm-3 col-form-label text-end">Description:</label>
    <div class="col-sm-9">
      <textarea class="form-control" id="description" rows="5" v-model="formData.description"></textarea>
    </div>
  </div>

  <div class="form-group row actions mt-4">
    <label for="description" class="col-sm-3"></label>
    <div class="col-sm-9 text-center">
      <button :disabled="isSubmitting" class="btn mr-5 btn-danger" @click="clear()">Clear</button>
      <button :disabled="isSubmitting" class="btn btn-success" @click="submit()">
        {{ isEditing ? 'Save' : 'Create' }}
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.actions {
  button {
    display: inline-block;
    width: auto;
  }

  button:not(:last-child) {
    margin-right: 10px;
  }
}
</style>
