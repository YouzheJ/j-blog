import axios from 'axios'

export const fetch2 = (url, config = {}) => {
  return new Promise((resolve, reject) => {
    axios({
      url,
      method: config.method || 'get',
      data: config.data,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        ...config.headers
      },
    })
      .then(({data}) => {
        if (data) {
          resolve(data);
        } else {
          reject({
            message: 'fetch error',
          });
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
}