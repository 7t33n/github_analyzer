<template>
  <div
    class="sort"
    @click="onClick"
  >
    <app-icon
      class="sort__icon"
      name="sort"
    />
  </div>
</template>
<script setup lang="ts">

const props = defineProps<{
  currentSort: 'asc' | 'desc';
}>();
const emits = defineEmits(['click']);

const onClick = () => {
  if (props.currentSort === 'asc') return emits('click', 'desc');
  return emits('click', 'asc');
};
</script>
<style scoped lang="scss">
.sort {

  width: 48px;
  height: 48px;
  cursor: pointer;

  &__icon {
    padding: 8px;
    border: 1px solid #fff;
    color: #fff;
  }
}
</style>
