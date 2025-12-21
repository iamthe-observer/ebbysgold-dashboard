<template>
   <div class="space-y-6">
      <!-- Stats Row -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
         <StatsCard title="Total Registrations" value="679">
            <template #icon>
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                  class="inline-block w-8 h-8 stroke-amber-400">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                     d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
               </svg>
            </template>
         </StatsCard>

         <StatsCard title="Registrations Today" value="4">
            <template #icon>
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                  class="inline-block w-8 h-8 stroke-amber-400">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                     d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4">
                  </path>
               </svg>
            </template>
         </StatsCard>

         <StatsCard title="Quick Enquiries" value="5">
            <template #icon>
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                  class="inline-block w-8 h-8 stroke-amber-400">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                     d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
               </svg>
            </template>
         </StatsCard>
      </div>

      <!-- Main Content -->
      <div class="card bg-black rounded-none shadow-xl">
         <div class="card-body">
            <h2 class="card-title mb-4">Recent Registrations</h2>
            <RegistrationTable />
         </div>
      </div>
      <!-- Messages -->
      <div class="card bg-black rounded-none shadow-xl">
         <div class="card-body">
            <h2 class="card-title mb-4">Recent Messages</h2>
            <RegistrationTable />
         </div>
      </div>
   </div>
</template>
