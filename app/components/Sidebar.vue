<template>
	<div class="bg-black text-base-content min-h-screen w-60 p-4">
		<div class="mb-6 flex items-center px-2">
			<NuxtImg src="logo.png" class="w-full object-cover aspect-video" />
		</div>

		<ul class="menu w-full p-0">
			<li>
				<NuxtLink to="/" class="active" @click="closeDrawer">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-amber-400" fill="none"
						viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
							d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
					</svg>
					Dashboard
				</NuxtLink>
			</li>
			<li>
				<NuxtLink to="/inbox" @click="closeDrawer">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-amber-400" fill="none"
						viewBox="0 0 24 24" stroke="currentColor">
						<g fill="none">
							<path
								d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
							<path fill="currentColor"
								d="M16.382 4a2 2 0 0 1 1.71.964l.079.142l3.512 7.025a3 3 0 0 1 .308 1.109l.009.232V19a2 2 0 0 1-1.85 1.995L20 21H4a2 2 0 0 1-1.995-1.85L2 19v-5.528a3 3 0 0 1 .22-1.13l.097-.212l3.512-7.024a2 2 0 0 1-1.628-1.1L7.618 4zM8 14H4v5h16v-5h-4v.5a1.5 1.5 0 0 1-1.5 1.5h-5A1.5 1.5 0 0 1 8 14.5zm8.382-8H7.618l-3 6H8.5a1.5 1.5 0 0 1-1.493 1.356L10 13.5v.5h4v-.5a1.5 1.5 0 0 1-1.356-1.493L15.5 12h3.882z" />
						</g>
					</svg>
					Inbox
				</NuxtLink>
			</li>
			<li>
				<NuxtLink to="/receipts" @click="closeDrawer">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-amber-400" fill="none"
						viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
							d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
					</svg>
					Receipts
				</NuxtLink>
			</li>
			<li>
				<NuxtLink to="/data" @click="closeDrawer">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-amber-400" fill="none"
						viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
							d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
					</svg>
					Data
				</NuxtLink>
			</li>
		</ul>

	</div>
</template>

<script setup lang="ts">
const closeDrawer = () => {
	const drawer = document.getElementById('my-drawer') as HTMLInputElement;
	if (drawer) drawer.checked = false;
};
</script>
