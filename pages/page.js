import axios from 'axios'
import PageView from '../components/Page/PageView'
import constant from '../constant'

const { PAGE_GET_SERVER } = constant.api;

const Page = (props) => <PageView {...props} />

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
  // try {
    const page = await getPageData(Number(query.id));
    return { query, page }
  // } catch (err) {
  //   console.log(err);
  // }
}

export default Page