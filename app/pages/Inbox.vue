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
								<th colspan="8" class="whitespace-normal">
									<div class="flex flex-col sm:flex-row gap-4 p-2 items-start sm:items-center">
										<input v-model="regSearch" type="text" placeholder="Search Registrations..."
											class="input input-bordered bg-neutral input-sm w-full max-w-xs rounded-none" />
										<select v-model="regStatusFilter"
											class="select bg-neutral select-bordered select-sm rounded-none w-full sm:w-auto">
											<option value="">All Statuses</option>
											<option value="new">New</option>
											<option value="downloaded">Downloaded</option>
										</select>
									</div>
								</th>
							</tr>
							<tr>
								<th>#</th>
								<th>Name</th>
								<th class="hidden sm:table-cell">Unique Reference</th>
								<th class="hidden md:table-cell">Phone</th>
								<th class="hidden lg:table-cell">Email</th>
								<th class="hidden lg:table-cell">Package Type</th>
								<th>Status</th>
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
								<td class="hidden lg:table-cell">{{ reg.package }}</td>
								<td>
									<div class="badge badge-sm font-bold border-none" :class="{
										'bg-yellow-400 text-black': !reg.status || reg.status === 'new',
										'bg-green-400 text-black': reg.status === 'downloaded'
									}">
										{{ reg.status || 'new' }}
									</div>
								</td>
							</tr>
						</tbody>
					</table>

					<!-- Professional Registration Modal -->
					<dialog id="registration" class="modal">
						<div class="modal-box w-11/12 max-w-5xl bg-white text-black p-0 rounded-none overflow-hidden">
							<div class="overflow-y-auto max-h-[80vh] p-4 md:p-12 relative">
								<form method="dialog">
									<button
										class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-black z-50">✕</button>
								</form>

								<!-- Registration Document -->
								<div id="printable-registration"
									class="bg-white text-black w-full relative flex flex-col">
									<!-- Header -->
									<div
										class="flex justify-between items-start mb-12 border-b-2 border-slate-100 pb-8">
										<div>
											<h1 class="text-4xl font-bold tracking-tight text-slate-800 mb-2">
												<NuxtImg src="/logob.png" class="w-48 aspect-video object-cover"
													alt="Ebbysgold Logo" />
											</h1>
											<div class="text-slate-500 text-sm leading-relaxed">
												<p>Plot 158, Spintex Road, Accra</p>
												<p>+233 53 780 4885 • ebbysgold@gmail.com</p>
											</div>
										</div>
										<div class="text-right">
											<div class="text-sm text-slate-400 uppercase tracking-widest mb-1">
												UNIQUE ID</div>
											<div class="text-2xl font-mono font-bold text-amber-500">{{
												curr_reg!.uniqueID }}</div>
											<div class="text-sm text-slate-400 uppercase tracking-widest mt-4">Date
											</div>
											<div class="text-lg font-medium text-slate-800">{{ new
												Date(curr_reg!.created_at).toLocaleDateString('en-GB') }}</div>
										</div>
									</div>

									<!-- Applicant Information -->
									<div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
										<div class="space-y-4">
											<h4
												class="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">
												Applicant Information</h4>
											<div class="grid grid-cols-2 gap-2 text-sm">
												<span class="font-bold text-slate-500">Full Name:</span>
												<span class="text-slate-800">{{ curr_reg!.firstName }} {{
													curr_reg!.lastName }}</span>

												<span class="font-bold text-slate-500">Gender:</span>
												<span class="text-slate-800">{{ curr_reg!.gender }}</span>

												<span class="font-bold text-slate-500">Date of Birth:</span>
												<span class="text-slate-800">{{ new
													Date(curr_reg!.dob).toLocaleDateString('en-GB') }}</span>

												<span class="font-bold text-slate-500">Phone:</span>
												<span class="text-slate-800">{{ curr_reg!.phone || 'N/A' }}</span>

												<span class="font-bold text-slate-500">WhatsApp:</span>
												<span class="text-slate-800">{{ curr_reg!.whatsapp || 'N/A' }}</span>

												<span class="font-bold text-slate-500">Email:</span>
												<span class="text-slate-800">{{ curr_reg!.email || 'N/A'
												}}</span>
											</div>
										</div>
										<div class="space-y-4">
											<h4
												class="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">
												Travel & Package Details</h4>
											<div class="grid grid-cols-2 gap-2 text-sm">
												<span class="font-bold text-slate-500">Package:</span>
												<span class="text-amber-600 font-bold">{{ curr_reg!.package || 'N/A'
												}}</span>

												<span class="font-bold text-slate-500">Room Type:</span>
												<span class="text-slate-800">{{ curr_reg!.roomType || 'N/A' }}</span>

												<span class="font-bold text-slate-500">Has Visa:</span>
												<span class="text-slate-800">{{ curr_reg!.hasVisa ? 'Yes' : 'No'
												}}</span>

												<span class="font-bold text-slate-500">Visa Country:</span>
												<span class="text-slate-800">{{ curr_reg!.visaCountry || 'N/A' }}</span>

												<span class="font-bold text-slate-500">Visa Assistance:</span>
												<span class="text-slate-800">{{ curr_reg!.visaAssist || 'N/A' }}</span>
											</div>
										</div>
									</div>

									<!-- Address and Identity -->
									<div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
										<div class="space-y-4">
											<h4
												class="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">
												Identity Details</h4>
											<div class="grid grid-cols-2 gap-2 text-sm">
												<span class="font-bold text-slate-500">Passport Number:</span>
												<span class="text-slate-800 font-mono">{{ curr_reg!.passNo || 'N/A'
												}}</span>

												<span class="font-bold text-slate-500">Passport Expiry:</span>
												<span class="text-slate-800">{{ curr_reg!.passExp !== '//' ?
													curr_reg!.passExp : 'N/A' }}</span>
											</div>
										</div>
										<div class="space-y-4">
											<h4
												class="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">
												Residential Address</h4>
											<div class="text-sm text-slate-800 p-3">
												{{ curr_reg!.addr }}
											</div>
										</div>
									</div>

									<!-- Footer Decor -->
									<div class="mt-auto pt-12 border-t border-slate-100 flex justify-between items-end">
										<div class="text-[10px] text-slate-400 uppercase tracking-widest">
											Official Registration Document • Ebbysgold Travels
										</div>
										<div class="flex flex-col items-end">
											<div class="w-32 h-1 bg-amber-400 mb-1"></div>
											<div class="text-[10px] text-slate-400 uppercase font-bold">Authorized
												Signature</div>
										</div>
									</div>
								</div>

								<!-- Floating Action Button for Download -->
								<div class="fixed bottom-8 right-8 flex gap-2 no-print">
									<div class="dropdown dropdown-top dropdown-end">
										<label tabindex="0"
											class="btn bg-amber-400 border-black border hover:bg-amber-500 text-black btn-circle shadow-xl">
											<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
												viewBox="0 0 24 24" stroke="currentColor">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
													d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
											</svg>
										</label>
										<ul tabindex="0"
											class="dropdown-content menu p-2 shadow-2xl bg-neutral text-white rounded-none w-52 mb-4">
											<li>
												<button @click="printRegistration" class="flex gap-2">
													<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
														viewBox="0 0 24 24" stroke="currentColor">
														<path stroke-linecap="round" stroke-linejoin="round"
															stroke-width="2"
															d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
													</svg>
													Download PDF
												</button>
											</li>
											<li>
												<div v-if="isStaff" class="flex flex-col gap-2 p-2">
													<span class="text-xs opacity-50 uppercase font-bold">Update
														Status</span>
													<div class="flex gap-2">
														<button @click="updateRegistrationStatus(curr_reg!, 'new')"
															class="btn btn-xs bg-yellow-400 border-none text-black flex-1">New</button>
														<button
															@click="updateRegistrationStatus(curr_reg!, 'downloaded')"
															class="btn btn-xs bg-green-400 border-none text-black flex-1">Downloaded</button>
													</div>
												</div>
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
						<form method="dialog" class="modal-backdrop">
							<button>close</button>
						</form>
					</dialog>
				</section>
			</div>

			<!-- Messages Content -->
			<div v-if="activeTab === 'messages'" class="bg-black p-4 md:p-6">
				<section class="">
					<table class="table w-full">
						<thead>
							<tr>
								<th colspan="5" class="whitespace-normal">
									<div class="flex flex-col sm:flex-row gap-4 p-2 items-start sm:items-center">
										<input v-model="msgSearch" type="text" placeholder="Search Messages..."
											class="input input-bordered bg-neutral input-sm w-full max-w-xs rounded-none" />
										<select v-model="msgStatusFilter"
											class="select bg-neutral select-bordered select-sm rounded-none w-full sm:w-auto">
											<option value="">All Statuses</option>
											<option value="unread">Unread</option>
											<option value="read">Read</option>
											<option value="replied">Replied</option>
										</select>
									</div>
								</th>
							</tr>
							<tr>
								<th>#</th>
								<th>Name</th>
								<th class="hidden sm:table-cell">Email</th>
								<th>Message</th>
								<th>Status</th>
							</tr>
						</thead>
						<tbody>
							<tr class="hover:bg-amber-400/50 transition-all duration-300 ease-in-out cursor-pointer"
								v-for="(msg, i) in filteredMessages" onclick="message1.showModal()"
								@click="openMessage(msg)">
								<th class="text-white/20">{{ i + 1 }}</th>
								<td>{{ msg.fullName }}</td>
								<td class="hidden sm:table-cell">{{ msg.email }}</td>
								<td class="truncate h-8 w-40 line-clamp-1">{{ msg.message }}</td>
								<td>
									<div class="badge badge-sm font-bold border-none" :class="{
										'bg-red-500 text-black': !msg.status || msg.status === 'unread',
										'bg-yellow-400 text-black': msg.status === 'read',
										'bg-green-500 text-black': msg.status === 'replied'
									}">
										{{ msg.status || 'unread' }}
									</div>
								</td>
							</tr>
						</tbody>
					</table>

					<dialog id="message1" class="modal z-[100]">
						<div class="modal-box bg-neutral rounded-none outline outline-amber-400 backdrop-blur-lg">
							<form method="dialog">
								<button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
							</form>
							<h3 class="text-lg font-bold flex justify-between border-b border-white/10 pb-2">{{
								curr_msg!.fullName }}</h3>
							<p class="py-4 flex flex-col gap-2">
								<span class="font-bold flex flex-col text-xs text-slate-400 uppercase">Email <span
										class="font-normal text-sm text-white pt-1">{{ curr_msg!.email }}</span></span>
								<span class="font-bold flex flex-col text-xs text-slate-400 uppercase">Message <span
										class="font-normal text-sm text-white pt-1">{{ curr_msg!.message
										}}</span></span>
							</p>
							<div class="divider"></div>
							<div v-if="isAdmin || (isStaff && curr_msg?.status === 'read')" class="flex flex-col gap-2">
								<span class="text-xs opacity-50 uppercase font-bold">Status</span>
								<div class="flex gap-2">
									<button @click="updateMessageStatus(curr_msg!, 'unread')"
										class="btn btn-sm bg-red-500 border-none text-white flex-1 hover:bg-red-600">Unread</button>
									<button @click="updateMessageStatus(curr_msg!, 'read')"
										class="btn btn-sm bg-yellow-400 border-none text-black flex-1 hover:bg-yellow-500">Read</button>
									<button @click="updateMessageStatus(curr_msg!, 'replied')"
										class="btn btn-sm bg-green-500 border-none text-white flex-1 hover:bg-green-600">Replied</button>
								</div>
							</div>
						</div>
						<form method="dialog" class="modal-backdrop">
							<button>close</button>
						</form>
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
										:disabled="!isAdmin" :class="{
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
	title: 'Inbox | Ebbygold Travels'
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

const { registrations, messages, appointments, isAdmin, isStaff, profile, activeTab } = storeToRefs(useAppStore())
const { $supabase } = useNuxtApp()

const tabList = computed(() => [
	{ id: 'registrations', label: 'REGISTRATIONS', count: registrations.value.length },
	{ id: 'messages', label: 'MESSAGES', count: messages.value.length },
	{ id: 'appointments', label: 'APPOINTMENTS', count: appointments.value.length }
])

// Search and Filter States
const regSearch = ref('')
const regStatusFilter = ref('')
const msgSearch = ref('')
const msgStatusFilter = ref('')
const appSearch = ref('')
const appStatusFilter = ref('')

const filteredRegistrations = computed(() => {
	let list = registrations.value
	if (regStatusFilter.value) {
		list = list.filter(r => (r.status || 'new') === regStatusFilter.value)
	}
	if (!regSearch.value) return list
	const s = regSearch.value.toLowerCase()
	return list.filter(r =>
		r.firstName.toLowerCase().includes(s) ||
		r.lastName.toLowerCase().includes(s) ||
		r.email.toLowerCase().includes(s) ||
		r.uniqueID.toLowerCase().includes(s) ||
		r.phone.includes(s)
	)
})

const filteredMessages = computed(() => {
	let list = messages.value
	if (msgStatusFilter.value) {
		list = list.filter(m => (m.status || 'unread') === msgStatusFilter.value)
	}
	if (!msgSearch.value) return list
	const s = msgSearch.value.toLowerCase()
	return list.filter(m =>
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

const updateRegistrationStatus = async (reg: Registration, status: string) => {
	try {
		await store.updateRegistrationStatus(reg, status)
	} catch (error) {
		alert('Failed to update status. Please try again.')
	}
}

const updateMessageStatus = async (msg: Message, status: string) => {
	try {
		await store.updateMessageStatus(msg, status)
	} catch (error) {
		alert('Failed to update status. Please try again.')
	}
}

const openMessage = (msg: Message) => {
	curr_msg.value = msg
	if (!msg.status || msg.status === 'unread') {
		updateMessageStatus(msg, 'read')
	}
}

const printRegistration = () => {
	if (curr_reg.value) {
		window.print()
		if (!curr_reg.value.status || curr_reg.value.status === 'new') {
			updateRegistrationStatus(curr_reg.value, 'downloaded')
		}
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
	message: '',
	created_at: new Date().toISOString()
})
</script>

<style scoped>
@media print {
	.no-print {
		display: none !important;
	}

	body * {
		visibility: hidden;
	}

	#registration,
	#registration * {
		visibility: visible;
	}

	#registration {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: auto;
		margin: 0;
		padding: 0;
		overflow: visible !important;
	}

	.modal-box {
		width: 100% !important;
		max-width: none !important;
		margin: 0 !important;
		padding: 0 !important;
		box-shadow: none !important;
		outline: none !important;
	}

	.overflow-y-auto {
		overflow: visible !important;
		max-height: none !important;
	}
}
</style>