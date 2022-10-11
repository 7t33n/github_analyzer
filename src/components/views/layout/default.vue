<template>
  <div>
    <header-component />
    <main>
      <slot />
    </main>
  </div>
</template>
<script setup lang="ts">
import HeaderComponent from '@/components/common/Header/index.vue';
</script>
