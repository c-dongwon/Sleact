import axios from 'axios';

const dw_fetcher = (url: string) =>
  axios
    .get(url, {
      withCredentials: true,
    })
    .then((res) => res.data);

export default dw_fetcher;
