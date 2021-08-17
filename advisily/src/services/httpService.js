import axios from "axios";

const setJwt = (jwt) => {
  axios.defaults.headers.common["x-auth-token"] = jwt;
};
axios.interceptors.response.use(null, (err) => {
  const expectedError =
    err.response && err.response.status >= 400 && err.response.status < 500;
  if (!expectedError) {
    console.log("Logging unexpected expected error: ", err);
    return alert("An unexpected error occurred.");
  }
  return Promise.reject(err);
});

const httpService = {
  get: axios.get,
  post: axios.post,
  delete: axios.delete,
  put: axios.put,
  setJwt,
};
export default httpService;
