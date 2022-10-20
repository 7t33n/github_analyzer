<template>
  <router-layout>
    <router-view />
  </router-layout>
</template>
<script setup lang="ts">
import {defineAsyncComponent} from "vue";
import {useRoute} from 'vue-router';

const route = useRoute();

const routerLayout = defineAsyncComponent(() => import(`./components/views/layout/${route.meta.layout || 'LayoutDefault'}.vue`));
</script>
<style scoped lang="scss"></style>
