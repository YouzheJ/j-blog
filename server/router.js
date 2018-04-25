import axios from 'axios'

export default async function (ctx) {
  return new Promise((resolve, reject) => {
    if (/page/.test(ctx.req.url)) {
      const pageId = Number(ctx.query.id);
      axios.get(`http://test.youzhej.cn:8000/api/page/html/get?pageid=${pageId}`)
        .then(({data}) => {
          if (data && data.success && data.data) {
            resolve({page: {...data.data} })
          } else {
            resolve({});
          }
        })
        .catch((err) => {
          // 重定向到500页
          resolve({});
        });
    } else {
      resolve({})
    }
  })
}
