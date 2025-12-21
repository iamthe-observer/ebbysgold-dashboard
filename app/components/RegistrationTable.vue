<template>
  <div class="overflow-x-auto bg-black rounded-none shadow-sm">
    <section class="">
      <table class="table">
        <!-- head -->
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Unique Reference</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Package Type</th>
          </tr>
        </thead>
        <tbody>
          <tr onclick="registration.showModal()"
            class="hover:bg-amber-400/50 transition-all duration-300 ease-in-out cursor-pointer" @click="curr_reg = reg"
            v-for="(reg, i) in recent_reg" :key="i">
            <th class="text-white/20">{{ i + 1 }}</th>
            <td>{{ reg.firstName }} {{ reg.lastName }}</td>
            <td>{{ reg.uniqueID }}</td>
            <td>{{ reg.phone }}</td>
            <td>{{ reg.email }}</td>
            <td>{{ reg.gender }}</td>
            <td>{{ reg.package }}</td>
          </tr>
        </tbody>

        <!-- Modal display -->
      </table>

      <dialog id="registration" class="modal">
        <div class="modal-box bg-black/5 rounded-none outline outline-amber-400 backdrop-blur-lg">
          <h3 class="text-lg font-bold flex justify-between">{{ curr_reg!.firstName }} {{
            curr_reg!.lastName }} <span class="text-amber-400">{{ curr_reg!.uniqueID }}</span></h3>
          <p class="py-4 flex flex-col">
            <span class="font-bold">Phone: <span class="font-normal pl-3">{{ curr_reg!.phone
                }}</span></span>
            <span class="font-bold">WhatsApp: <span class="font-normal pl-3">{{ curr_reg!.whatsapp
                }}</span></span>
            <span class="font-bold">Email: <span class="font-normal pl-3">{{ curr_reg!.email
                }}</span></span>
            <span class="font-bold">Gender: <span class="font-normal pl-3">{{ curr_reg!.gender
                }}</span></span>
            <span class="font-bold">Package: <span class="font-normal pl-3">{{ curr_reg!.package
                }}</span></span>
            <span class="font-bold">Room Type: <span class="font-normal pl-3">{{ curr_reg!.roomType
                }}</span></span>
            <span class="font-bold">Has Visa: <span class="font-normal pl-3">{{ curr_reg!.hasVisa
                }}</span></span>
            <span class="font-bold">Visa Country: <span class="font-normal pl-3">{{
              curr_reg!.visaCountry
                }}</span></span>
            <span class="font-bold">Visa Assist: <span class="font-normal pl-3">{{
              curr_reg!.visaAssist
                }}</span></span>
            <span class="font-bold">Address: <span class="font-normal pl-3">{{ curr_reg!.addr
                }}</span></span>
            <span class="font-bold">Passport Number: <span class="font-normal pl-3">{{
              curr_reg!.passNo
                }}</span></span>
            <span class="font-bold">Passport Expiry: <span class="font-normal pl-3">{{
              curr_reg!.passExp
                }}</span></span>
            <span class="font-bold">Registered Date: <span class="font-normal pl-3">{{
              new Date(curr_reg!.created_at).toLocaleDateString('en-GB')
                }}</span></span>
          </p>
        </div>
        <form method="dialog"
          class="modal-backdrop border-outline bg-black/25 backdrop-blur-lg outline outline-amber-400">
          <button>close</button>
        </form>
      </dialog>
    </section>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import type { Registration } from '~/interfaces/index'

const { registrations, messages } = storeToRefs(useAppStore())
const recent_reg = computed(() => registrations.value.slice(0, 3))
const curr_reg = ref<Registration | null>({
  addr: '',
  dob: '',
  email: '',
  firstName: '',
  gender: '',
  hasVisa: false,
  lastName: '',
  package: '',
  phone: '',
  roomType: '',
  uniqueID: '',
  visaAssist: '',
  visaCountry: '',
  created_at: new Date(),
  whatsapp: '',
  passExp: '',
  passNo: ''
})
</script>
