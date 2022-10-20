<template>
  <div class="menu">
    <dashboard-menu-item
      v-for="(item, index) in props.list"
      v-bind="item"
      :key="index"
      :active="item.id === active"
      @change="onChange"
    />
  </div>
</template>
<script setup lang="ts">
import DashboardMenuItem from "@/components/views/pages/PagesDashboard/DashboardMenuItem.vue";

const props = defineProps<{
  active: symbol;
  list: IList;
}>();
const emits = defineEmits(['change']);

const onChange = (id: symbol) => emits('change', id);
</script>
<style scoped lang="scss">
.menu {
  border: 1px solid $border-primary;
  border-radius: 8px;
}

@media (max-width: 768px) {
  .menu {
    display: flex;
    border-radius: 0;
  }
}
</style>
