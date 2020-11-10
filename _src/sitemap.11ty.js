const { SitemapStream, streamToPromise } = require('sitemap')
const { Readable } = require('stream')

module.exports = {
  data: function () {
    return {
      permalink: 'sitemap.xml',
      sitemap: {
        ignore: true
      },
    }
  },
  render: async function (data) {
    const links = data.collections.all.filter((item) => { return (item.data.sitemap && !item.data.sitemap.ignore); }).map((item) => { return { url: item.url, changefreq: item.data.sitemap.changeFreq, priority: item.data.sitemap.priority } })

    const stream = new SitemapStream({ hostname: data.config.site.url.base });

    return await streamToPromise(Readable.from(links).pipe(stream));
  }
}
