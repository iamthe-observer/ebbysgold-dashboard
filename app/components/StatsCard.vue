<template>
  <div
    class="stats shadow bg-black rounded-none w-full hover:shadow-amber-400 hover:shadow-[0_5px_20.2px_rgba(0,0,0,0.8)] hover:scale-105 transition-all duration-300 ease-out">
    <div class="stat">
      <div class="stat-figure text-secondary">
        <slot name="icon"></slot>
      </div>
      <div class="stat-title">{{ title }}</div>
      <div class="stat-value">{{ value }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: String,
  value: String,
})
</script>
