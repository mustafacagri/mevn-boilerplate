<script setup>
definePageMeta({
  layout: 'tickets',
  middleware: 'auth'
})

import { useMessageStore, useTicketStore } from '@/store'

const ticketStore = useTicketStore()
const messageStore = useMessageStore()

const isSubmitting = ref(false)
const initialFormData = {
  subject: '',
  description: ''
}

initialFormData.priority = ticketStore.priorities?.find(p => p.order === 2)?._id || ''

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

  ticketStore.createTicket({ ...formData.value }).then(res => {
    if (res) {
      clear()
    }

    isSubmitting.value = false
  })
}
</script>

<template>
  <utilsGetErrorSuccess />
  <div class="form-group row mb-2">
    <label for="priority" class="col-sm-3 col-form-label text-end">Priority:</label>
    <div class="col-sm-9">
      <select class="form-control" id="priority" v-model="formData.priority">
        <option v-for="priority in ticketStore.getPriorities" :value="priority._id">
          {{ priority.name }}
        </option>
      </select>
    </div>
  </div>

  <div class="form-group row mb-2">
    <label for="subject" class="col-sm-3 col-form-label text-end">Subject:</label>
    <div class="col-sm-9">
      <input type="text" class="form-control" id="subject" placeholder="Ticket Subject" v-model="formData.subject" />
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
      <button :disabled="isSubmitting" class="btn btn-success" @click="submit()">Submit</button>
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
