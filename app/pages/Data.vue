```vue
<template>
	<div class="flex flex-col lg:flex-row h-auto lg:h-[calc(100vh-4rem)] bg-base-100 overflow-hidden">
		<!-- Sidebar Navigation -->
		<div class="w-full lg:w-64 bg-base-200 border-b lg:border-r border-base-300 flex-shrink-0 flex flex-col">
			<div class="p-4 border-b border-base-300 hidden lg:block">
				<h2 class="font-bold text-lg">Content Manager</h2>
			</div>
			<ul
				class="menu p-2 flex-grow flex-row lg:flex-col overflow-x-auto lg:overflow-y-auto w-full no-scrollbar flex-nowrap">
				<li v-for="section in sections" :key="section.id" class="flex-shrink-0">
					<a :class="{ 'active': activeSection === section.id }" @click="activeSection = section.id"
						class="whitespace-nowrap px-4 py-2">
						{{ section.label }}
					</a>
				</li>
			</ul>
			<div class="p-4 border-t border-base-300 lg:block hidden">
				<button class="btn btn-primary w-full" @click="saveData" :disabled="loading || !isAdmin">
					<span v-if="loading" class="loading loading-spinner"></span>
					{{ loading ? 'Saving...' : 'Save Changes' }}
				</button>
			</div>
		</div>

		<!-- Main Content Area -->
		<div class="flex-grow overflow-y-auto p-4 md:p-8">
			<div v-if="initialLoading" class="flex justify-center items-center h-full">
				<span class="loading loading-spinner loading-lg text-primary"></span>
			</div>

			<div v-else class="max-w-4xl mx-auto pb-32 md:pb-20">
				<h1 class="text-2xl md:text-3xl font-bold mb-6 md:mb-8 capitalize">{{ activeSectionLabel }}</h1>

				<!-- General Section -->
				<div v-if="activeSection === 'general'" class="space-y-6">
					<div class="form-control">
						<label class="label"><span class="label-text">Company Name</span></label>
						<input v-model="formData.company_name" type="text" class="input input-bordered w-full" />
					</div>
					<div class="form-control">
						<label class="label"><span class="label-text">Mission Statement</span></label>
						<textarea v-model="formData.mission" class="textarea textarea-bordered h-24"></textarea>
					</div>
				</div>

				<!-- About Us -->
				<div v-if="activeSection === 'about_us'" class="space-y-6">
					<div class="form-control">
						<label class="label"><span class="label-text">Top Content</span></label>
						<textarea v-model="formData.about_us.top" class="textarea textarea-bordered h-32"></textarea>
					</div>
					<div class="form-control">
						<label class="label"><span class="label-text">Bottom Content</span></label>
						<textarea v-model="formData.about_us.bottom" class="textarea textarea-bordered h-32"></textarea>
					</div>
				</div>

				<!-- Why Choose Us -->
				<div v-if="activeSection === 'why_choose_us'" class="space-y-6">
					<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div class="form-control">
							<label class="label"><span class="label-text">Title</span></label>
							<input v-model="formData.why_choose_us.title" type="text" class="input input-bordered" />
						</div>
						<div class="form-control">
							<label class="label"><span class="label-text">Subtitle</span></label>
							<input v-model="formData.why_choose_us.subtitle" type="text" class="input input-bordered" />
						</div>
					</div>

					<div class="divider">Reasons</div>

					<div v-for="(reason, index) in formData.why_choose_us.reasons" :key="index"
						class="card bg-base-200 border border-base-300 p-4 mb-4 relative group">
						<button v-if="isAdmin" @click="removeArrayItem(formData.why_choose_us.reasons, index)"
							class="btn btn-circle btn-xs btn-error absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">✕</button>
						<div class="form-control mb-2">
							<label class="label"><span class="label-text">Title</span></label>
							<input v-model="reason.title" type="text" class="input input-bordered input-sm" />
						</div>
						<div class="form-control">
							<label class="label"><span class="label-text">Description</span></label>
							<textarea v-model="reason.description"
								class="textarea textarea-bordered textarea-sm"></textarea>
						</div>
					</div>
					<button v-if="isAdmin" @click="addReason" class="btn btn-outline btn-sm w-full">+ Add
						Reason</button>
				</div>

				<!-- Services -->
				<div v-if="activeSection === 'services'" class="space-y-6">
					<div class="form-control">
						<label class="label"><span class="label-text">Introduction</span></label>
						<textarea v-model="formData.services.introduction"
							class="textarea textarea-bordered h-24"></textarea>
					</div>

					<div class="divider">Service List</div>

					<div v-for="(service, index) in formData.services.list" :key="index"
						class="card bg-base-200 border border-base-300 p-4 mb-6 relative">
						<div v-if="isAdmin" class="absolute top-4 right-4 z-10">
							<button @click="removeArrayItem(formData.services.list, index)"
								class="btn btn-sm btn-error">Remove</button>
						</div>

						<div class="flex flex-col md:flex-row gap-6">
							<div class="w-full md:w-1/3">
								<ImageUploader :model-value="service.src" @update:model-value="val => service.src = val"
									label="Service Image" />
							</div>
							<div class="w-full md:w-2/3 space-y-3">
								<div class="form-control">
									<label class="label"><span class="label-text">Title</span></label>
									<input v-model="service.title" type="text" class="input input-bordered input-sm" />
								</div>
								<div class="form-control">
									<label class="label"><span class="label-text">Description</span></label>
									<textarea v-model="service.description"
										class="textarea textarea-bordered textarea-sm"></textarea>
								</div>
								<div class="form-control">
									<label class="label"><span class="label-text">Detailed Text</span></label>
									<textarea v-model="service.serv_text"
										class="textarea textarea-bordered textarea-sm"></textarea>
								</div>

								<div class="form-control">
									<label class="label"><span class="label-text">Service Types (comma
											separated)</span></label>
									<!-- Simple array editor for strings -->
									<input :value="service.serv_type.join(', ')"
										@input="updateStringArray(service.serv_type, $event)" type="text"
										class="input input-bordered input-sm" />
								</div>
							</div>
						</div>
					</div>
					<button v-if="isAdmin" @click="addService" class="btn btn-outline btn-sm w-full">+ Add
						Service</button>
				</div>

				<!-- Start Journey -->
				<div v-if="activeSection === 'start_journey'" class="space-y-6">
					<div class="form-control">
						<label class="label"><span class="label-text">Title</span></label>
						<input v-model="formData.start_your_journey.title" type="text" class="input input-bordered" />
					</div>
					<div class="form-control">
						<label class="label"><span class="label-text">Content</span></label>
						<textarea v-model="formData.start_your_journey.content"
							class="textarea textarea-bordered h-32"></textarea>
					</div>
					<div class="form-control">
						<label class="label"><span class="label-text">Call to Action (Button Text)</span></label>
						<input v-model="formData.start_your_journey.call_to_action" type="text"
							class="input input-bordered" />
					</div>
				</div>

				<!-- Popular Packages -->
				<div v-if="activeSection === 'packages'" class="space-y-6">
					<div class="form-control">
						<label class="label"><span class="label-text">Introduction</span></label>
						<textarea v-model="formData.popular_travel_packages.introduction"
							class="textarea textarea-bordered h-24"></textarea>
					</div>

					<!-- FIFA Specific -->
					<div class="collapse collapse-arrow bg-base-200 border border-base-300">
						<input type="checkbox" />
						<div class="collapse-title text-xl font-medium">FIFA World Cup 2026</div>
						<div class="collapse-content space-y-4">
							<PackageEditor :package-data="formData.popular_travel_packages.packages.fifa_world_cup_2026"
								:is-fifa="true" />
						</div>
					</div>

					<!-- USA -->
					<div class="collapse collapse-arrow bg-base-200 border border-base-300">
						<input type="checkbox" />
						<div class="collapse-title text-xl font-medium">USA Package</div>
						<div class="collapse-content space-y-4">
							<PackageEditor
								:package-data="formData.popular_travel_packages.packages.united_states_of_america" />
						</div>
					</div>

					<!-- UK -->
					<div class="collapse collapse-arrow bg-base-200 border border-base-300">
						<input type="checkbox" />
						<div class="collapse-title text-xl font-medium">UK Package</div>
						<div class="collapse-content space-y-4">
							<PackageEditor :package-data="formData.popular_travel_packages.packages.united_kingdom" />
						</div>
					</div>

					<!-- Canada -->
					<div class="collapse collapse-arrow bg-base-200 border border-base-300">
						<input type="checkbox" />
						<div class="collapse-title text-xl font-medium">Canada Package</div>
						<div class="collapse-content space-y-4">
							<PackageEditor :package-data="formData.popular_travel_packages.packages.canada" />
						</div>
					</div>

					<!-- Australia -->
					<div class="collapse collapse-arrow bg-base-200 border border-base-300">
						<input type="checkbox" />
						<div class="collapse-title text-xl font-medium">Australia Package</div>
						<div class="collapse-content space-y-4">
							<PackageEditor :package-data="formData.popular_travel_packages.packages.australia" />
						</div>
					</div>

				</div>


				<!-- Top Destinations -->
				<div v-if="activeSection === 'destinations'" class="space-y-6">
					<div class="form-control">
						<label class="label"><span class="label-text">Introduction</span></label>
						<textarea v-model="formData.top_destinations.introduction"
							class="textarea textarea-bordered h-24"></textarea>
					</div>

					<div v-for="(destKey) in Object.keys(formData.top_destinations.destinations)" :key="destKey"
						class="collapse collapse-arrow bg-base-200 border border-base-300 mb-2">
						<input type="checkbox" />
						<div class="collapse-title text-xl font-medium capitalize">{{ destKey.replace(/_/g, ' ') }}
						</div>
						<div class="collapse-content space-y-4 py-4">
							<div class="form-control">
								<label class="label"><span class="label-text">Description</span></label>
								<textarea
									v-model="formData.top_destinations.destinations[destKey as keyof typeof formData.top_destinations.destinations].description"
									class="textarea textarea-bordered h-24"></textarea>
							</div>

							<div class="divider">Highlights</div>
							<div v-for="(hl, hIdx) in formData.top_destinations.destinations[destKey as keyof typeof formData.top_destinations.destinations].highlights"
								:key="hIdx"
								class="flex flex-col md:flex-row gap-2 mb-4 md:mb-2 bg-base-100 p-2 md:p-0 rounded border md:border-none border-base-300">
								<input v-model="hl.title" placeholder="Title"
									class="input input-bordered input-sm flex-1" />
								<input v-model="hl.description" placeholder="Description"
									class="input input-bordered input-sm flex-1" />
								<button v-if="isAdmin"
									@click="removeArrayItem(formData.top_destinations.destinations[destKey as keyof typeof formData.top_destinations.destinations].highlights, hIdx)"
									class="btn btn-square btn-sm btn-ghost text-error self-end">✕</button>
							</div>
							<button v-if="isAdmin"
								@click="addHighlight(formData.top_destinations.destinations[destKey as keyof typeof formData.top_destinations.destinations].highlights)"
								class="btn btn-xs btn-outline">+ Add Highlight</button>
						</div>
					</div>
				</div>


				<!-- Reviews -->
				<div v-if="activeSection === 'reviews'" class="space-y-6">
					<div class="form-control">
						<label class="label"><span class="label-text">Section Title</span></label>
						<input v-model="formData.reviews.title" type="text" class="input input-bordered" />
					</div>

					<div v-for="(review, index) in formData.reviews.list" :key="index"
						class="card bg-base-200 border border-base-300 p-4 mb-4 relative">
						<div v-if="isAdmin" class="absolute top-4 right-4">
							<button @click="removeArrayItem(formData.reviews.list, index)"
								class="btn btn-sm btn-error">Remove</button>
						</div>

						<div class="flex flex-col sm:flex-row gap-4">
							<div class="w-full sm:w-24">
								<ImageUploader :model-value="review.src" @update:model-value="val => review.src = val"
									label="Avatar" />
							</div>
							<div class="flex-grow space-y-2">
								<div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
									<input v-model="review.reviewer" placeholder="Name"
										class="input input-bordered input-sm" />
									<input v-model="review.rating" placeholder="Rating (e.g. 5.0)"
										class="input input-bordered input-sm" />
								</div>
								<textarea v-model="review.content" placeholder="Review Content"
									class="textarea textarea-bordered w-full h-24"></textarea>
							</div>
						</div>
					</div>
					<button v-if="isAdmin" @click="addReview" class="btn btn-outline btn-sm w-full">+ Add
						Review</button>
				</div>

			</div>
		</div>

		<!-- Mobile Save Button (FAB style or fixed bottom) -->
		<div v-if="isAdmin" class="lg:hidden fixed bottom-6 right-6 z-50">
			<button class="btn btn-primary shadow-2xl rounded-full px-6" @click="saveData" :disabled="loading">
				<span v-if="loading" class="loading loading-spinner"></span>
				{{ loading ? '...' : 'Save' }}
			</button>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, onMounted, defineComponent, h, type PropType } from 'vue';
import { storeToRefs } from 'pinia';
import type { CompanyData, ServiceItem, Reason, Review, PackageInclude, IncludedCategory, Highlight } from '../interfaces/index';

useHead({
	title: 'Data | Ebbygold Travels'
})

const { $supabase } = useNuxtApp();

// ==========================================
// SUB-COMPONENTS (Defined locally for usage)
// ==========================================

// 1. Image Uploader Component
const ImageUploader = defineComponent({
	props: {
		modelValue: { type: String, default: '' },
		label: { type: String, default: 'Image' }
	},
	emits: ['update:modelValue'],
	setup(props, { emit }) {
		const { $supabase } = useNuxtApp();
		const uploading = ref(false);

		const handleUpload = async (event: Event) => {
			const file = (event.target as HTMLInputElement).files?.[0];
			if (!file) return;

			uploading.value = true;
			try {
				const fileName = `website-assets/${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
				const { error: uploadError } = await $supabase.storage
					.from('website-assets')
					.upload(fileName, file);

				if (uploadError) throw uploadError;

				const { data } = $supabase.storage.from('website-assets').getPublicUrl(fileName);
				// In setup script we need to emit directly
				emit('update:modelValue', data.publicUrl);
			} catch (e: any) {
				alert('Upload failed: ' + e.message);
			} finally {
				uploading.value = false;
			}
		};

		return () => h('div', { class: 'form-control w-full' }, [
			h('label', { class: 'label' }, [h('span', { class: 'label-text' }, props.label)]),
			h('div', { class: 'flex gap-4 items-start' }, [
				props.modelValue ? h('div', { class: 'relative shrink-0' }, [
					h('img', { src: props.modelValue, class: 'w-24 h-24 object-cover rounded border border-base-300' }),
					h('button', {
						class: 'btn btn-circle btn-xs btn-error absolute -top-2 -right-2',
						onClick: () => emit('update:modelValue', '')
					}, '✕')
				]) : null,
				h('div', { class: 'flex flex-col gap-2 w-full' }, [
					h('input', {
						type: 'file',
						class: 'file-input file-input-bordered file-input-sm w-full',
						accept: 'image/*',
						onChange: handleUpload,
						disabled: uploading.value
					}),
					uploading.value ? h('span', { class: 'loading loading-spinner loading-xs' }) : null
				])
			])
		]);
	}
});

// 2. Package Editor Component
const PackageEditor = defineComponent({
	props: {
		packageData: { type: Object as PropType<any>, required: true },
		isFifa: { type: Boolean, default: false }
	},
	setup(props) {
		// String array helper
		const updateArr = (arr: string[], e: Event) => {
			const val = (e.target as HTMLInputElement).value;
			arr.splice(0, arr.length, ...val.split(',').map(s => s.trim()).filter(s => s));
		};

		const addInclude = () => {
			if (props.isFifa) {
				props.packageData.included.push({ category: '', items: [] });
			} else {
				props.packageData.packages_include.push({ src: '', category: '', items: [] });
			}
		};
		const removeInclude = (arr: any[], idx: number) => {
			arr.splice(idx, 1);
		};

		// Helper to render the includes/features list
		const renderIncludes = () => {
			const list = props.isFifa ? props.packageData.included : props.packageData.packages_include;
			if (!list) return null;

			return list.map((inc: any, idx: number) =>
				h('div', { class: 'card bg-base-200 p-2 text-sm relative border border-base-300' }, [
					h('div', { class: 'absolute top-2 right-2' }, [
						h('button', { class: 'btn btn-xs btn-error btn-circle', onClick: () => removeInclude(list, idx) }, 'x')
					]),
					h('div', { class: 'form-control mb-1' }, [
						h('label', { class: 'label label-text' }, 'Category'),
						h('input', {
							value: inc.category,
							placeholder: 'Category',
							class: 'input input-xs input-bordered w-full',
							onInput: (e: any) => inc.category = e.target.value
						})
					]),
					h('div', { class: 'form-control mb-1' }, [
						h('label', { class: 'label label-text' }, 'Items (comma separated)'),
						h('input', {
							value: inc.items.join(', '),
							placeholder: 'Items (comma separated)',
							class: 'input input-xs input-bordered w-full',
							onInput: (e: any) => updateArr(inc.items, e)
						})
					]),
					// Only show Icon uploader if NOT FIFA (generic country package)
					!props.isFifa ? h(ImageUploader, {
						modelValue: inc.src,
						'onUpdate:modelValue': (v: string) => inc.src = v,
						label: 'Icon'
					}) : null
				])
			);
		};

		return () => h('div', { class: 'space-y-4 p-4 bg-base-100 rounded border border-base-200' }, [
			h('div', { class: 'grid grid-cols-2 gap-4' }, [
				h('div', { class: 'form-control' }, [
					h('label', { class: 'label label-text' }, 'Title'),
					h('input', {
						value: props.packageData.title,
						onInput: (e: any) => props.packageData.title = e.target.value,
						class: 'input input-bordered input-sm'
					})
				]),
				h('div', { class: 'form-control' }, [
					h('label', { class: 'label label-text' }, 'Link'),
					h('input', {
						value: props.packageData.link,
						onInput: (e: any) => props.packageData.link = e.target.value,
						class: 'input input-bordered input-sm'
					})
				])
			]),
			h(ImageUploader, {
				modelValue: props.packageData.src,
				'onUpdate:modelValue': (v: string) => props.packageData.src = v
			}),
			h('div', { class: 'form-control' }, [
				h('label', { class: 'label label-text' }, 'Description'),
				h('textarea', {
					value: props.packageData.description,
					onInput: (e: any) => props.packageData.description = e.target.value,
					class: 'textarea textarea-bordered h-20'
				})
			]),

			// Subtitle logic
			!props.isFifa ? h('div', { class: 'form-control' }, [
				h('label', { class: 'label label-text' }, 'Subtitles (comma separated)'),
				h('input', {
					value: props.packageData.subtitle.join(', '),
					onInput: (e: any) => updateArr(props.packageData.subtitle, e),
					class: 'input input-bordered input-sm'
				})
			]) : h('div', { class: 'form-control' }, [
				h('label', { class: 'label label-text' }, 'Subtitle'),
				h('input', {
					value: props.packageData.subtitle,
					onInput: (e: any) => props.packageData.subtitle = e.target.value,
					class: 'input input-bordered input-sm'
				})
			]),

			// Includes Editor
			h('div', { class: 'divider text-xs' }, 'Includes / Features'),
			h('div', { class: 'space-y-2' }, [
				renderIncludes(),
				h('button', { class: 'btn btn-xs btn-outline w-full', onClick: addInclude }, '+ Add Include Group')
			])
		]);
	}
});


// ==========================================
// MAIN LOGIC
// ==========================================

// --- State ---
const store = useAppStore();
const { isAdmin } = storeToRefs(store);
const loading = ref(false);
const initialLoading = ref(true);
const activeSection = ref('general');

const sections = [
	{ id: 'general', label: 'General' },
	{ id: 'about_us', label: 'About Us' },
	{ id: 'services', label: 'Services' },
	{ id: 'why_choose_us', label: 'Why Choose Us' },
	{ id: 'start_journey', label: 'Start Journey' },
	{ id: 'packages', label: 'Packages' },
	{ id: 'destinations', label: 'Destinations' },
	{ id: 'reviews', label: 'Reviews' },
];

const activeSectionLabel = computed(() => sections.find(s => s.id === activeSection.value)?.label || '');

// Default empty state conforming to CompanyData interface
const defaultData: CompanyData = {
	company_name: '',
	mission: '',
	about_us: { top: '', bottom: '' },
	why_choose_us: { title: '', subtitle: '', reasons: [] },
	services: { introduction: '', list: [] },
	start_your_journey: { title: '', content: '', call_to_action: '' },
	popular_travel_packages: {
		introduction: '',
		packages: {
			fifa_world_cup_2026: { abreviation: '', link: '', src: '', title: '', subtitle: '', description: '', included: [], why_join: [], who_can_join: [], closing: '' },
			united_states_of_america: { abreviation: '', link: '', src: '', title: '', subtitle: [], description: '', packages_include: [] },
			united_kingdom: { abreviation: '', link: '', src: '', title: '', subtitle: [], description: '', packages_include: [] },
			canada: { abreviation: '', link: '', src: '', title: '', subtitle: [], description: '', packages_include: [] },
			australia: { abreviation: '', link: '', src: '', title: '', subtitle: [], description: '', packages_include: [] },
		}
	},
	top_destinations: {
		introduction: '',
		destinations: {
			ghana: { description: '', highlights: [] },
			united_kingdom: { description: '', highlights: [] },
			united_states_of_america: { description: '', highlights: [] },
			canada: { description: '', highlights: [] },
			australia: { description: '', highlights: [] },
			schengen_states: { description: '', highlights: [], popular_destinations: [] }
		}
	},
	reviews: { title: '', list: [] }
};

const formData = reactive<CompanyData>(JSON.parse(JSON.stringify(defaultData)));

// --- Methods ---

const fetchData = async () => {
	initialLoading.value = true;
	try {
		const { data, error } = await $supabase
			.from('company_settings')
			.select('content')
			.order('id', { ascending: true })
			.limit(1)
			.single();

		if (error && error.code !== 'PGRST116') { // Ignore 'empty result' error
			console.error('Error fetching data:', error);
		}

		if (data && data.content) {
			// Merge fetched data with default structure to ensure all keys exist
			Object.assign(formData, { ...defaultData, ...data.content });
		}
	} catch (e) {
		console.error('Unexpected error:', e);
	} finally {
		initialLoading.value = false;
	}
};

const saveData = async () => {
	loading.value = true;
	try {
		// Upsert to row with ID 1 (or create new if not exists)
		// We assume a single row configuration

		// First check if a row exists
		const { data: existing } = await $supabase.from('company_settings').select('id').limit(1);

		let error;
		if (existing && existing.length > 0) {
			const { error: updateError } = await $supabase
				.from('company_settings')
				.update({ content: formData })
				.eq('id', existing[0]!.id);
			error = updateError;
		} else {
			const { error: insertError } = await $supabase
				.from('company_settings')
				.insert({ content: formData });
			error = insertError;
		}

		if (error) throw error;
		alert('Changes saved successfully!');
	} catch (e: any) {
		console.error('Error saving data:', e);
		alert('Failed to save data: ' + e.message);
	} finally {
		loading.value = false;
	}
};

// Array Helpers
const removeArrayItem = (arr: any[], index: number) => {
	arr.splice(index, 1);
};

const addReason = () => {
	formData.why_choose_us.reasons.push({ number: formData.why_choose_us.reasons.length + 1, title: '', description: '' });
};

const addService = () => {
	formData.services.list.push({ src: '', number: formData.services.list.length + 1, title: '', description: '', serv_text: '', serv_type: [] });
};

const addReview = () => {
	formData.reviews.list.push({ src: '', rating: '5.0', number: formData.reviews.list.length + 1, reviewer: '', content: '' });
};

const addHighlight = (arr: Highlight[]) => {
	arr.push({ title: '', description: '' });
};

const updateStringArray = (arr: string[], event: Event) => {
	const val = (event.target as HTMLInputElement).value;
	// Clear array and push new values
	arr.splice(0, arr.length, ...val.split(',').map(s => s.trim()).filter(s => s));
};

onMounted(() => {
	fetchData();
});

</script>
```
