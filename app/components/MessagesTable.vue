<template>
	<div class="overflow-x-auto bg-black rounded-none shadow-sm">
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
				<!-- row 1 -->
				<tr>
					<th>1</th>
					<td>Cy Ganderton</td>
					<td>Premium</td>
					<td>0123456789</td>
				</tr>
				<!-- row 2 -->
				<tr>
					<th>2</th>
					<td>Hart Hagerty</td>
					<td>Standard</td>
					<td>0123456789</td>
				</tr>
				<!-- row 3 -->
				<tr>
					<th>3</th>
					<td>Brice Swyre</td>
					<td>VIP</td>
					<td>0123456789</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script setup lang="ts">
interface Registration {
	id: number;
	name: string;
	email: string;
	avatar: string;
	destination: string;
	package: string;
	date: string;
	status: 'Confirmed' | 'Pending' | 'Cancelled';
}

const registrations: Registration[] = [
	{
		id: 1,
		name: 'Hart Hagerty',
		email: 'hart@example.com',
		avatar: 'https://img.daisyui.com/images/profile/demo/2@94.webp',
		destination: 'Santorini, Greece',
		package: 'Luxury Getaway',
		date: 'Jan 15, 2026',
		status: 'Confirmed',
	},
	{
		id: 2,
		name: 'Brice Swyre',
		email: 'brice@example.com',
		avatar: 'https://img.daisyui.com/images/profile/demo/3@94.webp',
		destination: 'Kyoto, Japan',
		package: 'Cultural Tour',
		date: 'Feb 10, 2026',
		status: 'Pending',
	},
	{
		id: 3,
		name: 'Marjy Ferencz',
		email: 'marjy@example.com',
		avatar: 'https://img.daisyui.com/images/profile/demo/4@94.webp',
		destination: 'Paris, France',
		package: 'Romance Special',
		date: 'Mar 05, 2026',
		status: 'Confirmed',
	},
	{
		id: 4,
		name: 'Yancy Tear',
		email: 'yancy@example.com',
		avatar: 'https://img.daisyui.com/images/profile/demo/5@94.webp',
		destination: 'Bali, Indonesia',
		package: 'Adventure Time',
		date: 'Apr 01, 2026',
		status: 'Cancelled',
	},
];

const getStatusClass = (status: string) => {
	switch (status) {
		case 'Confirmed': return 'badge-success text-white';
		case 'Pending': return 'badge-warning text-white';
		case 'Cancelled': return 'badge-error text-white';
		default: return 'badge-ghost';
	}
}
</script>
