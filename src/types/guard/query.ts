export const isDashboardQuery = (arg: any): arg is IDashboardQuery => {
  const {
    owner, repo, branch, start, end,
  } = arg;
  const result = owner && repo && branch && start && end
    && [owner, repo, branch, start, end].every((item) => typeof item === 'string');
  if (result) return true;
  throw new Error('incorrectQuery');
};
