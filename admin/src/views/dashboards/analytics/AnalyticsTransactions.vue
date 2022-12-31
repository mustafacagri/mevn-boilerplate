<script setup>
import { useHomepageStore } from '@/store/all'
import { onMounted } from 'vue-demi'

const homepageStore = useHomepageStore()

const statistics = computed(() =>
  statisticsData.map(item => {
    item.stats = stats.value[item.id] || ''

    return item
  }),
)
const stats = computed(() => homepageStore.stats)

const statisticsData = [
  {
    title: 'Hit',
    stats: '',
    icon: 'mdi-trending-up',
    color: 'primary',
    id: 'postHits',
  },
  {
    title: 'User',
    stats: '',
    icon: 'mdi-account-outline',
    color: 'success',
    id: 'user',
  },
  {
    title: 'Post Category',
    stats: '',
    icon: 'mdi-cellphone-link',
    color: 'warning',
    id: 'postCategory',
  },
  {
    title: 'Post',
    stats: '',
    icon: 'mdi-currency-usd',
    color: 'info',
    id: 'post',
  },
]
</script>

<template>
  <VCard>
    <VCardItem>
      <VCardTitle>Our Statistics</VCardTitle>

      <template #append>
        <div class="me-n3">
          <VBtn
            icon
            color="default"
            size="x-small"
            variant="text"
          >
            <VIcon
              size="24"
              icon="mdi-dots-vertical"
            />
          </VBtn>
        </div>
      </template>
    </VCardItem>

    <VCardText>
      <h6 class="text-sm mb-12">
        <span class="font-weight-regular">We are really growing right now, </span>
        <span>you feel it?! 😎</span>
      </h6>

      <VRow>
        <VCol
          v-for="item in statistics"
          :key="item.title"
          cols="6"
          sm="3"
        >
          <div class="d-flex align-center">
            <div class="me-3">
              <VAvatar
                :color="item.color"
                rounded
                size="42"
                class="elevation-1"
              >
                <VIcon
                  size="24"
                  :icon="item.icon"
                />
              </VAvatar>
            </div>

            <div class="d-flex flex-column">
              <span class="text-caption">
                {{ item.title }}
              </span>
              <span class="text-h6 font-weight-medium">{{ item.stats }}</span>
            </div>
          </div>
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
</template>
