<template>
  <div
    :class="activeClass"
    class="item"
    @click="emits('change', props.id)"
  >
    <span class="item__text">{{ props.name }}</span>
  </div>
</template>
<script setup lang="ts">
import {computed} from "vue";

const props = defineProps<{
  id: symbol;
  name: string;
  active: boolean;
}>();
const emits = defineEmits(['change']);

const activeClass = computed(() => props.active && 'list__item--active');
</script>
<style scoped lang="scss">
.item {
  padding: 16px 8px;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid $border-primary;
  cursor: pointer;

  &:hover, &--active {
    box-shadow: $shadow-primary-hover;
    background-color: $background-primary;
  }

  &__text {
    @include typography($t_md, $w_normal, $white);
  }
}

@media (max-width: 768px) {
  .item {
    width: 50%;
    align-items: center;

    &:first-child {
      border: 1px solid $border-primary;
    }
  }
}
</style>
