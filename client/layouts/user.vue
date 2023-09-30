<script setup>
import { useUserStore } from '@/store'
import Header from '@/components/general/Header'
import Footer from '@/components/general/footer'
import TopItems from '@/components/user/TopItems'
</script>

<template>
  <div>
    <Header />
    <TopItems />
    <div class="container">
      <slot />
    </div>
    <Footer />
  </div>
</template>
