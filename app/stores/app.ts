import { defineStore } from 'pinia'
import type { Registration, Message, Appointment } from '~/interfaces/index'

export const useAppStore = defineStore('app', () => {
  const { $supabase } = useNuxtApp()
  const loading = ref(false)
  const registrations = ref<Registration[]>([])
  const appointments = ref<Appointment[]>([])
  const messages = ref<Message[]>([])

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

  return {
    loading,
    getRegistrations,
    getMessages,
    registrations,
    messages,
    getAppointments,
    appointments,
  }
})
