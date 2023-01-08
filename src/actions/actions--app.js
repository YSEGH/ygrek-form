const setPage = (data) => (dispatch) => {
  console.log("setPage", data);
  let url = `?page=ygrek-form-${data.target}`;
  if (data.id) {
    url += `&id=${data.id}`;
  }
  window.history.pushState(
    {
      page: data.target,
      id: data.id,
    },
    data.target.charAt(0).toUpperCase(),
    url
  );
  dispatch({ type: "SET_PAGE", data: data });
};

export { setPage };
