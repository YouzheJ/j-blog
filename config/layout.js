// Default Helmet props
export default Object.freeze({
  htmlAttributes: {lang: 'en'},
  title: 'Title',
  defaultTitle: 'Default Title',
  titleTemplate: '%s - React Redux Starter Kit',
  meta: [
    {charset: 'utf-8'},
    {name: 'viewport', content: 'width=device-width, initial-scale=1'}
  ],
  link: [
    {rel: 'shortcut icon', href: '/favicon.ico'},
    {rel: 'stylesheet', href: '//at.alicdn.com/t/font_573398_hpkll2uh871ra4i.css'}
  ],
  script: [
    {type: 'text/javascript', src: '/plugins/showdown/showdown.min.js'}
  ],
  style: []
})
