import EditView from '../components/Edit/edit'
import axios from 'axios'
import constant from '../constant'

const { PAGE_GET_SERVER } = constant.api;

const Page = (props) => <EditView {...props} />

const getPageData = (pageId) => {
  return new Promise((resolve, reject) => {
    axios.get(`${PAGE_GET_SERVER}?pageid=${pageId}`)
      .then(({data}) => {
        if (data && data.success && data.data) {
          resolve(data.data);
        } else {
          resolve({});
        }
      })
      .catch((err) => {
        // 重定向到500页
        resolve({});
      });
  });
}

Page.getInitialProps = async ({req, res, jsonPageRes, query, err}) => {
  // const id = Number(query.id);
  // if (id) {
  //   const page = await getPageData(id);
  //   return { query, page }
  // }
  return { query, }
}

export default Page