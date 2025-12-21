<template>
	<main clas="flex flex-col gap-2 w-full h-full">
		<div class="tabs tabs-box bg-neutral rounded-none">
			<input type="radio" name="my_tabs_6" class="tab rounded-none"
				:aria-label="`REGISTRATIONS ${registrations.length == 0 ? '' : registrations.length}`"
				:checked="checked" />
			<div class="tab-content bg-black rounded-none border-base-300 p-6">
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
								class="hover:bg-amber-400/50 transition-all duration-300 ease-in-out cursor-pointer"
								@click="curr_reg = reg" v-for="(reg, i) in registrations" :key="i">
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

			<input type="radio" name="my_tabs_6" class="tab rounded-none" aria-label="MESSAGES" />
			<div class="tab-content rounded-none bg-black border-base-300 p-6">
				<section class="">
					<table class="table">
						<!-- head -->
						<thead>
							<tr>
								<th>#</th>
								<th>Name</th>
								<th>Email</th>
								<th>Message</th>
							</tr>
						</thead>
						<tbody>
							<tr class="hover:bg-amber-400/50 transition-all duration-300 ease-in-out cursor-pointer"
								v-for="(msg, i) in messages" onclick="message1.showModal()" @click="curr_msg = msg">
								<th class="text-white/20">{{ i }}</th>
								<td>{{ msg.fullName }}</td>
								<td>{{ msg.email }}</td>
								<td>{{ msg.message }}</td>
							</tr>
						</tbody>
					</table>

					<dialog id="message1" class="modal">
						<div class="modal-box bg-black/5 rounded-none outline outline-amber-400 backdrop-blur-lg">
							<h3 class="text-lg font-bold flex justify-between">{{ curr_msg!.fullName }}</h3>
							<p class="py-4 flex flex-col">
								<span class="font-bold">Phone: <span class="font-normal pl-3">{{ curr_msg!.email
								}}</span></span>
								<span class="font-bold">Message: <span class="font-normal pl-3">{{ curr_msg!.message
								}}</span></span>
							</p>
						</div>
					</dialog>
				</section>
			</div>

			<input type="radio" name="my_tabs_6" class="tab rounded-none" aria-label="APPOINTMENTS" />
			<div class="tab-content rounded-none bg-black border-base-300 p-6">
				<section class="">
					<table class="table">
						<!-- head -->
						<thead>
							<tr>
								<th>#</th>
								<th>Name</th>
								<th>Package Type</th>
								<th>Contact</th>
							</tr>
						</thead>
						<tbody>
							<tr class="hover:bg-amber-400/50 transition-all duration-300 ease-in-out cursor-pointer"
								v-for="i in 8">
								<th>{{ i }}</th>
								<td>Brice Swyre</td>
								<td>VIP</td>
								<td>0123456789</td>
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
import type { Registration, Message } from '~/interfaces/index'

const { registrations, messages } = storeToRefs(useAppStore())
const checked = ref(true)
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