<script setup>
const props = defineProps({
  postId: String
})

const formData = ref({ Comment: null, Name: null, Email: null })
const commentError = ref('')

const errorGenerator = field => {
  const error = `<li><strong>${field}</strong> section can not be empty!</li>`
  commentError.value += error
}

const submitComment = () => {
  commentError.value = ''

  for (const property in formData.value) {
    if (!formData.value[property]) {
      errorGenerator(property) // we are creating the error messages here
    } else if (property === 'Email') {
      const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      if (!formData.value[property].match(validRegex)) {
        commentError.value += `<li><strong>${property}</strong> should be a valid value!</li>`
      }
    }
  }

  if (commentError.value === '') {
    // all is good, let's submit the commit
    console.info('submitting the comment')
  }
}
</script>

<template>
  <div class="container mt-4">
    <ul v-if="commentError.length > 0" id="commentError" v-html="commentError" class="mb-4" />
    <div class="row">
      <div class="col-6">
        <textarea v-model="formData.Comment" placeholder="Comment..."></textarea>
      </div>
      <div class="col-6">
        <input type="text" v-model="formData.Name" placeholder="Name" class="mb-2" />
        <input type="text" v-model="formData.Email" placeholder="E-Mail" class="mb-2" />
        <Button @click="submitComment">Submit</Button>
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
