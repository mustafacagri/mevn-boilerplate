<script setup>
import Login from '@/components/user/Login'
import Signup from '@/components/user/Signup'

const isLogin = ref(true)
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <component :is="isLogin ? Login : Signup" @updateComponent="v => (isLogin = v)" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
