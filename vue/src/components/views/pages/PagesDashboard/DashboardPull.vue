<template>
  <div class="request">
    <template v-if="props.loading">
      <the-loader />
    </template>
    <template v-else>
      <header class="request__header">
        <div class="request__information">
          <dashboard-pull-menu
            :oldest="props.oldest"
            :closed="props.closed"
            :open="props.open"
            :list="props.menuList"
            :active="props.activeItem"
            @change="onChange"
          />
        </div>
      </header>
      <main class="request__content">
        <dashboard-pull-item
          v-for="(item, index) in paginationList"
          :key="index"
          :item="item"
          :type="props.activeItem.description"
        />
      </main>
    </template>
  </div>
</template>
<script setup lang="ts">
import TheLoader from "@/components/common/Loader/TheLoader.vue";
import DashboardPullItem from "@/components/views/pages/PagesDashboard/DashboardPullItem.vue";
import DashboardPullMenu from "@/components/views/pages/PagesDashboard/DashboardPullMenu.vue";
import {computed} from "vue";

const props = defineProps<{
  list: IRepository[];
  menuList: IList;
  open: number;
  closed: number;
  oldest: number;
  activeItem: symbol;
  loading: boolean;
}>();
const emits = defineEmits(['change']);

const paginationList = computed(() => props.list.slice(0, 25));

const onChange = (id: symbol) => {
  emits('change', id);
};
</script>
<style scoped lang="scss">
.request {
  width: 100%;
}
</style>
