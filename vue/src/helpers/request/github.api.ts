import instance, {proxy} from '@/helpers/request/index';

const signin = async (code: string): Promise<string> => {
  const { data } = await proxy.post(
    '/login/oauth/access_token/',
    {
      client_id: import.meta.env.VITE_GITHUB_CLIENT_ID,
      client_secret: import.meta.env.VITE_GITHUB_CLIENT_SECRET,
      code,
    },
  );
  return data?.access_token;
};

const getUserData = async () => {
  const { data } = await instance.get(
    'https://api.github.com/user',
  );
  return data;
};

const getRepoData = async (owner: string, repo: string) => {
  const { data } = await instance.get(
    `/repos/${owner}/${repo}`,
  );
  return data;
};

type IAxiosBranchList = {
  data: {
    name: string
  }[],
}
const getAllBranches = async (
  owner: string,
  repo: string,
  page = 1,
  branchList: IBranch[] = [],
): Promise<IBranch[]> => {
  const { data }: IAxiosBranchList = await instance.get(`/repos/${owner}/${repo}/branches?per_page=100&page=${page}`);
  if (data.length !== 0) {
    return getAllBranches(
      owner,
      repo,
      page + 1,
      [
        ...branchList,
        ...data,
      ],
    );
  }
  return branchList;
};

const getRepoByOwner = async (owner: string) => {
  const { data } = await instance.get(
    `/users/${owner}/repos`,
  );
  return data;
};

const getContributors = async (owner: string, repo: string) => {
  const { data } = await instance.get(`/repos/${owner}/${repo}/stats/contributors`);
  return data;
};

const getPullsCount = async (
  owner: string,
  repo: string,
  branch: string,
  state: keyof IRepositoryState['statistics'],
  page = 1,
  pullsList: IPulls[] = [],
): Promise<IPulls[]> => {
  const { data } = await instance.get(`/repos/${owner}/${repo}/pulls?base=${branch}&state=${state}&per_page=100&page=${page}`);
  if (data.length !== 0) {
    return getPullsCount(
      owner,
      repo,
      branch,
      state,
      page + 1,
      [
        ...pullsList,
        ...data,
      ],
    );
  }
  return pullsList;
};

export {
  signin,
  getUserData,
  getRepoData,
  getAllBranches,
  getRepoByOwner,
  getContributors,
  getPullsCount,
};
