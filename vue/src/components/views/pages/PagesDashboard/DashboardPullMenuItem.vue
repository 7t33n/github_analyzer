<template>
  <div
    class="item"
    :class="activeClass"
    @click="emits('change', props.id)"
  >
    <span class="item__text">
      {{ name }} {{ count }}
    </span>
  </div>
</template>
<script setup lang="ts">
import {computed} from "vue";

const props = defineProps<{
  id: symbol;
  name: string;
  count: string;
  active: boolean;
}>();
const emits = defineEmits(['change']);

const activeClass = computed(() => props.active && 'list__item--active');
</script>
<style scoped lang="scss">
.item {
  width: 200px;
  height: 36px;
  border-radius: 0 0 8px 8px;
  border: 1px solid $border-primary;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &__text {
    @include typography($t_sm, $w_normal, $white);
  }

  &:hover, &--active {
    box-shadow: $shadow-primary-hover;
    background-color: $background-primary;
  }
}
</style>
