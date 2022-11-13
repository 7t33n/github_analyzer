<template>
  <button
    :class="classes"
    :type="props.defaultType"
  >
    <span
      class="app-button__text"
    >
      {{ props.title }}
    </span>
  </button>
</template>
<script setup lang="ts">
import {computed} from "vue";

const props = withDefaults(
  defineProps<{
    title: string;
    color?: 'primary';
    defaultType?: 'button' | 'submit';
  }>(),
    {
    color: 'primary',
    defaultType: 'button'
});

const classes = computed(() => `app-button app-button--${props.color}`);
</script>
<style scoped lang="scss">
.app-button {
  width: 100%;
  padding: 5px 16px;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  white-space: nowrap;
  vertical-align: middle;
  cursor: pointer;
  user-select: none;
  border-radius: 6px;
  appearance: none;
  transition: 0.4s;

  &--primary {
    background-color: $btn-primary-bg;
    color: $btn-primary-text;

    &:hover {
      background-color: $btn-primary-bg-hover;
      color: $btn-primary-text-hover;
    }
  }
}
</style>
