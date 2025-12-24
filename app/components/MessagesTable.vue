<template>
	<div class="overflow-x-auto bg-black rounded-none shadow-sm">
		<section class="">
			<table class="table">
				<!-- head -->
				<thead>
					<tr>
						<th>#</th>
						<th>Name</th>
						<th class="hidden sm:table-cell">Email</th>
						<th>Message</th>
					</tr>
				</thead>
				<tbody>
					<tr onclick="message.showModal()"
						class="hover:bg-amber-400/50 transition-all duration-300 ease-in-out cursor-pointer"
						@click="curr_msg = reg" v-for="(reg, i) in recent_msg" :key="i">
						<th class="text-white/20">{{ i + 1 }}</th>
						<td>{{ reg.fullName }}</td>
						<td class="hidden sm:table-cell">{{ reg.email }}</td>
						<td class="truncate">{{ reg.message }}</td>
					</tr>
				</tbody>

				<!-- Modal display -->
			</table>

			<dialog id="message" class="modal">
				<div class="modal-box bg-black/5 rounded-none outline outline-amber-400 backdrop-blur-lg">
					<h3 class="text-lg font-bold flex justify-between">{{ curr_msg!.fullName }}</h3>
					<p class="py-4 flex flex-col">
						<span class="font-bold">Email: <span class="font-normal pl-3">{{ curr_msg!.email
						}}</span></span>
						<span class="font-bold">Message: <span class="font-normal pl-3">{{ curr_msg!.message
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
import type { Message } from '~/interfaces/index'

const { messages } = storeToRefs(useAppStore())
const recent_msg = computed(() => messages.value.slice(0, 3))
const curr_msg = ref<Message | null>({
	fullName: '',
	email: '',
	message: ''
})
</script>
