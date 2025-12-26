<template>
  <div>
    <NuxtLayout>
      <Loading v-if="loading" />
      <NuxtPage />
    </NuxtLayout>

    <!-- Global Toasts -->
    <div class="toast toast-top toast-end z-[9999]">
      <div v-for="toast in toasts" :key="toast.id"
        class="alert shadow-lg border-amber-400 bg-neutral text-white animate-bounce-short">
        <div class="flex items-center gap-2">
          <div class="p-2 bg-amber-400 rounded-full text-black">
            <svg v-if="toast.type === 'registration'" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <svg v-if="toast.type === 'message'" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            <svg v-if="toast.type === 'appointment'" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h3 class="font-bold text-xs uppercase tracking-tighter">{{ toast.title }}</h3>
            <div class="text-xs opacity-70">{{ toast.message }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'

useHead({
  htmlAttrs: {
    'data-theme': 'dark'
  }
})

const { loading, toasts } = storeToRefs(useAppStore())

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