module.exports = {
  // 部署到 book.ektropia.top 子域，根路径
  base: '/',

  // 指向自写主题（仿文言陰符）
  theme: require('./theme'),

  title: '文言陰符',
  description: '古文編程入門 · Ektropia 古籍藏书阁',
  author: 'Ektropia',

  // 站点 head 配置
  head: [
    ['meta', { name: 'theme-color', content: '#1a0d08' }],
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1' }],
  ],

  // markdown 配置
  markdown: {
    lineNumbers: false,
  },

  themeConfig: {
    // 顶部小字链接（横排）
    topLinks: [
      { text: 'github',  link: 'https://github.com/Tsuei/zaiju' },
      { text: '主站',    link: 'https://ektropia.top' },
      { text: 'help',    link: '/pages/help.html' },
    ],

    // 章节列表 —— 驱动顶 tab
    chapters: [
      { title: '序',     path: '/' },
      { title: '壹·言',  path: '/pages/01-言.html' },
      { title: '貳·數',  path: '/pages/02-數.html' },
      { title: '叁·變',  path: '/pages/03-變.html' },
      { title: '肆·算',  path: '/pages/04-算.html' },
      { title: '伍·判',  path: '/pages/05-判.html' },
      { title: '陸·循',  path: '/pages/06-循.html' },
      { title: '柒·函',  path: '/pages/07-函.html' },
    ],
  },
}