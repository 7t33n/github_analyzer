export const dashboardMenuList = {
  contributors: {
    id: Symbol('contributors'),
    name: 'Contributors',
  },
  pull_requests: {
    id: Symbol('pull_requests'),
    name: 'Pull requests',
  },
};

export const requestMenuList = {
  open: {
    id: Symbol('open'),
    name: 'Open',
  },
  closed: {
    id: Symbol('closed'),
    name: 'Closed',
  },
  oldest: {
    id: Symbol('oldest'),
    name: 'Oldest',
  },
};

export type IPullTypes = ['open', 'closed', 'oldest'];

export const defaultQuery: IDashboardQuery = {
  owner: '',
  repo: '',
  start: '',
  end: '',
  branch: '',
};
