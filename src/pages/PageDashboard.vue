<template>
  <section class="dashboard container">
    <template v-if="loading.main">
      <the-loader />
    </template>
    <template v-else>
      <aside class="dashboard__aside">
        <dashboard-menu
          :list="dashboardMenuList"
          :active="activeItem"
          @change="onChangeMenu"
        />
        <dashboard-sort
          v-if="activeItem === dashboardMenuList.contributors.id"
          :current-sort="contributorsSortType"
          @click="onSortClick"
        />
      </aside>
      <article class="dashboard__content">
        <dashboard-users
          v-if="activeItem === dashboardMenuList.contributors.id"
          :list="getFormattedContributorsList || []"
        />
        <dashboard-pull
          v-if="activeItem === dashboardMenuList.pull_requests.id"
          :list="getFormattedPullRequestList(activeRequestItem.description) || []"
          :menu-list="requestMenuList"
          :active-item="activeRequestItem"
          :open="getFormattedPullRequestList('open').length"
          :closed="getFormattedPullRequestList('closed').length"
          :oldest="getFormattedPullRequestList('oldest').length"
          :loading="loading.pulls"
          @change="onChangeRequestMenu"
        />
      </article>
    </template>
  </section>
</template>
<script setup lang="ts">
import TheLoader from "@/components/common/Loader/TheLoader.vue";
import DashboardMenu from "@/components/views/pages/PagesDashboard/DashboardMenu.vue";
import DashboardSort from "@/components/views/pages/PagesDashboard/DashboardSort.vue";
import DashboardUsers from "@/components/views/pages/PagesDashboard/DashboardUsers.vue";
import DashboardPull from "@/components/views/pages/PagesDashboard/DashboardPull.vue";

import {computed, onBeforeMount, reactive, ref} from "vue";
import {useRoute} from "vue-router";
import {useRepositoryStore} from "@/store/modules/repository";
import {dashboardMenuList, defaultQuery, requestMenuList} from "@/mocks/dashboard";
import {isDashboardQuery} from "@/types/guard/query";

const repositoryStore = useRepositoryStore();
const route = useRoute();

const activeItem = ref(dashboardMenuList.contributors.id);
const activeRequestItem = ref(requestMenuList.open.id);
const contributorsSortType = ref<'asc' | 'desc'>('desc');
const query = ref<IDashboardQuery>(defaultQuery);

const loading = reactive({
  main: false,
  pulls: false,
});

const getFormattedContributorsList = computed(() => {
  const { end, start } = query.value;
  return repositoryStore.getSortedContributors(contributorsSortType.value, end, start).slice(0, 30);
});

const onChangeMenu = (id: symbol) => activeItem.value = id;
const onChangeRequestMenu = (id: symbol) => activeRequestItem.value = id;
const onSortClick = (type: 'asc' | 'desc') => contributorsSortType.value = type;

const getFormattedPullRequestList = (type: string) => {
  const { end, start } = query.value;
  switch (type) {
    case 'closed':
      return repositoryStore.getClosedPull(end, start);
    case 'open':
      return repositoryStore.getOpenPull(end, start);
    case 'oldest':
      return repositoryStore.getOldPull(end, start);
    case 'default':
      return repositoryStore.getFilteredPulls(end, start);
  }
};
const getMainData = async ({ owner, repo }: IDashboardQuery) => {
  loading.main = true;
  await Promise.all([
    await repositoryStore.GET_REPO_INFO(owner, repo),
    await repositoryStore.GET_CONTRIBUTORS(owner, repo),
  ]);
  loading.main = false;
};
const getPullRequestData = async ({ owner, repo, branch }: IDashboardQuery) => {
  loading.pulls = true;
  await repositoryStore.GET_REPOS(owner, repo, branch);
  loading.pulls = false;
};

onBeforeMount(async () => {
  if (isDashboardQuery(route.query)) {
    query.value = route.query;
  }
  await Promise.all([
    getMainData(query.value),
    getPullRequestData(query.value),
  ]);
});
</script>
<style scoped lang="scss">
.dashboard {
  padding-top: 64px;
  display: flex;

  &__aside {
    width: 256px;
  }

  &__content {
    max-width: calc(100% - 256px);
    width: 100%;
    margin-top: -4px;
    margin-left: 32px;
    display: flex;
    flex-wrap: wrap;
  }
}

@media (max-width: 768px) {
  .dashboard {
    flex-direction: column;

    &__aside {
      width: 100%;
    }

    &__content {
      max-width: 100%;
      margin-left: 0;
      display: flex;
      justify-content: center;
    }
  }
}
</style>
