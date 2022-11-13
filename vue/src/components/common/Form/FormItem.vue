<template>
  <fieldset class="form-item">
    <legend
      v-if="props.title"
      class="form-item__legend"
    >
      {{ props.title }}
    </legend>
    <slot />
  </fieldset>
</template>
<script setup lang="ts">

const props = defineProps<{
  title?: string;
}>();
</script>
<style scoped lang="scss">
.form-item {
  position: relative;
  margin: 8px 0;

  &__legend {
    color: #FFFFFF;
    font-size: 14px;
    font-weight: 300;
    margin-bottom: 8px;
  }
}
</style>
