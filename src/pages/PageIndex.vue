<template>
  <div class="index">
    <form
      class="index__form"
      @submit.prevent="onSubmit"
    >
      <form-item
        title="Enter url"
      >
        <app-input
          v-model="formData.url"
          type="select"
          :datalist="repositoryStore.getReposName"
          datalist-id="repoList"
          @blur="onUrlBlur"
          @input="onUrlInput"
        />
      </form-item>
      <form-item
        title="Analysis start date"
      >
        <app-input
          v-model="formData.startDate"
          mask="##.##.####"
          placeholder="MM.DD.YYYY"
          type="date"
        />
      </form-item>
      <form-item
        title="Analysis end date"
      >
        <app-input
          v-model="formData.endDate"
          mask="##.##.####"
          placeholder="MM.DD.YYYY"
          type="date"
        />
      </form-item>
      <form-item
        title="Repository branch"
      >
        <app-input
          v-model="formData.branch"
          type="select"
          :datalist="repositoryStore.getBranchesNames"
          datalist-id="branchList"
        />
      </form-item>
      <app-button
        class="index__button"
        title="Start analyze"
        default-type="submit"
      />
    </form>
  </div>
</template>
<script setup lang="ts">
import FormItem from '@/components/common/Form/FormItem.vue';

import {useRepositoryStore} from "@/store/modules/repository";
import {useRouter} from "vue-router";
import {reactive} from "vue";

import {GITHUB_DEFAULT_BRANCH} from "@/constants/branch";
import {getDateFormatted} from "@/helpers/date";

const router = useRouter();
const repositoryStore = useRepositoryStore();

const formData = reactive({
  url: '',
  startDate: '',
  endDate: '',
  branch: '',
  owner: '',
  repo: '',
});

const onUrlBlur = async () => {
  if (!formData.url.includes('https')) return parseString(formData.url);
  return parseUrl(formData.url);
}
const onUrlInput = async () => {
  const { url } = formData;
  if (url.includes('/')) {
    const [owner] = url.split('/');
    if (owner) {
      await repositoryStore.GET_REPO_BY_OWNER(owner);
    }
  }
}
const onSubmit = async () => {
  await router.push({
    name: 'DashboardPage',
    query: {
      owner: formData.owner,
      repo: formData.repo,
      end: formData.endDate,
      start: formData.startDate,
      branch: formData.branch,
    },
  });
}

const parseString = async (str: string) => {
  const [owner, repo, ...other] = str.split('/').filter((item) => item);
  if (other.length !== 0) return;
  if (!(owner && repo)) return;
  await repositoryStore.GET_REPO_INFO(owner, repo);
  formData.branch = repositoryStore.data.default_branch || GITHUB_DEFAULT_BRANCH;
  formData.startDate = getDateFormatted(repositoryStore.data.created_at) || '';
  formData.endDate = getDateFormatted(repositoryStore.data.pushed_at) || '';
  formData.owner = owner;
  formData.repo = repo;
}
const parseUrl = async (str: string) => {
  const { pathname, host } = new URL(str);
  if (host !== 'github.com') return;
  await parseString(pathname);
}
</script>
<style scoped lang="scss">
.index {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  &__button {
    margin-top: 16px;
  }

  &__form {
    @include formWrapper;
  }
}


</style>
