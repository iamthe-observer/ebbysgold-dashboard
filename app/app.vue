<template>
  <div>
    <NuxtLayout>
      <Loading v-if="loading" />
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'

useHead({
  htmlAttrs: {
    'data-theme': 'dark'
  }
})

const { loading } = storeToRefs(useAppStore())

onMounted(async () => {
  useAppStore().$patch({ loading: true })
  await useAppStore().getRegistrations()
  await useAppStore().getMessages()
  useAppStore().$patch({ loading: false })
})
</script>