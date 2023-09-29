<script setup>
import { useUserStore } from '@/store/user'
import { useMessageStore } from '@/store/message'
import { regexEmail } from '@/utils/regex'

const route = useRouter()

const userStore = useUserStore()
const messageStore = useMessageStore()

const emit = defineEmits(['updateComponent'])

const visibleEye = ref(true)
const isSubmitting = ref(false)
const formData = ref({ email: 'cagri@cagri.com', password: 'cagri' })

const login = () => {
  isSubmitting.value = true
  for (const [key, value] of Object.entries(formData.value)) {
    if (!value) {
      const error = `${key} is a mandatory field!`
      messageStore.setError({ error })
      return
    }

    if (!regexEmail(formData.value?.email)) {
      const error = 'You must enter a valid email address'
      messageStore.setError({ error })
      return
    }

    userStore.login({ ...formData.value }).then(res => {
      if (res) {
        route.push('/user')
      }
    })

    setTimeout(() => {
      isSubmitting.value = false
    }, 2000) // prevent serial clicks
  }
}
</script>

<template>
  <div v-if="messageStore.getError" class="alert alert-danger" role="alert">
    {{ messageStore.getError }}
  </div>

  <div class="card">
    <div class="card-body">
      <div class="form-group row mb-2">
        <label for="email" class="col-sm-4 col-form-label">Email</label>
        <div class="col-sm-8">
          <input
            type="email"
            autocomplete="false"
            class="form-control"
            id="email"
            placeholder="Email"
            v-model="formData.email"
          />
        </div>
      </div>

      <div class="form-group row mb-2">
        <label for="password" class="col-sm-4 col-form-label">Password</label>
        <div class="col-sm-8">
          <div id="passwordColumn">
            <input
              :type="visibleEye ? 'password' : 'text'"
              class="form-control"
              id="password"
              placeholder="Password"
              v-model="formData.password"
            />
            <ClientOnly>
              <font-awesome-icon
                :icon="visibleEye ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'"
                @click="visibleEye = !visibleEye"
              />
            </ClientOnly>
          </div>
        </div>
      </div>

      <div class="form-group row mb-2">
        <div class="col-sm-4"></div>
        <div class="col-sm-8">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" id="remember" />
            <label class="form-check-label" for="remember"> Remember me</label>
          </div>
        </div>
      </div>
      <div class="form-group row">
        <div class="col-sm-12">
          <button @click="login()" :disabled="isSubmitting" class="btn btn-primary">Sign In</button>
        </div>
      </div>
      <hr />
      <div class="text-center">
        New on our platform?
        <span class="row-pointer" @click="emit('updateComponent', false)">Create an account</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.alert::first-letter {
  text-transform: uppercase;
}

#passwordColumn {
  input {
    float: left;
  }
  svg {
    float: right;
    position: absolute;
    top: 12px;
    right: 10px;
    color: hsla(160, 100%, 37%, 1);
  }
}

#remember {
  margin-right: 10px;
}

.row-pointer {
  cursor: pointer;
}
</style>
