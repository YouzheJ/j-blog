export const fetch2 = (url, config) => {
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: config.method,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...config.headers
      },
      body: config.data
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          reject({
            message: 'fetch error',
            code: res.status
          });
        }
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => reject(err));
  });
}