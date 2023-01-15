const setParams =
  (data = null) =>
  (dispatch) => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    let page = getPageParam(data, urlParams);
    let id = getIdParam(data, urlParams);
    let url;

    url = `?page=ygrek-form-${page}`;
    if (id) {
      url += `&id=${id}`;
    }
    window.history.pushState(
      {
        page: page,
        id: id,
      },
      page.charAt(0).toUpperCase(),
      url
    );
    dispatch({
      type: "SET_PARAMS",
      data: { param_id: id, param_page: page },
    });
  };

const getPageParam = (data, urlParams) => {
  let page;
  if (data && data.page) {
    page = data.page;
  } else {
    const param_page = urlParams.get("page");
    page = param_page.split("-")[2];
  }
  return page;
};

const getIdParam = (data, urlParams) => {
  let id = null;
  if (data && data.id) {
    id = data.id;
  } else if (data && !data.id) {
    id = null;
  } else {
    id = urlParams.get("id");
  }
  return id;
};
export { getPageParam, getIdParam, setParams };
