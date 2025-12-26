<template>
  <div class="navbar bg-black shadow-sm z-10 sticky top-0">
    <div class="flex-none lg:hidden">
      <label for="my-drawer" class="btn btn-square btn-ghost drawer-button">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
          class="inline-block w-5 h-5 stroke-current">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </label>
    </div>
    <div class="flex-1">
      <a class="btn btn-ghost text-xl lg:hidden">{{ pageTitle }}</a>
      <h2 class="text-xl font-black hidden uppercase lg:block px-4 tracking-tighter">{{ pageTitle }}</h2>
    </div>
    <div class="flex pr-4 md:pr-8 gap-2">
      <!-- <div class="form-control hidden sm:block">
        <input type="text" placeholder="Search" class="input input-bordered w-24 md:w-auto rounded-none bg-neutral" />
      </div> -->
      <div class="dropdown dropdown-end" @focusin="markAllAsRead">
        <label tabindex="0" class="btn btn-ghost btn-circle">
          <div class="indicator">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span v-if="unreadCount > 0"
              class="badge badge-sm badge-warning indicator-item border-none text-[10px] font-bold p-1">{{
                unreadCount }}</span>
          </div>
        </label>
        <div tabindex="0"
          class="dropdown-content z-[2] card card-compact w-72 md:w-80 p-2 shadow bg-black outline outline-amber-400 rounded-none mt-4 text-white">
          <div class="card-body">
            <h3 class="font-bold text-lg border-b border-white/10 pb-2">Notifications</h3>
            <div class="max-h-96 overflow-y-auto no-scrollbar flex flex-col gap-2 pt-2">
              <div v-if="notifications.length === 0" class="text-center py-4 opacity-50 text-sm italic">No new
                notifications</div>
              <div v-for="notif in notifications" :key="notif.id" @click="navigateToNotif(notif)"
                class="p-3 bg-neutral hover:bg-neutral/80 transition-colors border-l-4 border-amber-400 cursor-pointer relative group"
                :class="{ 'opacity-60 grayscale-[0.5]': notif.isRead }">
                <button @click.stop="removeNotification(notif.id)"
                  class="btn btn-ghost btn-xs btn-circle absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">✕</button>
                <div class="flex justify-between items-start mb-1 pr-6">
                  <span class="text-[10px] font-bold uppercase tracking-widest text-amber-400">{{ notif.type }}</span>
                  <span class="text-[9px] opacity-40">{{ new Date(notif.created_at).toLocaleDateString() }}</span>
                </div>
                <h4 class="font-bold text-sm leading-tight mb-1">{{ notif.title }}</h4>
                <p class="text-xs opacity-70 line-clamp-2">{{ notif.message }}</p>
              </div>
            </div>
            <div class="pt-2 border-t border-white/10 mt-2">
              <button @click="clearNotifications" class="btn btn-ghost btn-xs w-full text-error hover:bg-error/10">Clear
                All</button>
            </div>
          </div>
        </div>
      </div>
      <div class="dropdown dropdown-end">
        <label tabindex="0" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-none">
            <!-- <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="User Avatar" /> -->

            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"
              viewBox="0 0 24 24"><!-- Icon from Material Symbols by Google - https://github.com/google/material-design-icons/blob/master/LICENSE -->
              <path fill="white"
                d="M18 22q-1.825-.45-2.912-2T14 16.55V14l4-2l4 2v2.55q0 1.9-1.088 3.45T18 22M4 20v-2.8q0-.85.438-1.562T5.6 14.55q1.55-.775 3.15-1.162T12 13v3.55q0 .9.188 1.775T12.775 20zm8-8q-1.65 0-2.825-1.175T8 8t1.175-2.825T12 4t2.825 1.175T16 8t-1.175 2.825T12 12" />
            </svg>

          </div>
        </label>
        <ul tabindex="0"
          class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-black outline outline-amber-400 rounded-none w-52">
          <li><a @click="handleLogout">Logout</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
const route = useRoute()
const { $supabase } = useNuxtApp()

const store = useAppStore()
const { profile, notifications, unreadCount } = storeToRefs(store)
const { clearNotifications, navigateToNotif, removeNotification, markAllAsRead } = store

const pageTitle = computed(() => {
  if (route.path === '/') {
    const username = profile.value?.username || 'Admin'
    return `Hello ${username}`
  }
  const path = route.path?.substring(1).split('/')[0] || 'DASHBOARD'
  return path.toUpperCase()
})

const handleLogout = async () => {
  await $supabase.auth.signOut()
  navigateTo('/login')
}
</script>
