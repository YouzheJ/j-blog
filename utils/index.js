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

// 防抖
export function debounce(fn, interval = 300) {
  let timeout = null;
  return function () {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
          fn.apply(this, arguments);
      }, interval);
  };
}

// 节流
export function throttle(fn, interval = 300) {
  let canRun = true;
  return function () {
      if (!canRun) return;
      canRun = false;
      setTimeout(() => {
          fn.apply(this, arguments);
          canRun = true;
      }, interval);
  };
}