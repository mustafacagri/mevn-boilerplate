<script setup>
import { VSkeletonLoader } from 'vuetify/labs/VSkeletonLoader'
import { request, timeDisplay } from '@/utils'
import { useMessageStore, useTicketStore, useUserStore } from '@/store'
import GetErrorSuccess from '@/components/utils/GetErrorSuccess.vue'

const ticketStore = useTicketStore()
const userStore = useUserStore()
const messageStore = useMessageStore()

const route = useRoute()

const breadcrumbs = ref()
const formData = ref('')
const isSubmitting = ref(false)

const ticket = ref(null)
const mapping = {
  subject: 'Subject',
  priority: 'Priority',
  status: 'Status',
  createdTime: 'Created Time',
  lastUpdatedBy: 'Last Updated By',
  lastUpdatedDate: 'Last Updated Date',
  description: 'Description',
}

onMounted(() => {
  const { _id } = route.params

  if (_id) {
    request('get', 'admin/tickets/' + _id).then(res => {
      ticket.value = res.data

      breadcrumbs.value = [
        {
          title: 'Dashboard',
          to: '/',
        },
        {
          title: 'Tickets',
          to: '/tickets',
        },
        {
          title: ticket.value?.lastUpdatedBy?.username,
          disabled: true,
        },
        {
          title: ticket.value?.subject,
          disabled: true,
        },
      ]
    })
  }
})

const addComment = comment => {
  ticket.value.comments.push(comment)
}

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

  request('post', `admin/tickets/${route.params._id}`, { comment: formData.value }).then(res => {
    const { data } = res

    if (data) {
      if (data?.user) {
        const { username, _id } = userStore.user
        data.user = { _id, username }
      }

      isSubmitting.value = false
      formData.value = ''
      ticket.value.comments.push(data)
    }
  })
}
</script>

<template>
  <template v-if="ticket">
    <VBreadcrumbs
      :items="breadcrumbs"
      class="pt-0 mb-3"
    >
      <template v-slot:prepend>
        <VIcon
          size="small"
          icon="mdi-home"
        ></VIcon>
      </template>
      <template v-slot:divider>
        <v-icon icon="mdi-forward"></v-icon>
      </template>
    </VBreadcrumbs>
    <VRow>
      <VCol
        cols="12"
        sm="6"
      >
        <VCard color="primary">
          <VCardItem>
            <VCardTitle>{{ ticket?.subject }}</VCardTitle>
          </VCardItem>

          <VCardText>
            Priority: {{ ticket?.priority?.name || '-' }}<br />
            Status: {{ ticket?.status?.name || '-' }}<br />
            Last Updated: {{ timeDisplay(ticket?.lastUpdatedDate) }}<br />
            Last Updated By: {{ ticket?.lastUpdatedBy?.username }}<br />
            Created Time: {{ timeDisplay(ticket?.createdTime) }}
          </VCardText>
        </VCard>

        <VCard
          class="mt-5"
          color="secondary"
        >
          <VCardText><div v-html="ticket?.description"></div></VCardText>
        </VCard>
      </VCol>
      <VCol
        cols="12"
        sm="6"
      >
        <VCard
          v-for="(comment, index) in ticket?.comments"
          :key="index"
          class="mb-3"
          :color="comment?.user?._id === ticket?.customer?._id ? 'error' : ''"
        >
          <VCardText :class="{ 'text-end': comment?.user?._id === ticket?.customer?._id }">
            <p v-html="comment?.comment"></p>
            <span>{{ comment?.user?.username }} - {{ timeDisplay(comment.createdTime) }}</span>
          </VCardText>
        </VCard>
        <GetErrorSuccess />
        <VCard class="mt-5">
          <VCardText>
            <VTextarea
              name="comment"
              variant="filled"
              label="Comment"
              auto-grow
              v-model="formData"
            />
            <VBtn
              class="mt-3 mr-2"
              variant="tonal"
              color="error"
              :disabled="isSubmitting"
              @click="formData = ''"
              >Clear</VBtn
            >
            <VBtn
              class="mt-3"
              color="success"
              :disabled="isSubmitting"
              @click="submit()"
              >Submit</VBtn
            >
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </template>
  <VSkeletonLoader
    v-else
    class="mx-auto"
    elevation="12"
    max-width="400"
    type="table-heading, list-item-two-line, image, table-tfoot"
  />
</template>

<style scoped lang="scss"></style>
