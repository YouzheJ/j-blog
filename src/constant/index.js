const reg = {
    /*
    * 正则说明:
    * (?!\s\S---)[\s\S]*?
    * 前面的 ?! 为零宽断言，这里表示匹配不包含 \s\S--- 的字符串
    * \s\S 表示匹配包含换行在内的所有字符
    * 后面的 [\s\S]*? 为惰性模式，即从前面开始匹配，匹配到即结束
    */
    BASEINFO_REG: /^---\n+title:\s+(.*)\n+tags:\n+((?!\s\S---)[\s\S]*?)categories:\n+((?!\s\S---)[\s\S]*?)---/,
    // 过滤部分标签
    FILTER_TAGS: /<script[\s\S]*?>[\s\S]*?<\/script>|<iframe[\s\S]*?>[\s\S]*?<\/iframe>/g
}

const test_host = 'http://test.youzhej.cn:8000';

const development = {
  api: {
    SAVE_DATA: '/api/page/add',
    CHECK_LOGIN: '/api/user/login/check',
    LOGIN_POST: '/api/user/login',
    PAGE_GET: '/api/page/html/get',
    PAGE_GET_SERVER: test_host + '/api/page/html/get',
    LIST_GET: '/api/page/get/list',
    LIST_GET_SERVER: test_host + '/api/page/get/list',
  },
  reg,
}

const production = {
  api: {
    SAVE_DATA: '/api/page/add',
    CHECK_LOGIN: '/api/user/login/check',
    LOGIN_POST: '/api/user/login',
    PAGE_GET: '/api/page/html/get',
    LIST_GET: '/api/page/get/list',
  },
  reg,
}

export default NODE_ENV === 'production' ? production : development;