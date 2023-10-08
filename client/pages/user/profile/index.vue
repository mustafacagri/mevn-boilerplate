<script setup>
definePageMeta({
  layout: 'user',
  middleware: 'auth'
})

import { useUserStore } from '@/store'
const userStore = useUserStore()

const user = computed(() => userStore.getUser)
</script>

<template>
  <div v-if="user?.username" class="cointainer mt-5">
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <div class="card">
          <div class="card-body">
            <div class="form-group row mb-2">
              <label for="email" class="col-sm-4 text-end">Email:</label>
              <div class="col-sm-8">
                {{ user?.email }}
              </div>
            </div>
            <div class="form-group row mb-2">
              <label for="email" class="col-sm-4 text-end">Username:</label>
              <div class="col-sm-8">
                {{ user?.username }}
              </div>
            </div>
            <div class="form-group row mb-2 mt-3">
              <label for="email" class="col-sm-4 text-end">Active:</label>
              <div class="col-sm-8">
                <div class="d-inline p-2 text-white" :class="user?.isActive ? 'bg-success' : 'bg-danger'">
                  {{ user?.isActive ? 'Yes' : 'No' }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <utilsSkeleton v-else />
</template>
