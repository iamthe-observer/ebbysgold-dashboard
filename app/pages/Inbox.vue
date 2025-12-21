<template>
	<main clas="flex flex-col gap-2 w-full h-full">
		<div class="tabs tabs-box bg-neutral">
			<input type="radio" name="my_tabs_6" class="tab" aria-label="REGISTRATION" :checked="checked" />
			<div class="tab-content bg-black border-base-300 p-6">Tab
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
							<tr v-for="i in 120">
								<th>{{ i }}</th>
								<td>Brice Swyre</td>
								<td>Regualr</td>
								<td>0123456789</td>
							</tr>
						</tbody>
					</table>
				</section>
			</div>

			<input type="radio" name="my_tabs_6" class="tab" aria-label="MESSAGES" />
			<div class="tab-content bg-black border-base-300 p-6">Tab
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
							<tr v-for="i in 8">
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
const checked = ref(true)
</script>

<style scoped></style>