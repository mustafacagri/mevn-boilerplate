<script setup>
const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['addComment'])

import { request } from '@/utils/request'
import { useMessageStore } from '@/store'
const messageStore = useMessageStore()

const formData = ref('')
const isSubmitting = ref(false)

const submit = () => {
  isSubmitting.value = true

  if (!formData.value) {
    const error = 'Comment is a mandatory field!'
    messageStore.setError({ error })

    setTimeout(() => {
      isSubmitting.value = false
    }, 2000) // prevent serial clicks

    return
  }

  request('post', `tickets/${props.id}`, { comment: formData.value }).then(res => {
    if (res) {
      isSubmitting.value = false
      formData.value = ''
      emit('addComment', res)
    }
  })
}
</script>
<template>
  <div id="Comment">
    <utilsGetErrorSuccess />
    <div class="row mt-4">
      <div class="col-3 text-end">New Comment:</div>
      <div class="col-9">
        <textarea class="form-control" id="comment" rows="5" v-model="formData"></textarea>
      </div>
    </div>
    <div class="col-9 offset-3 mt-3">
      <button :disabled="isSubmitting" class="btn btn-success" @click="submit()">Submit</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
#Comment {
  padding-bottom: 20px;
}
</style>
