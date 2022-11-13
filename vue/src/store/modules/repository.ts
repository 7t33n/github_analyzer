import { defineStore } from 'pinia';
import {
  getAllBranches,
  getContributors,
  getPullsCount,
  getRepoByOwner,
  getRepoData,
} from '@/helpers/request/github.api';
import { asc, desc } from '@/helpers/sort/numberSort';

export const useRepositoryStore = defineStore(
  'repo',
  {
    state: (): IRepositoryState => ({
      data: {},
      pulls: [],
      statistics: {
        closed: '',
        open: '',
        all: '',
      },
      branches: [],
      repositories: [],
      contributors: [],
    }),
    getters: {
      getBranchesNames: (state) => state.branches.map((item) => item.name),
      getReposName: (state) => state.repositories.map((item) => item.full_name),
      getFilteredPulls: (state) => (end: string | undefined, start: string | undefined) => {
        const d1 = end ? new Date(end).getTime() : new Date().getTime();
        const d2 = start ? new Date(start).getTime() : new Date(0).getTime();
        return state.pulls.filter((fItem) => {
          const date = new Date(fItem.created_at).getTime();
          return d1 >= date && date >= d2;
        });
      },
      getClosedPull() {
        return (end: string | undefined, start: string | undefined) => this.getFilteredPulls(end, start).filter((item) => item.state === 'closed');
      },
      getOpenPull() {
        return (end: string | undefined, start: string | undefined) => this.getFilteredPulls(end, start).filter((item) => item.state === 'open');
      },
      getOldPull() {
        return (end: string | undefined, start: string | undefined) => {
          const timestamp = new Date().getTime() - 1000 * 60 * 60 * 24 * 30;
          return this.getFilteredPulls(end, start)
            .filter((item) => item.state === 'open' && new Date(item.created_at).getTime() <= timestamp);
        };
      },
      getSortedContributors: (state) => (type: 'asc' | 'desc', end: string | undefined, start: string | undefined) => {
        const d1 = (end ? new Date(end).getTime() : new Date().getTime()) / 1000;
        const d2 = (start ? new Date(start).getTime() : new Date(0).getTime()) / 1000;
        return state.contributors
          .map((item) => {
            const total = item.weeks && item.weeks
              .filter((fItem) => d1 >= fItem.w && fItem.w >= d2)
              .reduce((prev, cur) => prev + cur.c, 0);
            return {
              total: total || 0,
              author: item.author,
            };
          })
          .filter((item) => item.total)
          .sort((a, b) => (type === 'asc' ? asc(a.total, b.total) : desc(a.total, b.total)));
      },
    },
    actions: {
      async GET_REPO_INFO(owner: string, repo: string) {
        this.data = await getRepoData(owner, repo);
        await this.GET_BRANCHES(owner, repo);
      },
      async GET_BRANCHES(owner: string, repo: string) {
        this.branches = await getAllBranches(owner, repo);
      },
      async GET_REPO_BY_OWNER(owner: string) {
        this.repositories = await getRepoByOwner(owner);
      },
      async GET_CONTRIBUTORS(owner: string, repo: string) {
        this.contributors = await getContributors(owner, repo);
      },
      async GET_REPOS(owner: string, repo: string, branch: string, state: keyof IRepositoryState['statistics'] = 'all') {
        this.pulls = await getPullsCount(owner, repo, branch, state);
      },
    },
  },
);
