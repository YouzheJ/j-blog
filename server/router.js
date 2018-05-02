import axios from 'axios'
import constant from '../src/constant'

const { PAGE_GET_SERVER, LIST_GET_SERVER } = constant.api;

export default async function (ctx) {
  return new Promise((resolve, reject) => {
    if (/\/page/.test(ctx.req.url)) {
      const pageId = Number(ctx.query.id);
      axios.get(`${PAGE_GET_SERVER}?pageid=${pageId}`)
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
    } else if (/\/list/.test(ctx.req.url)) {
      const index = Number(ctx.query.index);
      axios.get(`${LIST_GET_SERVER}?index=${index}`)
        .then(({data}) => {
          if (data && data.success && data.data) {
            resolve({list: {...data.data} })
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
