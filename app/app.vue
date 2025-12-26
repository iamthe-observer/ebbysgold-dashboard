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
  const { $supabase } = useNuxtApp()
  const { data: { session } } = await $supabase.auth.getSession()

  if (session) {
    useAppStore().$patch({ loading: true })
    await useAppStore().getProfile()
    await useAppStore().getRegistrations()
    await useAppStore().getMessages()
    await useAppStore().getAppointments()
    await useAppStore().getReceipts()
  }

  useAppStore().$patch({ loading: false })
})
</script>