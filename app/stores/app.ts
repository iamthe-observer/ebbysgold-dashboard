import { defineStore } from 'pinia'
import type { Registration, Message, Appointment, Receipt } from '~/interfaces/index'
import type { Profile } from '~/interfaces/index'

export const useAppStore = defineStore('app', () => {
  const { $supabase } = useNuxtApp()
  const loading = ref(true)
  const registrations = ref<Registration[]>([])
  const appointments = ref<Appointment[]>([])
  const messages = ref<Message[]>([])
  const receipts = ref<Receipt[]>([])
  const profile = ref<Profile>()

  const getProfile = async () => {
    try {
      const { data: { user } } = await $supabase.auth.getUser()

      if (!user) {
        console.warn('No active user session')
        return
      }

      const { data, error } = await $supabase
        .from('profiles')
        .select('*')
        .eq('email', user.email)
        .single()

      if (error) {
        throw error
      }
      profile.value = data
      console.log(profile.value)
    } catch (error) {
      console.error(error)
    }
  }

  const getRegistrations = async () => {
    try {
      const { data, error } = await $supabase
        .from('wc-registration-egtravels')
        .select('*')

      if (error) {
        throw error
      }
      registrations.value = data
      console.log(registrations.value)
    } catch (error) {
      console.error(error)
    }
  }

  const getMessages = async () => {
    try {
      const { data, error } = await $supabase
        .from('messages-egtravels')
        .select('*')

      if (error) {
        throw error
      }
      messages.value = data
      console.log(messages.value)
    } catch (error) {
      console.error(error)
    }
  }

  const getAppointments = async () => {
    try {
      const { data, error } = await $supabase
        .from('appointment-egtravels')
        .select('*')

      if (error) {
        throw error
      }
      appointments.value = data
      console.log(appointments.value)
    } catch (error) {
      console.error(error)
    }
  }

  const updateAppointmentStatus = async (app: Appointment, status: string) => {
    console.log('Updating appointment:', { app, status })
    try {
      let query = $supabase.from('appointment-egtravels').update({ status })

      if (app.id) {
        query = query.eq('id', app.id)
      } else {
        // Fallback to phone and email if id is missing
        query = query.eq('phone', app.phone).eq('email', app.email)
      }

      const { data, error } = await query.select()

      if (error) {
        console.error('Supabase update error:', error)
        throw error
      }

      console.log('Update result:', data)

      const localApp = appointments.value.find((a) =>
        (app.id && a.id === app.id) || (a.phone === app.phone && a.email === app.email)
      )
      if (localApp) localApp.status = status
    } catch (error) {
      console.error('Error updating status:', error)
      throw error
    }
  }

  const getReceipts = async () => {
    try {
      const { data, error } = await $supabase
        .from('receipts-egtravels')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        throw error
      }
      receipts.value = data
      console.log(receipts.value)
    } catch (error) {
      console.error(error)
    }
  }

  const updateRegistrationStatus = async (reg: Registration, status: string) => {
    try {
      let query = $supabase.from('wc-registration-egtravels').update({ status })
      if (reg.id) {
        query = query.eq('id', reg.id)
      } else {
        query = query.eq('uniqueID', reg.uniqueID)
      }
      const { error } = await query
      if (error) throw error
      const localReg = registrations.value.find((r) =>
        (reg.id && r.id === reg.id) || (r.uniqueID === reg.uniqueID)
      )
      if (localReg) localReg.status = status as any
    } catch (error) {
      console.error('Error updating registration status:', error)
      throw error
    }
  }

  const updateMessageStatus = async (msg: Message, status: string) => {
    try {
      let query = $supabase.from('messages-egtravels').update({ status })
      if (msg.id) {
        query = query.eq('id', msg.id)
      } else {
        query = query.eq('email', msg.email).eq('fullName', msg.fullName)
      }
      const { error } = await query
      if (error) throw error
      const localMsg = messages.value.find((m) =>
        (msg.id && m.id === msg.id) || (m.email === msg.email && m.fullName === msg.fullName)
      )
      if (localMsg) localMsg.status = status as any
    } catch (error) {
      console.error('Error updating message status:', error)
      throw error
    }
  }

  const refreshAllData = async () => {
    loading.value = true
    try {
      await Promise.all([
        getRegistrations(),
        getMessages(),
        getAppointments(),
        getReceipts()
      ])
    } catch (error) {
      console.error('Error refreshing data:', error)
    } finally {
      loading.value = false
    }
  }

  const isAdmin = computed(() => profile.value?.role === true)
  const isStaff = computed(() => profile.value?.role === true || profile.value?.role === false)

  return {
    loading,
    profile,
    isAdmin,
    isStaff,
    refreshAllData,
    getRegistrations,
    getMessages,
    getAppointments,
    getReceipts,
    getProfile,
    registrations,
    messages,
    appointments,
    receipts,
    updateRegistrationStatus,
    updateMessageStatus,
    updateAppointmentStatus,
  }
})
