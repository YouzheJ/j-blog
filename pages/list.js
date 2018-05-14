import ListView from '../components/List/ListView'
import constant from '../constant'
import axios from 'axios'

const { LIST_GET_SERVER } = constant.api;

const Page = (props) => <ListView {...props} />

const getListData = (index) => {
  return new Promise((resolve, reject) => {
    axios.get(`${LIST_GET_SERVER}?index=${index}`)
      .then(({data}) => {
        if (data && data.success && data.data) {
          resolve(data.data)
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
  const data = await getListData(Number(query.index) || 0);
  return { query, ...data }
}

export default Page