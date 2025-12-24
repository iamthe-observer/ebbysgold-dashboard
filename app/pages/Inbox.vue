<template>
	<main class="flex flex-col gap-2 w-full h-full overflow-hidden">
		<!-- Tabs Container -->
		<div class="bg-neutral overflow-x-auto no-scrollbar border-b border-white/5">
			<div class="flex flex-nowrap min-w-max">
				<button v-for="tab in tabList" :key="tab.id" @click="activeTab = tab.id"
					class="px-6 py-4 text-sm font-bold transition-all duration-200 border-b-2" :class="activeTab === tab.id
						? 'border-amber-400 text-amber-400 bg-black/20'
						: 'border-transparent text-gray-400 hover:text-white hover:bg-white/5'">
					{{ tab.label }}
					<span v-if="tab.count > 0" class="ml-2 badge badge-ghost badge-sm border-none bg-white/10">{{
						tab.count
						}}</span>
				</button>
			</div>
		</div>

		<!-- Tab Content -->
		<div class="flex-grow overflow-y-auto">
			<!-- Registrations Content -->
			<div v-if="activeTab === 'registrations'" class="bg-black p-4 md:p-6">
				<section class="">
					<table class="table w-full">
						<!-- head -->
						<thead>
							<tr>
								<th colspan="7" class="whitespace-normal">
									<div class="p-2">
										<input v-model="regSearch" type="text" placeholder="Search Registrations..."
											class="input input-bordered bg-neutral input-sm w-full max-w-xs rounded-none" />
									</div>
								</th>
							</tr>
							<tr>
								<th>#</th>
								<th>Name</th>
								<th class="hidden sm:table-cell">Unique Reference</th>
								<th class="hidden md:table-cell">Phone</th>
								<th class="hidden lg:table-cell">Email</th>
								<th class="hidden xl:table-cell">Gender</th>
								<th class="hidden lg:table-cell">Package Type</th>
							</tr>
						</thead>
						<tbody>
							<tr onclick="registration.showModal()"
								class="hover:bg-amber-400/50 transition-all duration-300 ease-in-out cursor-pointer"
								@click="curr_reg = reg" v-for="(reg, i) in filteredRegistrations" :key="i">
								<th class="text-white/20">{{ i + 1 }}</th>
								<td>{{ reg.firstName }} {{ reg.lastName }}</td>
								<td class="text-amber-100 font-bold text-xl hidden sm:table-cell">{{ reg.uniqueID }}
								</td>
								<td class="hidden md:table-cell">{{ reg.phone }}</td>
								<td class="hidden lg:table-cell">{{ reg.email }}</td>
								<td class="hidden xl:table-cell">{{ reg.gender }}</td>
								<td class="hidden lg:table-cell">{{ reg.package }}</td>
							</tr>
						</tbody>
					</table>

					<!-- Modal display -->
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

			<!-- Messages Content -->
			<div v-if="activeTab === 'messages'" class="bg-black p-4 md:p-6">
				<section class="">
					<table class="table w-full">
						<thead>
							<tr>
								<th colspan="4" class="whitespace-normal">
									<div class="p-2">
										<input v-model="msgSearch" type="text" placeholder="Search Messages..."
											class="input input-bordered bg-neutral input-sm w-full max-w-xs rounded-none" />
									</div>
								</th>
							</tr>
							<tr>
								<th>#</th>
								<th>Name</th>
								<th class="hidden sm:table-cell">Email</th>
								<th>Message</th>
							</tr>
						</thead>
						<tbody>
							<tr class="hover:bg-amber-400/50 transition-all duration-300 ease-in-out cursor-pointer"
								v-for="(msg, i) in filteredMessages" onclick="message1.showModal()"
								@click="curr_msg = msg">
								<th class="text-white/20">{{ i + 1 }}</th>
								<td>{{ msg.fullName }}</td>
								<td class="hidden sm:table-cell">{{ msg.email }}</td>
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

			<!-- Appointments Content -->
			<div v-if="activeTab === 'appointments'" class="bg-black p-4 md:p-6">
				<section class="">
					<table class="table w-full">
						<thead>
							<tr>
								<th colspan="7" class="whitespace-normal">
									<div class="flex flex-col sm:flex-row gap-4 p-2 items-start sm:items-center">
										<input v-model="appSearch" type="text" placeholder="Search Appointments..."
											class="input input-bordered bg-neutral input-sm w-full max-w-xs rounded-none" />
										<select v-model="appStatusFilter"
											class="select bg-neutral select-bordered select-sm rounded-none w-full sm:w-auto">
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
								<th class="hidden md:table-cell">Created At</th>
								<th class="hidden sm:table-cell">Phone</th>
								<th class="hidden lg:table-cell">Email</th>
								<th>Appointment Date</th>
								<th>Status</th>
							</tr>
						</thead>
						<tbody>
							<tr class="" v-for="(app, i) in filteredAppointments" :key="i">
								<th class="text-white/20">{{ i + 1 }}</th>
								<td>{{ app.fullName }}</td>
								<td class="hidden md:table-cell">{{ formatDateTime(app.created_at) }}</td>
								<td class="hidden sm:table-cell">{{ app.phone }}</td>
								<td class="hidden lg:table-cell">{{ app.email }}</td>
								<td>{{ formatDateTime(app.date) }}</td>
								<td>
									<select :value="app.status || 'pending'"
										@change="updateAppointmentStatus(app, ($event.target as HTMLSelectElement).value)"
										class="select select-bordered select-xs rounded-none w-full sm:w-auto font-bold"
										:class="{
											'text-[#FBBF24]': !app.status || app.status === 'pending',
											'text-[#4ADE80]': app.status === 'accepted',
											'text-[#60A5FA]': app.status === 'attended',
											'text-[#F87171]': app.status === 'cancelled',
											'text-[#9CA3AF]': app.status === 'denied'
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
const activeTab = ref('registrations')

const tabList = computed(() => [
	{ id: 'registrations', label: 'REGISTRATIONS', count: registrations.value.length },
	{ id: 'messages', label: 'MESSAGES', count: messages.value.length },
	{ id: 'appointments', label: 'APPOINTMENTS', count: appointments.value.length }
])

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