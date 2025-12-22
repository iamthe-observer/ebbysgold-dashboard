<template>
	<div class="flex flex-col lg:flex-row h-[calc(100vh-4rem)] bg-base-100">
		<!-- Configuration Panel (Left Side) -->
		<div class="w-full lg:w-1/3 bg-base-200 border-r border-base-300 overflow-y-auto p-6 hidden-on-print">
			<div class="flex justify-between items-center mb-6">
				<h2 class="text-2xl font-bold">Receipts</h2>
				<button @click="printReceipt" class="btn btn-primary btn-sm gap-2">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
						stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
							d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
					</svg>
					Print
				</button>
			</div>

			<div class="space-y-6">
				<!-- Company Info -->
				<div class="card bg-base-100 shadow-sm p-4">
					<h3 class="font-semibold mb-3 text-sm uppercase tracking-wider opacity-70">Company Details</h3>
					<div class="space-y-3">
						<input v-model="receipt.companyName" type="text" placeholder="Company Name"
							class="input input-bordered input-sm w-full" />
						<input v-model="receipt.companyAddress" type="text" placeholder="Address"
							class="input input-bordered input-sm w-full" />
						<div class="grid grid-cols-2 gap-2">
							<input v-model="receipt.companyPhone" type="text" placeholder="Phone"
								class="input input-bordered input-sm w-full" />
							<input v-model="receipt.companyEmail" type="text" placeholder="Email"
								class="input input-bordered input-sm w-full" />
						</div>
					</div>
				</div>

				<!-- Receipt Meta -->
				<div class="card bg-base-100 shadow-sm p-4">
					<h3 class="font-semibold mb-3 text-sm uppercase tracking-wider opacity-70">Receipt Details</h3>
					<div class="grid grid-cols-2 gap-3">
						<div>
							<label class="label label-text p-0 mb-1 text-xs">Date</label>
							<input v-model="receipt.date" type="date" class="input input-bordered input-sm w-full" />
						</div>
						<div>
							<label class="label label-text p-0 mb-1 text-xs">Receipt #</label>
							<input v-model="receipt.number" type="text" class="input input-bordered input-sm w-full" />
						</div>
					</div>
				</div>

				<!-- Customer Info -->
				<div class="card bg-base-100 shadow-sm p-4">
					<h3 class="font-semibold mb-3 text-sm uppercase tracking-wider opacity-70">Bill To</h3>
					<div class="space-y-3">
						<input v-model="receipt.customerName" type="text" placeholder="Customer Name"
							class="input input-bordered input-sm w-full" />
						<input v-model="receipt.customerAddress" type="text" placeholder="Customer Address"
							class="input input-bordered input-sm w-full" />
						<input v-model="receipt.customerEmail" type="text" placeholder="Customer Email/Phone"
							class="input input-bordered input-sm w-full" />
					</div>
				</div>

				<!-- Line Items -->
				<div class="card bg-base-100 shadow-sm p-4">
					<div class="flex justify-between items-center mb-3">
						<h3 class="font-semibold text-sm uppercase tracking-wider opacity-70">Items</h3>
						<button @click="addItem" class="btn btn-ghost btn-xs text-primary">+ Add Item</button>
					</div>
					<div class="space-y-3">
						<div v-for="(item, index) in receipt.items" :key="index" class="flex gap-2 items-start group">
							<div class="flex-grow space-y-2">
								<input v-model="item.description" type="text" placeholder="Description"
									class="input input-bordered input-xs w-full" />
							</div>
							<div class="w-16">
								<input v-model.number="item.qty" type="number" placeholder="Qty"
									class="input input-bordered input-xs w-full text-center" />
							</div>
							<div class="w-24">
								<input v-model.number="item.price" type="number" placeholder="Price"
									class="input input-bordered input-xs w-full text-right" />
							</div>
							<!-- Delete button only visible on hover or if there are multiple items, but let's always show it for ease -->
							<button @click="removeItem(index)" class="btn btn-ghost btn-xs text-error px-1">
								<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
									stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
										d="M6 18L18 6M6 6l12 12" />
								</svg>
							</button>
						</div>
					</div>
				</div>

				<!-- Calculations -->
				<div class="card bg-base-100 shadow-sm p-4">
					<h3 class="font-semibold mb-3 text-sm uppercase tracking-wider opacity-70">Totals</h3>
					<div class="space-y-2">
						<div class="flex items-center justify-between">
							<span class="text-sm">Tax Rate (%)</span>
							<input v-model.number="receipt.taxRate" type="number"
								class="input input-bordered input-xs w-20 text-right" />
						</div>
						<div class="flex items-center justify-between">
							<span class="text-sm">Discount</span>
							<input v-model.number="receipt.discount" type="number"
								class="input input-bordered input-xs w-24 text-right" />
						</div>
					</div>
				</div>

			</div>
			<div class="h-20"></div> <!-- Spacer -->
		</div>

		<!-- Preview Panel (Right Side) -->
		<div
			class="w-full lg:w-2/3 bg-base-300 p-8 overflow-y-auto flex justify-center items-start print-area-container">

			<!-- Receipt Paper -->
			<div id="printable-receipt"
				class="bg-white text-black w-full max-w-[21cm] min-h-[29.7cm] shadow-2xl p-12 relative flex flex-col">

				<!-- Header -->
				<div class="flex justify-between items-start mb-12">
					<div>
						<h1 class="text-4xl font-bold tracking-tight text-slate-800 mb-2">
							<NuxtImg src="/logob.png" class="w-2/3 aspect-video object-cover drop-shadow-xl"
								alt="Ebbysgold Logo" />
						</h1>
						<div class="text-slate-500 text-sm leading-relaxed">
							<p v-if="receipt.companyAddress">{{ receipt.companyAddress }}</p>
							<p v-if="receipt.companyPhone || receipt.companyEmail">
								{{ [receipt.companyPhone, receipt.companyEmail].filter(Boolean).join(' • ') }}
							</p>
						</div>
					</div>
					<div class="text-right">
						<div
							class="text-5xl font-black text-slate-100 uppercase tracking-widest absolute top-10 right-10 -z-0 pointer-events-none select-none">
							RECEIPT
						</div>
						<div class="relative z-10">
							<div class="text-sm text-slate-500 uppercase tracking-wider mb-1">Receipt Number</div>
							<div class="text-xl font-mono font-bold text-slate-800 mb-4">{{ receipt.number }}</div>

							<div class="text-sm text-slate-500 uppercase tracking-wider mb-1">Date</div>
							<div class="text-lg font-medium text-slate-800">{{ formattedDate }}</div>
						</div>
					</div>
				</div>

				<!-- Bill To -->
				<div class="mb-12 border-b-2 border-slate-100 pb-8">
					<div class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Bill To</div>
					<div class="text-lg font-bold text-slate-800 mb-1">{{ receipt.customerName || 'Guest Customer' }}
					</div>
					<div class="text-slate-600" v-if="receipt.customerAddress">{{ receipt.customerAddress }}</div>
					<div class="text-slate-600" v-if="receipt.customerEmail">{{ receipt.customerEmail }}</div>
				</div>

				<!-- Items Table -->
				<div class="flex-grow">
					<table class="w-full mb-8">
						<thead>
							<tr class="border-b-2 border-slate-800">
								<th class="text-left py-3 text-sm font-bold uppercase tracking-wider">Description</th>
								<th class="text-center py-3 text-sm font-bold uppercase tracking-wider w-24">Qty</th>
								<th class="text-right py-3 text-sm font-bold uppercase tracking-wider w-32">Price</th>
								<th class="text-right py-3 text-sm font-bold uppercase tracking-wider w-32">Total</th>
							</tr>
						</thead>
						<tbody class="text-slate-700">
							<tr v-for="(item, i) in receipt.items" :key="i" class="border-b border-slate-100">
								<td class="py-4 font-medium">{{ item.description || 'Item description' }}</td>
								<td class="py-4 text-center">{{ item.qty }}</td>
								<td class="py-4 text-right">{{ formatCurrency(item.price) }}</td>
								<td class="py-4 text-right font-bold text-slate-800">{{ formatCurrency(item.qty *
									item.price) }}</td>
							</tr>
						</tbody>
					</table>
				</div>

				<!-- Summaries -->
				<div class="flex justify-end mb-16">
					<div class="w-1/2 space-y-3">
						<div class="flex justify-between text-slate-500">
							<span>Subtotal</span>
							<span>{{ formatCurrency(subtotal) }}</span>
						</div>
						<div class="flex justify-between text-slate-500" v-if="receipt.taxRate > 0">
							<span>Tax ({{ receipt.taxRate }}%)</span>
							<span>{{ formatCurrency(taxAmount) }}</span>
						</div>
						<div class="flex justify-between text-slate-500" v-if="receipt.discount > 0">
							<span>Discount</span>
							<span class="text-red-500">- {{ formatCurrency(receipt.discount) }}</span>
						</div>
						<div
							class="flex justify-between items-center text-xl font-bold text-slate-800 pt-4 border-t-2 border-slate-800 mt-4">
							<span>Total</span>
							<span>{{ formatCurrency(total) }}</span>
						</div>
					</div>
				</div>

				<!-- Signatures -->
				<div class="grid grid-cols-2 gap-12 mb-8 mt-auto">
					<div>
						<div class="h-24 border-b-2 border-slate-300 mb-2"></div>
						<div class="text-xs uppercase font-bold tracking-widest text-slate-500">Client Signature</div>
					</div>
					<div>
						<div class="h-24 border-b-2 border-slate-300 mb-2 relative">
							<!-- Optional Placeholder for Stamp area -->
							<div
								class="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
								<span
									class="text-xs border-2 border-slate-400 p-2 rounded transform -rotate-12 uppercase tracking-widest">Stamp
									Here</span>
							</div>
						</div>
						<div class="text-xs uppercase font-bold tracking-widest text-slate-500">Authorized
							Signature</div>
					</div>
				</div>

				<!-- Footer -->
				<div class="text-center text-sm text-slate-400 mt-auto pt-12 border-t border-slate-100">
					<p>Thank you for your business!</p>
					<p class="mt-1 text-xs">If you have any questions about this receipt, please contact us.</p>
				</div>

			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { reactive, computed } from 'vue';

const formatDateForInput = (date: Date) => {
	return date.toISOString().split('T')[0];
};

const receipt = reactive({
	companyName: 'Ebbysgold Travels',
	companyAddress: '123 Business St, Gold City',
	companyPhone: '+1 (555) 123-4567',
	companyEmail: 'info@ebbysgold.com',
	date: formatDateForInput(new Date()),
	number: 'REC-' + Math.floor(100000 + Math.random() * 900000),
	customerName: '',
	customerAddress: '',
	customerEmail: '',
	items: [
		{ description: 'Consultation Service', qty: 1, price: 150 },
		{ description: 'Gold Plating Service', qty: 2, price: 75.50 },
	],
	taxRate: 10,
	discount: 0,
});

// Computed properties
const subtotal = computed(() => {
	return receipt.items.reduce((acc, item) => acc + (item.qty * item.price), 0);
});

const taxAmount = computed(() => {
	return subtotal.value * (receipt.taxRate / 100);
});

const total = computed(() => {
	return subtotal.value + taxAmount.value - receipt.discount;
});

const formattedDate = computed(() => {
	if (!receipt.date) return '';
	return new Date(receipt.date).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
});

// Helper functions
const formatCurrency = (value: number) => {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
	}).format(value);
};

const addItem = () => {
	receipt.items.push({ description: '', qty: 1, price: 0 });
};

const removeItem = (index: number) => {
	if (receipt.items.length > 1) {
		receipt.items.splice(index, 1);
	}
};

const printReceipt = () => {
	window.print();
};

useHead({
	title: 'Receipt Generator | Ebbys Gold'
})
</script>

<style>
@media print {

	/* Globally hide everything first */
	body * {
		visibility: hidden;
	}

	/* Explicitly hide layout elements that might take up space */
	.navbar,
	.drawer-side,
	.drawer-toggle,
	.hidden-on-print {
		display: none !important;
	}

	/* Reset parent containers */
	html,
	body,
	.drawer,
	.drawer-content,
	main {
		background-color: white !important;
		width: 100% !important;
		margin: 0 !important;
		padding: 0 !important;
		overflow: visible !important;
	}

	/* Make the receipt visible and positioned */
	#printable-receipt,
	#printable-receipt * {
		visibility: visible;
	}

	/* Position the receipt at the very top left */
	.print-area-container {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		margin: 0;
		padding: 0;
		background: white;
		display: block !important;
		/* Ensure it's not flex during print */
	}

	#printable-receipt {
		width: 100%;
		max-width: none;
		box-shadow: none;
		margin: 0;
		border: none;
		min-height: 100vh;
		print-color-adjust: exact;
		-webkit-print-color-adjust: exact;
	}

	@page {
		size: auto;
		margin: 0;
	}
}
</style>
```