<template>
	<div class="login-container min-h-screen flex items-center justify-center relative overflow-hidden bg-black">
		<!-- Dynamic Gradient Overlay -->
		<div
			class="absolute inset-0 bg-gradient-radial from-amber-900/10 via-black to-black animate-pulse-slow pointer-events-none">
		</div>

		<!-- Animated Background -->
		<div class="animated-bg">
			<div v-for="n in 50" :key="n" class="particle"></div>
		</div>

		<!-- Login Card -->
		<div
			class="card w-full max-w-md bg-black/60 backdrop-blur-2xl border border-amber-400/40 p-10 shadow-[0_0_50px_rgba(245,158,11,0.1)] relative z-10">
			<div class="flex flex-col items-center mb-8">
				<div class="relative mb-6 group">
					<NuxtImg src="/logo.png" class="w-48 object-contain relative z-10 transition-transform duration-500"
						alt="Ebbysgold Logo" />
				</div>
				<h2 class="text-3xl font-black text-amber-400 tracking-[0.2em] uppercase text-center drop-shadow-lg">
					Admin Portal
				</h2>
				<div class="w-12 h-1 bg-amber-400 mt-4 mb-2 shadow-[0_0_10px_#f59e0b] animate-pulse"></div>
				<p class="text-white/50 text-[10px] uppercase tracking-[0.5em] font-bold">Secure Access Only</p>
			</div>

			<form @submit.prevent="handleLogin" class="space-y-6">
				<div class="form-control">
					<label class="label text-[10px] uppercase font-bold text-amber-400/80 p-0 mb-2 tracking-widest">
						Email Address
					</label>
					<input v-model="email" type="email" required
						class="input input-bordered w-full bg-black/50 border-amber-400/30 focus:border-amber-400 focus:bg-black transition-all duration-500 text-white placeholder:text-white/30"
						placeholder="admin@ebbysgold.com" />
				</div>

				<div class="form-control">
					<label class="label text-[10px] uppercase font-bold text-amber-400/80 p-0 mb-2 tracking-widest">
						Password
					</label>
					<input v-model="password" type="password" required
						class="input input-bordered w-full bg-black/50 border-amber-400/30 focus:border-amber-400 focus:bg-black transition-all duration-500 text-white placeholder:text-white/30"
						placeholder="••••••••" />
				</div>

				<div v-if="errorMsg"
					class="p-4 bg-red-950/40 border border-red-500/50 text-red-500 text-[10px] font-black uppercase tracking-widest text-center animate-shake">
					{{ errorMsg }}
				</div>

				<button type="submit" :disabled="loading"
					class="btn w-full bg-amber-400 hover:bg-amber-400 border-none text-black font-black uppercase tracking-[0.2em] h-14 transition-all duration-500 group shadow-[0_0_20px_rgba(245,158,11,0.3)]">
					<span v-if="loading" class="loading loading-spinner"></span>
					<span v-else class="flex items-center gap-3">
						Enter Dashboard
						<svg xmlns="http://www.w3.org/2000/svg"
							class="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none"
							viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="3"
								d="M13 7l5 5m0 0l-5 5m5-5H6" />
						</svg>
					</span>
				</button>
			</form>

			<div class="mt-12 text-center text-[9px] text-white/50 uppercase tracking-[0.4em] font-bold">
				&copy; 2024 Ebbysgold • Management
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
definePageMeta({
	layout: false
})

useHead({
	title: 'Login | Ebbygold Travels'
})

const { $supabase } = useNuxtApp()
const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMsg = ref('')

const handleLogin = async () => {
	loading.value = true
	errorMsg.value = ''

	try {
		const { error } = await $supabase.auth.signInWithPassword({
			email: email.value,
			password: password.value
		})

		if (error) throw error

		navigateTo('/')
	} catch (err: any) {
		errorMsg.value = err.message || 'Authentication failed'
	} finally {
		loading.value = false
	}
}
</script>

<style scoped>
.login-container {
	background: #000;
	background: radial-gradient(circle at center, #0a0a0a 0%, #000 100%);
}

.animated-bg {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 1;
	overflow: hidden;
	pointer-events: none;
}

.particle {
	position: absolute;
	width: 2px;
	height: 2px;
	background: #fbbf24;
	/* Amber 400 */
	border-radius: 50%;
	opacity: 0;
	animation: float-vibrant var(--duration) linear infinite;
	box-shadow: 0 0 10px rgba(251, 191, 36, 0.8), 0 0 20px rgba(251, 191, 36, 0.4);
}

@keyframes float-vibrant {
	0% {
		transform: translateY(110vh) translateX(0) scale(0);
		opacity: 0;
	}

	10% {
		opacity: var(--opacity);
	}

	90% {
		opacity: var(--opacity);
	}

	100% {
		transform: translateY(-10vh) translateX(var(--drift)) scale(var(--scale));
		opacity: 0;
	}
}

@keyframes pulse-slow {

	0%,
	100% {
		opacity: 0.2;
	}

	50% {
		opacity: 0.5;
	}
}

.animate-pulse-slow {
	animation: pulse-slow 8s ease-in-out infinite;
}

@keyframes shake {

	0%,
	100% {
		transform: translateX(0);
	}

	25% {
		transform: translateX(-5px);
	}

	75% {
		transform: translateX(5px);
	}
}

.animate-shake {
	animation: shake 0.4s ease-in-out;
}

/* Procedural styling for particles */
.particle:nth-child(5n+1) {
	--scale: 1.5;
	--duration: 12s;
	--opacity: 0.7;
	--drift: 40px;
}

.particle:nth-child(5n+2) {
	--scale: 2.5;
	--duration: 18s;
	--opacity: 0.3;
	--drift: -60px;
}

.particle:nth-child(5n+3) {
	--scale: 1.0;
	--duration: 10s;
	--opacity: 0.8;
	--drift: 20px;
}

.particle:nth-child(5n+4) {
	--scale: 3.0;
	--duration: 25s;
	--opacity: 0.2;
	--drift: -30px;
}

.particle:nth-child(5n+5) {
	--scale: 2.0;
	--duration: 15s;
	--opacity: 0.5;
	--drift: 80px;
}

/* Scatter across screen with negative delays for seamless start */
.particle:nth-child(1) {
	left: 2%;
	animation-delay: -2s;
}

.particle:nth-child(2) {
	left: 5%;
	animation-delay: -5s;
}

.particle:nth-child(3) {
	left: 8%;
	animation-delay: -8s;
}

.particle:nth-child(4) {
	left: 12%;
	animation-delay: -1s;
}

.particle:nth-child(5) {
	left: 15%;
	animation-delay: -6s;
}

.particle:nth-child(6) {
	left: 18%;
	animation-delay: -3s;
}

.particle:nth-child(7) {
	left: 22%;
	animation-delay: -12s;
}

.particle:nth-child(8) {
	left: 25%;
	animation-delay: -17s;
}

.particle:nth-child(9) {
	left: 28%;
	animation-delay: -2s;
}

.particle:nth-child(10) {
	left: 32%;
	animation-delay: -10s;
}

.particle:nth-child(11) {
	left: 35%;
	animation-delay: -4s;
}

.particle:nth-child(12) {
	left: 38%;
	animation-delay: -9s;
}

.particle:nth-child(13) {
	left: 42%;
	animation-delay: -15s;
}

.particle:nth-child(14) {
	left: 45%;
	animation-delay: -13s;
}

.particle:nth-child(15) {
	left: 48%;
	animation-delay: -5s;
}

.particle:nth-child(16) {
	left: 52%;
	animation-delay: -1s;
}

.particle:nth-child(17) {
	left: 55%;
	animation-delay: -7s;
}

.particle:nth-child(18) {
	left: 58%;
	animation-delay: -12s;
}

.particle:nth-child(19) {
	left: 62%;
	animation-delay: -6s;
}

.particle:nth-child(20) {
	left: 65%;
	animation-delay: -4s;
}

.particle:nth-child(21) {
	left: 68%;
	animation-delay: -11s;
}

.particle:nth-child(22) {
	left: 72%;
	animation-delay: -2s;
}

.particle:nth-child(23) {
	left: 75%;
	animation-delay: -14s;
}

.particle:nth-child(24) {
	left: 78%;
	animation-delay: -1.5s;
}

.particle:nth-child(25) {
	left: 82%;
	animation-delay: -16s;
}

.particle:nth-child(26) {
	left: 85%;
	animation-delay: -3.5s;
}

.particle:nth-child(27) {
	left: 88%;
	animation-delay: -15.5s;
}

.particle:nth-child(28) {
	left: 92%;
	animation-delay: -7.5s;
}

.particle:nth-child(29) {
	left: 95%;
	animation-delay: -12s;
}

.particle:nth-child(30) {
	left: 98%;
	animation-delay: -0.5s;
}

.particle:nth-child(31) {
	left: 1%;
	animation-delay: -8.5s;
}

.particle:nth-child(32) {
	left: 4%;
	animation-delay: -14.5s;
}

.particle:nth-child(33) {
	left: 7%;
	animation-delay: -19s;
}

.particle:nth-child(34) {
	left: 10%;
	animation-delay: -3.5s;
}

.particle:nth-child(35) {
	left: 13%;
	animation-delay: -5.5s;
}

.particle:nth-child(36) {
	left: 17%;
	animation-delay: -11.5s;
}

.particle:nth-child(37) {
	left: 21%;
	animation-delay: -7.5s;
}

.particle:nth-child(38) {
	left: 24%;
	animation-delay: -12.5s;
}

.particle:nth-child(39) {
	left: 27%;
	animation-delay: -16s;
}

.particle:nth-child(40) {
	left: 31%;
	animation-delay: -4.5s;
}

.particle:nth-child(41) {
	left: 34%;
	animation-delay: -10.2s;
}

.particle:nth-child(42) {
	left: 37%;
	animation-delay: -2.2s;
}

.particle:nth-child(43) {
	left: 41%;
	animation-delay: -14.2s;
}

.particle:nth-child(44) {
	left: 44%;
	animation-delay: -1.2s;
}

.particle:nth-child(45) {
	left: 47%;
	animation-delay: -16.2s;
}

.particle:nth-child(46) {
	left: 51%;
	animation-delay: -3.2s;
}

.particle:nth-child(47) {
	left: 54%;
	animation-delay: -15.2s;
}

.particle:nth-child(48) {
	left: 57%;
	animation-delay: -17.2s;
}

.particle:nth-child(49) {
	left: 61%;
	animation-delay: -2.2s;
}

.particle:nth-child(50) {
	left: 64%;
	animation-delay: -10.2s;
}

.login-container::after {
	content: '';
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.8) 100%);
	z-index: 2;
	pointer-events: none;
}
</style>
