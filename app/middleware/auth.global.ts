export default defineNuxtRouteMiddleware(async (to) => {
  const { $supabase } = useNuxtApp()

  // Get current user session
  const { data: { session } } = await $supabase.auth.getSession()

  // If not logged in and not heading to login page, redirect to login
  if (!session && to.path !== '/login') {
    return navigateTo('/login')
  }

  // If logged in and heading to login page, redirect to home
  if (session && to.path === '/login') {
    return navigateTo('/')
  }
})
