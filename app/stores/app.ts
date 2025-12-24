import { defineStore } from 'pinia'
import type { Registration, Message, Appointment, Receipt } from '~/interfaces/index'

export const useAppStore = defineStore('app', () => {
  const { $supabase } = useNuxtApp()
  const loading = ref(true)
  const registrations = ref<Registration[]>([])
  const appointments = ref<Appointment[]>([])
  const messages = ref<Message[]>([])
  const receipts = ref<Receipt[]>([])

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

  return {
    loading,
    getRegistrations,
    getMessages,
    registrations,
    messages,
    getAppointments,
    appointments,
    updateAppointmentStatus,
    getReceipts,
    receipts,
  }
})
