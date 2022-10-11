<template>
  <component :is="layout">
    <router-view />
  </component>
</template>
<script setup lang="ts">
import { useRoute } from "vue-router";
import { shallowRef } from "vue";

const route = useRoute();
const layout = shallowRef('');

import(`@/components/views/layout/${route.meta.layout || 'default'}.vue`)
  .then(val => layout.value = val.default);
</script>
<style scoped lang="scss">
</style>
