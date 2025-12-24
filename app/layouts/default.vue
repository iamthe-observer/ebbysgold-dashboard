<template>
  <div class="drawer h-screen bg-neutral lg:drawer-open">
    <input id="my-drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex flex-col bg-neutral relative">
      <!-- Navbar -->
      <TopNav />
      <!-- Page Content -->
      <main class="flex-1 p-4 md:p-6 bg-neutral">
        <slot />
      </main>
    </div>
    <div class="drawer-side z-20">
      <label for="my-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
      <Sidebar />
    </div>
  </div>
</template>
