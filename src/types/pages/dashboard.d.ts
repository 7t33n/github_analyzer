interface IDashboardQuery {
  owner: string;
  repo: string;
  start: string;
  end: string;
  branch: string;
}

type IList = {
  [key in string]: {
    id: symbol,
    name: string,
  }
}
