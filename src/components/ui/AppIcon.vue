<template>
  <svg
    class="icon"
    aria-hidden="true"
  >
    <use :href="symbolId" />
  </svg>
</template>
<script setup lang="ts">
import {computed} from "vue";

const props = withDefaults(
    defineProps<{
      prefix?: string;
      name: string;
    }>(),
    {
      prefix: 'icon',
    }
);

const symbolId = computed(() => `#${props.prefix}-${props.name}`);
</script>
<style scoped lang="scss">
.icon {
  color: #fff;
  padding: 8px;
}
</style>
