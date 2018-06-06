import Document, { Head, Main, NextScript } from 'next/document'
import Header from '../components/Header'

export default class MyDocument extends Document {
  render() {
    return (
      <html>
        <Head>
          <meta charset='utf-8' name='viewport' content='width=device-width, initial-scale=1'/>
          <link rel='shortcut icon' href='/static/favicon.ico'/>
          <link rel="stylesheet" href="/_next/static/style.css" />
          <link rel='stylesheet' href='//at.alicdn.com/t/font_573398_hpkll2uh871ra4i.css'/>
          {/* <script scr='text/javascript' src='/static/plugins/showdown/showdown.min.js'></script> */}
        </Head>
        <body>
          <Header />
          <Main />
          <NextScript />
          <script>{`var _hmt = _hmt || [];`}</script>
          <script scr='text/javascript' src='/static/baidu.js'></script>
        </body>
      </html>
    )
  }
}