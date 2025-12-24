<template>
	<main clas="flex flex-col gap-2 w-full h-full">
		<div class="tabs tabs-box bg-neutral rounded-none">

			<input type="radio" name="my_tabs_6" class="bg-transparent tab rounded-none"
				:aria-label="`REGISTRATIONS ${registrations.length == 0 ? '' : registrations.length}`"
				:checked="checked" />
			<div class="tab-content bg-black rounded-none p-6">
				<section class="">
					<table class="table">
						<!-- head -->
						<thead>
							<tr>
								<th colspan="7">
									<div class="p-2">
										<input v-model="regSearch" type="text" placeholder="Search Registrations..."
											class="input input-bordered bg-neutral input-sm w-full max-w-xs rounded-none" />
									</div>
								</th>
							</tr>
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
								class="hover:bg-amber-400/50 transition-all duration-300 ease-in-out cursor-pointer"
								@click="curr_reg = reg" v-for="(reg, i) in filteredRegistrations" :key="i">
								<th class="text-white/20">{{ i + 1 }}</th>
								<td>{{ reg.firstName }} {{ reg.lastName }}</td>
								<td class="text-amber-100 font-bold text-xl">{{ reg.uniqueID }}</td>
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
							<form method="dialog">
								<button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
							</form>


							<h3 class="text-lg font-bold flex justify-start gap-5 items-center">{{ curr_reg!.firstName
							}} {{
									curr_reg!.lastName }} <span class="text-black px-2 py-1 bg-amber-400">{{
									curr_reg!.uniqueID
								}}</span>
							</h3>
							<p class="py-4 flex flex-col">
								<span class="font-bold">Phone: <span class="font-normal pl-3">{{ curr_reg!.phone
								}}</span></span>
								<span class="font-bold">Date of Birth: <span class="font-normal pl-3">{{
									new Date(curr_reg!.dob).toLocaleDateString('en-GB')
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
					</dialog>
				</section>
			</div>

			<input type="radio" name="my_tabs_6" class="bg-transparent tab rounded-none"
				:aria-label="`MESSAGES ${messages.length == 0 ? '' : messages.length}`" />
			<div class="tab-content rounded-none bg-black p-6">
				<section class="">
					<table class="table">
						<!-- head -->
						<thead>
							<tr>
								<th colspan="4">
									<div class="p-2">
										<input v-model="msgSearch" type="text" placeholder="Search Messages..."
											class="input input-bordered bg-neutral input-sm w-full max-w-xs rounded-none" />
									</div>
								</th>
							</tr>
							<tr>
								<th>#</th>
								<th>Name</th>
								<th>Email</th>
								<th>Message</th>
							</tr>
						</thead>
						<tbody>
							<tr class="hover:bg-amber-400/50 transition-all duration-300 ease-in-out cursor-pointer"
								v-for="(msg, i) in filteredMessages" onclick="message1.showModal()"
								@click="curr_msg = msg">
								<th class="text-white/20">{{ i }}</th>
								<td>{{ msg.fullName }}</td>
								<td>{{ msg.email }}</td>
								<td class="truncate h-8 w-40 line-clamp-1">{{ msg.message }}</td>
							</tr>
						</tbody>
					</table>

					<dialog id="message1" class="modal z-[100]">
						<div class="modal-box bg-black/5 rounded-none outline outline-amber-400 backdrop-blur-lg">
							<form method="dialog">
								<button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
							</form>
							<h3 class="text-lg font-bold flex justify-between">{{ curr_msg!.fullName }}</h3>
							<p class="py-4 flex flex-col">
								<span class="font-bold">Email: <span class="font-normal pl-3">{{ curr_msg!.email
								}}</span></span>
								<span class="font-bold">Message: <span class="font-normal pl-3">{{ curr_msg!.message
								}}</span></span>
							</p>
						</div>
					</dialog>
				</section>
			</div>

			<input type="radio" name="my_tabs_6" class="bg-transparent tab rounded-none"
				:aria-label="`APPOINTMENTS ${appointments.length == 0 ? '' : appointments.length}`" />
			<div class="tab-content rounded-none bg-black p-6">
				<section class="">
					<table class="table">
						<!-- head -->
						<thead>
							<tr>
								<th colspan="7">
									<div class="flex gap-4 p-2 items-center">
										<input v-model="appSearch" type="text" placeholder="Search Appointments..."
											class="input input-bordered bg-neutral input-sm w-full max-w-xs rounded-none" />
										<select v-model="appStatusFilter"
											class="select bg-neutral select-bordered select-sm rounded-none">
											<option value="">All Statuses</option>
											<option value="pending">Pending</option>
											<option value="attended">Attended</option>
											<option value="accepted">Accepted</option>
											<option value="cancelled">Cancelled</option>
											<option value="denied">Denied</option>
										</select>
									</div>
								</th>
							</tr>
							<tr>
								<th>#</th>
								<th>Name</th>
								<th>Created At</th>
								<th>Phone</th>
								<th>Email</th>
								<th>Appointment Date</th>
								<th>Status</th>
							</tr>
						</thead>
						<tbody>
							<tr class="" v-for="(app, i) in filteredAppointments" :key="i">
								<th class="text-white/20">{{ i + 1 }}</th>
								<td>{{ app.fullName }}</td>
								<td>{{ formatDateTime(app.created_at) }}</td>
								<td>{{ app.phone }}</td>
								<td>{{ app.email }}</td>
								<td>{{ formatDateTime(app.date) }}</td>
								<td>
									<select :value="app.status || 'pending'"
										@change="updateAppointmentStatus(app, ($event.target as HTMLSelectElement).value)"
										class="select select-ghost select-xs rounded-none" :class="{
											'text-warning': !app.status || app.status === 'pending',
											'text-success': app.status === 'attended' || app.status === 'accepted',
											'text-error': app.status === 'cancelled' || app.status === 'denied'
										}">
										<option value="pending">Pending</option>
										<option value="attended">Attended</option>
										<option value="accepted">Accepted</option>
										<option value="cancelled">Cancelled</option>
										<option value="denied">Denied</option>
									</select>
								</td>
							</tr>
						</tbody>
					</table>
				</section>
			</div>


		</div>
	</main>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import type { Registration, Message, Appointment } from '~/interfaces/index'

useHead({
	title: 'Inbox | Ebbys Gold'
})

function formatDateTime(date: string) {
	let newDate = new Date(date)
	const day = String(newDate.getDate()).padStart(2, '0');
	const month = String(newDate.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
	const year = newDate.getFullYear();
	const hours = String(newDate.getHours()).padStart(2, '0');
	const minutes = String(newDate.getMinutes()).padStart(2, '0');

	return `${day}/${month}/${year} ${hours}:${minutes}`;
}

const { registrations, messages, appointments } = storeToRefs(useAppStore())
const { $supabase } = useNuxtApp()
const checked = ref(true)

// Search and Filter States
const regSearch = ref('')
const msgSearch = ref('')
const appSearch = ref('')
const appStatusFilter = ref('')

const filteredRegistrations = computed(() => {
	if (!regSearch.value) return registrations.value
	const s = regSearch.value.toLowerCase()
	return registrations.value.filter(r =>
		r.firstName.toLowerCase().includes(s) ||
		r.lastName.toLowerCase().includes(s) ||
		r.email.toLowerCase().includes(s) ||
		r.uniqueID.toLowerCase().includes(s) ||
		r.phone.includes(s)
	)
})

const filteredMessages = computed(() => {
	if (!msgSearch.value) return messages.value
	const s = msgSearch.value.toLowerCase()
	return messages.value.filter(m =>
		m.fullName.toLowerCase().includes(s) ||
		m.email.toLowerCase().includes(s) ||
		m.message.toLowerCase().includes(s)
	)
})

const filteredAppointments = computed(() => {
	let list = appointments.value

	if (appStatusFilter.value) {
		list = list.filter(a => (a.status || 'pending') === appStatusFilter.value)
	}

	if (!appSearch.value) return list
	const s = appSearch.value.toLowerCase()
	return list.filter(a =>
		a.fullName.toLowerCase().includes(s) ||
		a.email.toLowerCase().includes(s) ||
		a.phone.includes(s)
	)
})

const store = useAppStore()
const updateAppointmentStatus = async (app: Appointment, status: string) => {
	try {
		await store.updateAppointmentStatus(app, status)
	} catch (error) {
		alert('Failed to update status. Please try again.')
	}
}
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
const curr_msg = ref<Message | null>({
	fullName: '',
	email: '',
	message: ''
})
</script>

<style scoped></style>