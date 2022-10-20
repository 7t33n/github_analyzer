<template>
  <div class="list">
    <dashboard-pull-menu-item
      v-for="(item, index) in props.list"
      v-bind="item"
      :key="index"
      :active="item.id === props.active"
      :count="getCount(item.id)"
      @change="onChange"
    />
  </div>
</template>
<script setup lang="ts">
import DashboardPullMenuItem from "@/components/views/pages/PagesDashboard/DashboardPullMenuItem.vue";

const props = defineProps<{
  list: IList;
  active: symbol;
  open: number,
  closed: number,
  oldest: number,
}>();
const emits = defineEmits(['change']);

const getCount = (id: symbol) => {
  switch(id.description) {
    case 'open':
      return `(${props.open})`;
    case 'closed':
      return `(${props.closed})`;
    case 'oldest':
      return `(${props.oldest})`;
    default:
      return '';
  }
}
const onChange = (id: symbol) => {
  emits('change', id);
}
</script>
<style scoped lang="scss">
.list {
  display: flex;
}
</style>
