const headers = {
  Accept: "application/json, text/plain, */*",
  "Content-Type": "application/json",
};

const deleteService = (url: string) => {
  return fetch("/service", {
    method: "delete",
    headers,
    body: JSON.stringify({ url }),
  });
};

const editService = (oldUrl: string, url: string) => {
  return fetch("/service", {
    method: "put",
    headers,
    body: JSON.stringify({ url, oldUrl }),
  });
};

const createService = (url: string) =>
  fetch("/service", {
    method: "post",
    headers,
    body: JSON.stringify({ url }),
  });

const getServices = async () => {
  const res = await fetch("/service", {
    method: "get",
    headers,
  });
  return await res.json();
};

export default {
  deleteService,
  editService,
  createService,
  getServices,
};
