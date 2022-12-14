interface IRepository {
  default_branch?: string;
  created_at?: number;
  pushed_at?: number;
  updated_at?: number;
  closed_at?: number;
  title?: string;
  user?: {
    login?: string;
  };
  html_url?: string;
}

interface IContributors {
  total: number;
  author: {
    login: string;
    avatar_url: string;
    contributions: number;
    html_url: string;
  },
  weeks?: {
    w: number;
    c: number;
  }[];
}

interface IBranch {
  name: string;
}

interface IRepositories {
  full_name: string;
}

interface IPulls {
  created_at: number;
  updated_at: number;
  state: string;
}

interface IRepositoryState {
  data: IRepository;
  pulls: IPulls[];
  branches: IBranch[];
  repositories: IRepositories[];
  contributors: IContributors[];
  statistics: {
    closed: string;
    open: string;
    all: string;
  }
}
