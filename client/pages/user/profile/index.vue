<script setup>
definePageMeta({
  layout: 'user',
  middleware: 'auth'
})

import { useUserStore } from '@/store'
const userStore = useUserStore()

const user = computed(() => userStore.getUser)

const visibleEye = ref(true)
const visibleEye2 = ref(true)
const isSubmitting = ref(false)

const formData = ref({ password: '', repassword: '' })

const updatePassword = () => {
  isSubmitting.value = true

  userStore.updatePassword({ ...formData.value }).then(res => {
    if (res) {
      formData.value = { password: '', repassword: '' }
    }
  })

  setTimeout(() => {
    isSubmitting.value = false
  }, 2000) // prevent serial clicks
}
</script>

<template>
  <div v-if="user?.username" class="cointainer mt-5">
    <utilsGetErrorSuccess />
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <div id="signinup" class="card">
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
            <div class="form-group row mb-4 mt-3">
              <label for="email" class="col-sm-4 text-end">Active:</label>
              <div class="col-sm-8">
                <div class="d-inline p-2 text-white badge" :class="user?.isActive ? 'bg-success' : 'bg-danger'">
                  {{ user?.isActive ? 'Yes' : 'No' }}
                </div>
              </div>
            </div>
            <div class="form-group row mb-2">
              <label for="password" class="col-sm-4 col-form-label text-end">Password:</label>
              <div class="col-sm-8">
                <div id="passwordColumn">
                  <input
                    :type="visibleEye ? 'password' : 'text'"
                    class="form-control"
                    id="password"
                    placeholder="Password"
                    v-model="formData.password"
                  />
                  <font-awesome-icon
                    :icon="visibleEye ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'"
                    @click="visibleEye = !visibleEye"
                  />
                </div>
              </div>
            </div>

            <div class="form-group row mb-3">
              <label for="repassword" class="col-sm-4 col-form-label text-end">Re-Password:</label>
              <div class="col-sm-8">
                <div id="passwordColumn">
                  <input
                    :type="visibleEye2 ? 'password' : 'text'"
                    class="form-control"
                    id="repassword"
                    placeholder="Re-Password"
                    v-model="formData.repassword"
                  />
                  <font-awesome-icon
                    :icon="visibleEye2 ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'"
                    @click="visibleEye2 = !visibleEye2"
                  />
                </div>
              </div>
            </div>

            <div class="form-group row">
              <div class="col-sm-8 offset-sm-4">
                <button :disabled="isSubmitting" @click="updatePassword" class="btn btn-success btn-block">
                  <Icon :icon="isSubmitting ? 'fa-solid fa-spinner' : 'fa-solid fa-save'" class="me-2" />
                  <span v-if="isSubmitting">Updating...</span>
                  <span v-else>Update</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <utilsSkeleton v-else />
</template>
