<script setup>
import { request } from '~~/utils/request'
import { useMessageStore } from '~/store/message'

const props = defineProps({
  postId: String
})

const messageStore = useMessageStore()

const initialFormData = { comment: null, name: null, email: '' }
const formData = ref({ ...initialFormData })
const commentError = ref('')
const isSubmitting = ref(false)

const errorGenerator = field => {
  const capitalizedField = field.charAt(0).toUpperCase() + field.slice(1)
  const error = `<li><strong>${capitalizedField}</strong> section can not be empty!</li>`
  commentError.value += error
}

const submitComment = async () => {
  commentError.value = ''

  for (const property in formData.value) {
    if (!formData.value[property]) {
      errorGenerator(property) // we are creating the error messages here
    } else if (property === 'email') {
      const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      if (!formData.value[property].match(validRegex)) {
        commentError.value += `<li><strong>${property}</strong> should be a valid value!</li>`
      }
    }
  }

  if (commentError.value === '' && props?.postId) {
    // all is good, let's submit the commit
    console.info('submitting the comment')

    isSubmitting.value = true

    await request('post', `posts/${props.postId}/comments`, formData.value).then(res => {
      isSubmitting.value = false
      formData.value = { ...initialFormData }
    })
  }
}
</script>

<template>
  <div class="container mt-4">
    <div v-if="isSubmitting" class="text-warning">Submitting...</div>
    <div v-if="messageStore?.getIsSuccess" class="row text-success">{{ messageStore.getIsSuccess }}</div>
    <ul v-if="commentError.length > 0" id="commentError" v-html="commentError" class="mb-4" />
    <div class="row" v-if="!(messageStore?.getIsSuccess || isSubmitting)">
      <div class="col-6">
        <textarea v-model="formData.comment" placeholder="Comment..."></textarea>
      </div>
      <div class="col-6">
        <input type="text" v-model="formData.name" placeholder="Name" class="mb-2" />
        <input type="text" v-model="formData.email" placeholder="E-Mail" class="mb-2" />
        <button @click="submitComment">Submit</button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
textarea {
  height: 130px;
}

#commentError {
  color: red;
}
</style>
