<template>
	<div class="flex flex-col h-[calc(100vh-4rem)] bg-black">


		<!-- Create Receipt Tab -->
		<div v-show="activeTab === 'create'" class="flex flex-col lg:flex-row flex-grow overflow-hidden relative">
			<!-- Mobile Toggle (Visible only on lg and below) -->
			<div class="lg:hidden flex border-b border-white/10 p-2 gap-2 bg-black z-20">
				<button @click="mobileMode = 'edit'" class="btn btn-sm flex-1 rounded-none"
					:class="mobileMode === 'edit' ? 'bg-amber-400 text-black outline-none border-none' : 'btn-ghost'">Edit
					Receipt</button>
				<button @click="mobileMode = 'preview'" class="btn btn-sm flex-1 rounded-none relative"
					:class="mobileMode === 'preview' ? 'bg-amber-400 text-black outline-none border-none' : 'btn-ghost'">
					Preview
					<span class="badge badge-xs badge-warning absolute top-1 right-1"></span>
				</button>
			</div>
			<!-- Configuration Panel (Left Side) -->
			<div class="w-full lg:w-1/3 bg-black border-r border-base-300 overflow-y-auto p-6 hidden-on-print"
				:class="{ 'hidden lg:block': mobileMode === 'preview' }">
				<div class="flex justify-between items-center mb-6">
					<div class="flex items-center gap-2">
						<button @click="activeTab = 'view'" class="btn btn-ghost btn-sm btn-square rounded-none">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
								stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
									d="M10 19l-7-7m0 0l7-7m-7 7h18" />
							</svg>
						</button>
						<h2 class="text-2xl font-bold">New Receipt</h2>
					</div>
					<div v-if="isStaff" class="flex gap-2">
						<button @click="saveAndPrint"
							class="btn bg-amber-400 hover:bg-amber-500 text-black btn-sm gap-2 rounded-none">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
								stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
									d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
							</svg>
							Save & Print
						</button>
					</div>
				</div>

				<div class="space-y-6">
					<!-- Company Info -->
					<div class="card bg-neutral shadow-sm p-4 rounded-none">
						<h3 class="font-semibold mb-3 text-sm uppercase tracking-wider opacity-70">Company Details</h3>
						<div class="space-y-1 text-sm text-gray-400">
							<p class="font-bold text-white">{{ receipt.companyName }}</p>
							<p>{{ receipt.companyAddress }}</p>
							<p>{{ receipt.companyPhone }}</p>
							<p>{{ receipt.companyEmail }}</p>
						</div>
					</div>

					<!-- Receipt Meta -->
					<div class="card bg-neutral shadow-sm p-4 rounded-none">
						<h3 class="font-semibold mb-3 text-sm uppercase tracking-wider opacity-70">Receipt Details</h3>
						<div class="mb-3">
							<label class="label label-text p-0 mb-1 text-xs">Date</label>
							<input v-model="receipt.date" type="date"
								class="input input-bordered input-sm w-full rounded-none" />
						</div>
						<div class="grid grid-cols-2 gap-3">
							<div>
								<label class="label label-text p-0 mb-1 text-xs">Receipt #</label>
								<input v-model="receipt.number" type="text" readonly
									class="input input-bordered input-sm w-full opacity-70 cursor-not-allowed rounded-none" />
							</div>
							<div>
								<label class="label label-text p-0 mb-1 text-xs">Currency</label>
								<select v-model="receipt.currency"
									class="select select-bordered select-sm w-full rounded-none">
									<option value="GHS">GHS (₵)</option>
									<option value="USD">USD ($)</option>
									<option value="EUR">EUR (€)</option>
									<option value="GBP">GBP (£)</option>
								</select>
							</div>
						</div>
					</div>

					<!-- Customer Info -->
					<div class="card bg-neutral shadow-sm p-4 rounded-none">
						<h3 class="font-semibold mb-3 text-sm uppercase tracking-wider opacity-70">Bill To</h3>
						<div class="space-y-3">
							<input v-model="receipt.customerName" type="text" placeholder="Customer Name"
								class="input input-bordered input-sm w-full rounded-none" />
						</div>
					</div>

					<!-- Line Items -->
					<div class="card bg-neutral shadow-sm p-4 rounded-none">
						<div class="flex justify-between items-center mb-3">
							<h3 class="font-semibold text-sm uppercase tracking-wider opacity-70">Items</h3>
							<button @click="addItem" class="btn btn-ghost btn-xs text-amber-400  rounded-none">+ Add
								Item</button>
						</div>
						<div class="space-y-3">
							<div v-for="(item, index) in receipt.items" :key="index"
								class="flex gap-2 items-start group">
								<div class="flex-grow space-y-2">
									<input v-model="item.description" type="text" placeholder="Description"
										class="input input-bordered input-xs w-full rounded-none" />
								</div>
								<div class="w-16">
									<input v-model.number="item.qty" type="number" placeholder="Qty"
										class="input input-bordered input-xs w-full text-center rounded-none" />
								</div>
								<div class="w-24">
									<input v-model.number="item.price" type="number" placeholder="Price"
										class="input input-bordered input-xs w-full text-right rounded-none" />
								</div>
								<button @click="removeItem(index)"
									class="btn btn-ghost btn-xs text-error px-1 rounded-none">
									<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none"
										viewBox="0 0 24 24" stroke="currentColor">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
											d="M6 18L18 6M6 6l12 12" />
									</svg>
								</button>
							</div>
						</div>
					</div>

					<!-- Calculations -->
					<div class="card bg-neutral shadow-sm p-4 rounded-none">
						<h3 class="font-semibold mb-3 text-sm uppercase tracking-wider opacity-70">Totals</h3>
						<div class="space-y-2">
							<div class="flex items-center justify-between">
								<span class="text-sm">Tax Rate (%)</span>
								<input v-model.number="receipt.taxRate" type="number"
									class="input input-bordered input-xs w-20 text-right rounded-none" />
							</div>
							<div class="flex items-center justify-between">
								<span class="text-sm">Discount</span>
								<input v-model.number="receipt.discount" type="number"
									class="input input-bordered input-xs w-24 text-right rounded-none" />
							</div>
						</div>
					</div>

					<!-- Print Settings -->
					<div class="card bg-neutral shadow-sm p-4 rounded-none">
						<h3 class="font-semibold mb-3 text-sm uppercase tracking-wider opacity-70">Print Settings</h3>
						<div class="grid grid-cols-2 gap-3">
							<div>
								<label class="label label-text p-0 mb-1 text-xs">Paper Size</label>
								<select v-model="printSettings.paperSize"
									class="select select-bordered select-sm w-full rounded-none">
									<option value="a4">A4</option>
									<option value="letter">Letter</option>
									<option value="a5">A5</option>
								</select>
							</div>
							<div>
								<label class="label label-text p-0 mb-1 text-xs">Orientation</label>
								<div class="flex bg-base-100 rounded-none p-1 border border-base-content/20">
									<button @click="printSettings.orientation = 'portrait'"
										class="flex-1 btn btn-xs rounded-none"
										:class="printSettings.orientation === 'portrait' ? 'btn-active' : 'btn-ghost'">
										<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none"
											viewBox="0 0 24 24" stroke="currentColor">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
												d="M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
										</svg>
									</button>
									<button @click="printSettings.orientation = 'landscape'"
										class="flex-1 btn btn-xs rounded-none"
										:class="printSettings.orientation === 'landscape' ? 'btn-active' : 'btn-ghost'">
										<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none"
											viewBox="0 0 24 24" stroke="currentColor">
											<!-- Landscape icon -->
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
												d="M19 7H5a2 2 0 00-2 2v6a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2z" />
										</svg>
									</button>
								</div>
							</div>
						</div>
					</div>

				</div>
				<div class="h-20"></div> <!-- Spacer -->
			</div>

			<!-- Preview Panel (Right Side) -->
			<div class="w-full lg:w-2/3 bg-black p-4 md:p-8 overflow-y-auto flex justify-center items-start print-area-container"
				:class="{ 'hidden lg:flex': mobileMode === 'edit' }">
				<!-- Receipt Paper -->
				<div id="receipt-preview-container" class="transform-gpu transition-all duration-300 origin-top"
					:style="previewScaleStyle">
					<div id="printable-receipt"
						class="bg-white text-black shadow-2xl p-6 md:p-12 relative flex flex-col transition-all duration-300"
						:class="{ 'landscape-mode': printSettings.orientation === 'landscape' }"
						:style="receiptDimensions">

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
									<div class="text-sm text-slate-500 uppercase tracking-wider mb-1">Receipt Number
									</div>
									<div class="text-xl font-mono font-bold text-slate-800 mb-4">{{ receipt.number }}
									</div>

									<div class="text-sm text-slate-500 uppercase tracking-wider mb-1">Date</div>
									<div class="text-lg font-medium text-slate-800">{{ formattedDate }}</div>
								</div>
							</div>
						</div>

						<!-- Bill To -->
						<div class="mb-12 border-b-2 border-slate-100 pb-8">
							<div class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Bill To</div>
							<div class="text-lg font-bold text-slate-800 mb-1">{{
								receipt.customerName || 'Guest Customer'
							}}
							</div>
						</div>

						<!-- Items Table -->
						<div class="flex-grow">
							<table class="w-full mb-8">
								<thead>
									<tr class="border-b-2 border-slate-800">
										<th class="text-left py-3 text-sm font-bold uppercase tracking-wider">
											Description
										</th>
										<th class="text-center py-3 text-sm font-bold uppercase tracking-wider w-24">Qty
										</th>
										<th class="text-right py-3 text-sm font-bold uppercase tracking-wider w-32">
											Price
										</th>
										<th class="text-right py-3 text-sm font-bold uppercase tracking-wider w-32">
											Total
										</th>
									</tr>
								</thead>
								<tbody class="text-slate-700">
									<tr v-for="(item, i) in receipt.items" :key="i" class="border-b border-slate-100">
										<td class="py-4 font-medium">{{ item.description || 'Item description' }}</td>
										<td class="py-4 text-center">{{ item.qty }}</td>
										<td class="py-4 text-right">{{ formatCurrency(item.price, receipt.currency) }}
										</td>
										<td class="py-4 text-right font-bold text-slate-800">{{ formatCurrency(item.qty
											*
											item.price, receipt.currency) }}</td>
									</tr>
								</tbody>
							</table>
						</div>

						<!-- Summaries -->
						<div class="flex justify-end mb-16">
							<div class="w-1/2 space-y-3">
								<div class="flex justify-between text-slate-500">
									<span>Subtotal</span>
									<span>{{ formatCurrency(subtotal, receipt.currency) }}</span>
								</div>
								<div class="flex justify-between text-slate-500"
									v-if="receipt.taxRate && receipt.taxRate > 0">
									<span>Tax ({{ receipt.taxRate }}%)</span>
									<span>{{ formatCurrency(taxAmount, receipt.currency) }}</span>
								</div>
								<div class="flex justify-between text-slate-500" v-if="receipt.discount > 0">
									<span>Discount</span>
									<span class="text-red-500">- {{ formatCurrency(receipt.discount, receipt.currency)
									}}</span>
								</div>
								<div
									class="flex justify-between items-center text-xl font-bold text-slate-800 pt-4 border-t-2 border-slate-800 mt-4">
									<span>Total</span>
									<span>{{ formatCurrency(total, receipt.currency) }}</span>
								</div>
							</div>
						</div>

						<!-- Signatures -->
						<div class="flex justify-end w-full gap-12 mb-8 mt-auto">
							<!-- <div>
							<div class="h-24 border-b-2 border-slate-300 mb-2"></div>
							<div class="text-xs uppercase font-bold tracking-widest text-slate-500">Client Signature
							</div>
						</div> -->
							<div class="w-1/2">
								<div class="h-24 border-b-2 border-slate-300 mb-2 relative">
									<!-- Optional Placeholder for Stamp area -->
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
		</div>

		<!-- View Receipts Tab -->
		<div v-show="activeTab === 'view'" class="flex-grow p-8 overflow-y-auto">
			<div class="container mx-auto max-w-5xl">
				<div class="flex justify-between items-center mb-6">
					<h2 class="text-2xl font-bold">Saved Receipts [ <span class="text-amber-400">{{
						savedReceipts.length
					}}</span> ]</h2>
					<button @click="createNew"
						class="btn bg-amber-400 text-black hover:bg-amber-500 btn-sm rounded-none">+ Create
						New</button>
				</div>

				<div class="mb-6" v-if="savedReceipts.length > 0">
					<input v-model="receiptSearch" type="text"
						placeholder="Search saved receipts by number or customer name..."
						class="input input-bordered w-full max-w-md rounded-none bg-neutral/20 border-white/10" />
				</div>

				<div v-if="savedReceipts.length === 0"
					class="text-center text-gray-500 mt-10 p-10 bg-base-200 rounded-none">
					<p class="text-lg">No saved receipts found</p>
					<button @click="createNew" class="btn btn-link rounded-none">Create your first
						receipt</button>
				</div>

				<div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					<!-- <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> -->

					<!-- <div class="hover-3d" v-for="(saved, index) in savedReceipts" :key="index"> -->
					<div class="hover-3d cursor-pointer" v-for="(saved, index) in filteredSavedReceipts" :key="index"
						@click="openReceiptModal(saved)">
						<!-- content -->
						<figure class="max-w-100 rounded-none">

							<div class="card bg-[radial-gradient(circle_at_bottom_left,#ffffff04_35%,transparent_36%),radial-gradient(circle_at_top_right,#ffffff04_35%,transparent_36%)] bg-size-[4.95em_4.95em] shadow-lg hover:shadow-xl transition-shadow rounded-none relative overflow-hidden"
								@mousemove="handleCardMouseMove($event)">
								<div class="card-body p-5">
									<div class="flex justify-between items-start mb-2">
										<h3 class="card-title text-base">{{ saved.number }}</h3>
										<div class="badge badge-outline rounded-none">{{ new
											Date(saved.date).toLocaleDateString() }}</div>
									</div>
									<p class="text-sm text-gray-500 font-medium truncate">
										{{
											saved.customerName || 'No Name'
										}}
									</p>
									<div class="flex justify-between items-center mt-4">
										<span class="font-bold text-lg text-amber-400">{{
											formatCurrency(calculateTotal(saved), saved.currency)
										}}</span>
									</div>
								</div>
							</div>

						</figure>
						<!-- 8 empty divs needed for the 3D effect -->
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
					</div>

				</div>
			</div>
		</div>

		<!-- Receipt Modal -->
		<dialog id="receipt_modal" class="modal">
			<div class="modal-box w-11/12 max-w-5xl bg-white text-black p-0 rounded-none overflow-hidden"
				v-if="selectedReceipt">
				<div class="overflow-y-auto max-h-[80vh] p-12"> <!-- Scrollable content area -->
					<form method="dialog">
						<button class="btn btn-sm btn-circle bg-black absolute right-2 top-2 text-white z-50">✕</button>
					</form>

					<!-- Receipt Layout (Reuse) -->
					<div class="w-full relative flex flex-col">

						<!-- Header -->
						<div class="flex justify-between items-start mb-12">
							<div>
								<h1 class="text-4xl font-bold tracking-tight text-slate-800 mb-2">
									<NuxtImg src="/logob.png" class="w-2/3 aspect-video object-cover drop-shadow-xl"
										alt="Ebbysgold Logo" />
								</h1>
								<div class="text-slate-500 text-sm leading-relaxed">
									<p v-if="selectedReceipt.companyAddress">{{ selectedReceipt.companyAddress }}
									</p>
									<p v-if="selectedReceipt.companyPhone || selectedReceipt.companyEmail">
										{{ [selectedReceipt.companyPhone,
										selectedReceipt.companyEmail].filter(Boolean).join(' • ')
										}}
									</p>
								</div>
							</div>
							<div class="text-right">
								<div
									class="text-5xl font-black text-slate-100 uppercase tracking-widest absolute top-10 right-10 -z-0 pointer-events-none select-none">
									RECEIPT
								</div>
								<div class="relative z-10">
									<div class="text-sm text-slate-500 uppercase tracking-wider mb-1">Receipt Number
									</div>
									<div class="text-xl font-mono font-bold text-slate-800 mb-4">{{
										selectedReceipt.number }}</div>

									<div class="text-sm text-slate-500 uppercase tracking-wider mb-1">Date</div>
									<div class="text-lg font-medium text-slate-800">{{ new
										Date(selectedReceipt.date).toLocaleDateString('en-US', {
											year: 'numeric',
											month: 'long',
											day: 'numeric'
										}) }}</div>
								</div>
							</div>
						</div>

						<!-- Bill To -->
						<div class="mb-12 border-b-2 border-slate-100 pb-8">
							<div class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Bill To
							</div>
							<div class="text-lg font-bold text-slate-800 mb-1">
								{{
									selectedReceipt.customerName || 'Guest Customer'
								}}
							</div>
						</div>

						<!-- Items Table -->
						<div class="flex-grow">
							<table class="w-full mb-8">
								<thead>
									<tr class="border-b-2 border-slate-800">
										<th class="text-left py-3 text-sm font-bold uppercase tracking-wider">
											Description
										</th>
										<th class="text-center py-3 text-sm font-bold uppercase tracking-wider w-24">
											Qty
										</th>
										<th class="text-right py-3 text-sm font-bold uppercase tracking-wider w-54">
											Price
										</th>
										<th class="text-right py-3 text-sm font-bold uppercase tracking-wider w-54">
											Total
										</th>
									</tr>
								</thead>
								<tbody class="text-slate-700">
									<tr v-for="(item, i) in selectedReceipt.items" :key="i"
										class="border-b border-slate-100">
										<td class="py-4 font-medium">{{ item.description || 'Item description' }}
										</td>
										<td class="py-4 text-center">{{ item.qty }}</td>
										<td class="py-4 text-right">{{ formatCurrency(item.price,
											selectedReceipt.currency) }}</td>
										<td class="py-4 text-right font-bold text-slate-800">{{
											formatCurrency(item.qty
												*
												item.price, selectedReceipt.currency) }}</td>
									</tr>
								</tbody>
							</table>
						</div>

						<!-- Summaries -->
						<div class="flex justify-end mb-16">
							<div class="w-full">
								<div class="flex justify-end">
									<div class="w-1/2 space-y-3">
										<div class="flex justify-between text-slate-500">
											<span>Subtotal</span>
											<span>{{ formatCurrency(calculateSubtotal(selectedReceipt),
												selectedReceipt.currency) }}</span>
										</div>
										<div class="flex justify-between text-slate-500"
											v-if="selectedReceipt.taxRate && selectedReceipt.taxRate > 0">
											<span>Tax ({{ selectedReceipt.taxRate }}%)</span>
											<span>{{ formatCurrency(calculateTax(selectedReceipt),
												selectedReceipt.currency) }}</span>
										</div>
										<div class="flex justify-between text-slate-500"
											v-if="selectedReceipt.discount > 0">
											<span>Discount</span>
											<span class="text-red-500">- {{ formatCurrency(selectedReceipt.discount,
												selectedReceipt.currency)
											}}</span>
										</div>
										<div
											class="flex justify-between items-center text-xl font-bold text-slate-800 pt-4 border-t-2 border-slate-800 mt-4">
											<span>Total</span>
											<span>{{ formatCurrency(calculateTotal(selectedReceipt),
												selectedReceipt.currency) }}</span>
										</div>
									</div>
								</div>
							</div>
						</div>

						<!-- Signatures -->
						<div class="flex justify-end gap-12 mb-8 mt-auto">
							<!-- <div>
								<div class="h-24 border-b-2 border-slate-300 mb-2"></div>
								<div class="text-xs uppercase font-bold tracking-widest text-slate-500">Client Signature
								</div>
							</div> -->
							<div class="w-1/2">
								<div class="h-24 border-b-2 border-slate-300 mb-2 relative">
									<!-- Optional Placeholder for Stamp area -->
								</div>
								<div class="text-xs uppercase font-bold tracking-widest text-slate-500">Authorized
									Signature</div>
							</div>
						</div>

						<!-- Footer -->
						<div class="text-center text-sm text-slate-400 mt-auto pt-12 border-t border-slate-100">
							<p>Thank you for your business!</p>
							<p class="mt-1 text-xs">If you have any questions about this receipt, please contact us.
							</p>
						</div>

					</div>

				</div>

				<!-- FAB / Speed Dial -->
				<div class="absolute bottom-8 right-8 z-[100] hidden-on-print">
					<div class="dropdown dropdown-top dropdown-end">
						<label tabindex="0"
							class="btn bg-amber-400 btn-square rounded-none btn-lg shadow-2xl hover:scale-110 transition-transform">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-black" fill="none"
								viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"
									d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
							</svg>
						</label>
						<ul tabindex="0"
							class="dropdown-content menu p-3 shadow-2xl bg-neutral text-white rounded-none w-56 mb-4 border border-base-300">
							<li class="menu-title text-xs uppercase opacity-50 mb-1">Receipt Actions</li>
							<li v-if="isAdmin">
								<a @click="editSelectedReceipt"
									class="rounded-none flex gap-3 items-center py-3 hover:bg-amber-400 hover:text-black">
									<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
										viewBox="0 0 24 24" stroke="currentColor">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
											d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
									</svg>
									Edit Receipt
								</a>
							</li>
							<li>
								<a @click="printSelectedReceipt" class="rounded-none flex gap-3 items-center py-3">
									<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
										viewBox="0 0 24 24" stroke="currentColor">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
											d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
									</svg>
									Print Receipt
								</a>
							</li>
							<div class="divider my-1 opacity-20"></div>
							<li v-if="isAdmin">
								<a @click="deleteSelectedReceipt"
									class="rounded-none flex gap-3 items-center py-3 text-error hover:bg-error hover:text-white">
									<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
										viewBox="0 0 24 24" stroke="currentColor">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
											d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
									</svg>
									Delete Receipt
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</dialog>

		<!-- Success Modal -->
		<dialog id="success_modal" class="modal">
			<div class="modal-box rounded-none bg-base-100 text-base-content">
				<h3 class="font-bold text-lg text-success">Success!</h3>
				<p class="py-4">Receipt has been created and saved successfully.</p>
				<div class="modal-action">
					<form method="dialog">
						<button class="btn btn-primary rounded-none">Continue</button>
					</form>
				</div>
			</div>
			<form method="dialog" class="modal-backdrop">
				<button>close</button>
			</form>
		</dialog>

		<!-- Dynamic Print Styles -->
		<component :is="'style'">
			@page {
			size: {{ printSettings.paperSize }} {{ printSettings.orientation }};
			margin: 0;
			}
			@media print {
			body {
			-webkit-print-color-adjust: exact;
			print-color-adjust: exact;
			}
			#printable-receipt {
			width: 100% !important;
			height: 100% !important;
			box-shadow: none !important;
			margin: 0 !important;
			page-break-after: always;
			}
			.hidden-on-print {
			display: none !important;
			}
			.print-area-container {
			padding: 0 !important;
			margin: 0 !important;
			overflow: visible !important;
			display: block !important;
			}
			/* Hide everything else */
			body > *:not(#__nuxt) {
			display: none;
			}
			}
		</component>
	</div>
</template>

<script lang="ts" setup>
import { reactive, computed, ref, onMounted, watch } from 'vue';
import type { Receipt } from "~/interfaces/index";
import { storeToRefs } from 'pinia';

const { $supabase } = useNuxtApp();
const store = useAppStore();
const { receipts: savedReceipts, isAdmin, isStaff } = storeToRefs(store);

const formatDateForInput = (date: Date) => {
	return date.toISOString().split('T')[0];
};

const activeTab = ref('view');
const mobileMode = ref<'edit' | 'preview'>('edit');
const selectedReceipt = ref<Receipt>();
const receiptSearch = ref('');

const filteredSavedReceipts = computed(() => {
	if (!receiptSearch.value) return savedReceipts.value;
	const s = receiptSearch.value.toLowerCase();
	return savedReceipts.value.filter(r =>
		(r.number && r.number.toLowerCase().includes(s)) ||
		(r.customerName && r.customerName.toLowerCase().includes(s)) ||
		(r.date && new Date(r.date).toLocaleDateString().includes(s))
	);
});

const openReceiptModal = (receiptData: any) => {
	selectedReceipt.value = receiptData;
	// Show the modal using DaisyUI method (HTMLDialogElement)
	const modal = document.getElementById('receipt_modal') as HTMLDialogElement;
	if (modal) {
		modal.showModal();
		// Smooth scroll modal content to top
		const scrollArea = modal.querySelector('.overflow-y-auto');
		if (scrollArea) {
			scrollArea.scrollTo({ top: 0, behavior: 'smooth' });
		}
	}
};

const closeReceiptModal = () => {
	const modal = document.getElementById('receipt_modal') as HTMLDialogElement;
	if (modal) modal.close();
};

const editSelectedReceipt = () => {
	if (selectedReceipt.value) {
		loadReceipt(selectedReceipt.value);
		closeReceiptModal();
	}
};

const deleteSelectedReceipt = async () => {
	if (selectedReceipt.value && selectedReceipt.value.id) {
		if (confirm('Are you sure you want to delete this receipt?')) {
			try {
				const { error } = await $supabase
					.from('receipts-egtravels')
					.delete()
					.eq('id', selectedReceipt.value.id);

				if (error) throw error;

				await store.getReceipts();
				closeReceiptModal();
			} catch (error) {
				console.error('Error deleting receipt:', error);
				alert('Failed to delete receipt.');
			}
		}
	}
};

const printSelectedReceipt = () => {
	if (selectedReceipt.value) {
		// Load into the active receipt state for printing
		Object.assign(receipt, JSON.parse(JSON.stringify(selectedReceipt.value)));
		activeTab.value = 'create'; // Ensure printable area is rendered
		closeReceiptModal(); // Close modal to allow print view to take over if needed, or just print
		setTimeout(() => {
			window.print();
		}, 300);
	}
};

// Default receipt state
const createDefaultReceipt = () => {
	let nextNum = 1;
	if (savedReceipts.value.length > 0) {
		const nums = savedReceipts.value.map(r => {
			const m = r.number && typeof r.number === 'string' ? r.number.match(/#(\d+)/) : null;
			return m ? parseInt(m[1]!) : 0;
		});
		const max = Math.max(...nums, 0);
		nextNum = max + 1;
	}

	return {
		id: undefined,
		created_at: undefined,
		companyName: 'Ebbysgold Travels',
		companyAddress: 'Plot 158, Spintex Road, Accra',
		companyPhone: '+233 53 780 4885',
		companyEmail: 'ebbysgold@gmail.com',
		date: formatDateForInput(new Date()),
		number: '#' + nextNum.toString().padStart(7, '0'),
		customerName: '',
		items: [
			{ description: '', qty: 1, price: 0 },
		],
		taxRate: 0,
		discount: 0,
		currency: 'GHS',
	};
};

const printSettings = reactive({
	paperSize: 'a4', // a4, letter, a5
	orientation: 'portrait', // portrait, landscape
});

const paperDimensions = computed(() => {
	const sizes: any = {
		a4: { w: 210, h: 297 }, // mm
		letter: { w: 215.9, h: 279.4 },
		a5: { w: 148, h: 210 }
	};
	const size = sizes[printSettings.paperSize] || sizes.a4;

	if (printSettings.orientation === 'landscape') {
		return { w: size.h, h: size.w };
	}
	return size;
});

const receiptDimensions = computed(() => {
	const { w, h } = paperDimensions.value;
	return {
		width: `${w}mm`,
		minHeight: `${h}mm`,
		// For preview, we force aspect ratio or fixed size
	};
});

// Scale preview to fit container
const previewScaleStyle = computed(() => {
	// A rough auto-scale for preview purposes based on window width could be added,
	// but for now we'll stick to a responsive scale or fixed scale.
	// This acts as a wrapper capability.
	// Dynamic scaling logic can be sophisticated, for simplicity let's rely on CSS transform
	// based on the width to fit standard viewports.

	// Let's just return a decent default scale for larger screens
	return {
		transform: 'scale(1)', // Can be made dynamic if needed
	};
});

const receipt = reactive(createDefaultReceipt());

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

// Helper functions for list view
const calculateSubtotal = (r: any) => {
	return r.items.reduce((acc: number, item: any) => acc + (item.qty * item.price), 0);
};

const calculateTax = (r: any) => {
	return calculateSubtotal(r) * (r.taxRate / 100);
};

const calculateTotal = (r: any) => {
	const sub = calculateSubtotal(r);
	const tax = calculateTax(r);
	return sub + tax - r.discount;
};

const formatCurrency = (value: number, currency = 'GHS') => {
	const currencyMap: any = {
		'GHS': 'GHS',
		'USD': 'USD',
		'EUR': 'EUR',
		'GBP': 'GBP'
	};

	// Fallback to GHS if currency is not found or null
	const currencyCode = currencyMap[currency] || 'GHS';

	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: currencyCode,
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
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



const createNew = () => {
	Object.assign(receipt, createDefaultReceipt());
	activeTab.value = 'create';
	mobileMode.value = 'edit';
};

const saveAndPrint = async () => {
	// 1. Save Logic
	const receiptData = JSON.parse(JSON.stringify(receipt)); // Deep copy

	// Remove id if it's not present to let Supabase generate it
	if (receiptData.id === undefined || receiptData.id === null || receiptData.id === '') {
		delete receiptData.id;
	}

	// Remove created_at as it's typically managed by Supabase
	delete receiptData.created_at;

	try {
		const { data, error } = await $supabase
			.from('receipts-egtravels')
			.upsert(receiptData)
			.select()
			.single();

		if (error) throw error;

		// Update local receipt state with saved data (including generated ID)
		if (data) {
			Object.assign(receipt, data);
		}

		await store.getReceipts();

		// 2. Print Logic
		setTimeout(() => {
			window.print();

			// 3. Post-Print Logic
			activeTab.value = 'view';
			const modal = document.getElementById('success_modal') as HTMLDialogElement;
			if (modal) modal.showModal();

		}, 100);
	} catch (error: any) {
		console.error('Error saving receipt:', error);
		alert('Failed to save receipt: ' + (error.message || 'Unknown error'));
	}
};

const loadReceipt = (saved: any) => {
	// Reset to defaults first to ensure structure and default values (like currency)
	Object.assign(receipt, createDefaultReceipt());
	// Then overwrite with saved data
	Object.assign(receipt, JSON.parse(JSON.stringify(saved)));
	activeTab.value = 'create';
	mobileMode.value = 'edit';
};

const deleteReceipt = async (index: number) => {
	const r = savedReceipts.value[index];
	if (r && r.id) {
		if (confirm('Are you sure you want to delete this receipt?')) {
			try {
				const { error } = await $supabase
					.from('receipts-egtravels')
					.delete()
					.eq('id', r.id);

				if (error) throw error;
				await store.getReceipts();
			} catch (error) {
				console.error('Error deleting receipt:', error);
				alert('Failed to delete receipt.');
			}
		}
	}
};

onMounted(async () => {
	await store.getReceipts();
});

useHead({
	title: 'Receipt | Ebbygold Travels'
})

const handleCardMouseMove = (e: MouseEvent) => {
	const card = e.currentTarget as HTMLElement;
	const rect = card.getBoundingClientRect();
	const x = e.clientX - rect.left;
	const y = e.clientY - rect.top;
	card.style.setProperty('--mouse-x', `${x}px`);
	card.style.setProperty('--mouse-y', `${y}px`);
};
</script>

<style scoped>
.shiny-card {
	--mouse-x: 0px;
	--mouse-y: 0px;
	position: relative;
	background: #1a1a1a;
	/* Dark background matching theme */
	border: 1px solid #333;
}

.shiny-card::before {
	content: "";
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: radial-gradient(800px circle at var(--mouse-x) var(--mouse-y),
			rgba(255, 215, 0, 0.4),
			transparent 40%);
	opacity: 0;
	transition: opacity 0.5s;
	pointer-events: none;
	z-index: 0;
}

.shiny-card:hover::before {
	opacity: 1;
}

.shiny-card::after {
	/* The border effect */
	content: "";
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	border-radius: inherit;
	padding: 1px;
	/* Border width */
	background: radial-gradient(600px circle at var(--mouse-x) var(--mouse-y),
			rgba(255, 215, 0, 0.8),
			transparent 40%);
	mask:
		linear-gradient(#fff 0 0) content-box,
		linear-gradient(#fff 0 0);
	-webkit-mask:
		linear-gradient(#fff 0 0) content-box,
		linear-gradient(#fff 0 0);
	mask-composite: exclude;
	-webkit-mask-composite: xor;
	pointer-events: none;
	z-index: 1;
}

.shiny-card .card-body {
	position: relative;
	z-index: 2;
	/* Ensure content is above the shine */
}
</style>

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