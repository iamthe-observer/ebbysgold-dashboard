<template>
	<Teleport to="body">
		<div class="w-screen h-screen bg-black flex flex-col items-center justify-center absolute top-0 left-0 z-[99]">

			<NuxtImg src="logo.png" class="w-80 object-cover aspect-video animate-pulse" />
			<span class="uppercase font-bold text-amber-300">Loading...</span>

		</div>
	</Teleport>
</template>

<script lang="ts" setup>

</script>

<style></style>