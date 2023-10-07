<script setup>
import upgradeBannerDark from '@/assets/images/pro/upgrade-banner-dark.png'
import upgradeBannerLight from '@/assets/images/pro/upgrade-banner-light.png'
import logo from '@/assets/logo.svg?raw'
import router from '@/router'
import { VerticalNavLink, VerticalNavSectionTitle } from '@layouts'
import { useTheme } from 'vuetify'

const logout = () => {
  localStorage.removeItem('token')
  router.push('logout')
}

const vuetifyTheme = useTheme()
const upgradeBanner = computed(() => {
  return vuetifyTheme.global.name.value === 'light' ? upgradeBannerLight : upgradeBannerDark
})
</script>

<template>
  <!-- 👉 Nav header -->
  <div class="nav-header">
    <RouterLink
      to="/"
      class="app-logo d-flex align-center gap-x-3 app-title-wrapper"
    >
      <!-- ℹ️ You can also use img tag or VImg here -->
      <div v-html="logo" />

      <Transition name="vertical-nav-app-title">
        <h1 class="font-weight-semibold leading-normal text-xl text-uppercase">MEVN Stack</h1>
      </Transition>
    </RouterLink>
  </div>

  <!-- 👉 Nav items -->
  <ul>
    <VerticalNavLink
      :item="{
        title: 'Dashboard',
        to: 'index',
        icon: { icon: 'mdi-home-outline' },
      }"
    />
    <!-- 👉 Pages -->
    <VerticalNavSectionTitle :item="{ heading: 'Posts' }" />

    <VerticalNavLink
      :item="{
        to: 'users',
        title: 'Users',
        icon: { icon: 'mdi-account-group' },
      }"
    />

    <VerticalNavLink
      :item="{
        to: 'tickets',
        title: 'Tickets',
        icon: { icon: 'mdi-folder-outline' },
      }"
    />

    <VerticalNavLink
      :item="{
        to: 'posts',
        title: 'Posts',
        icon: { icon: 'mdi-clipboard-outline' },
      }"
    />

    <VerticalNavLink
      :item="{
        to: 'postCategories',
        title: 'Post Categories',
        icon: { icon: 'mdi-folder-outline' },
      }"
    />

    <!-- 👉 User -->
    <VerticalNavSectionTitle :item="{ heading: 'User' }" />
    <VerticalNavLink
      :item="{
        to: 'login',
        title: 'Logout',
        icon: { icon: 'mdi-login' },
      }"
      @click="logout"
    />
  </ul>
</template>

<style lang="scss">
.upgrade-banner {
  margin-top: auto;
}
</style>
