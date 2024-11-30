const auth = {
  googleLogin: "/auth/google-login",
  login: "/auth/login",
  register: "/auth/register",
};

const user = {
  about: "/user/",
  search: "/user/filters"
};

const company = {
  add: "/company/",
  view: "/company/single",
  search: "/company/filters",
  singleview: "/company/single",
  viewall: "/company/all-companies",
};

const review = {
  add: "/review",
  verify: "/review",
  endows: "/endows/"
};

const shortlist = {
  add: "/shortlist/",
  view: "/candidates/"
};

export { auth, user, company, review, shortlist };
