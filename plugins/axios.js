import qs from "qs";

export default function({ $axios, app, store }) {
  $axios.onRequest(config => {
    config.paramsSerializer = params =>
      qs.stringify(params, { arrayFormat: "brackets" });
    return config;
  });
}
