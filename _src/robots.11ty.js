const robotstxt = require("generate-robotstxt");

module.exports = {
  data: function () {
    return {
      permalink: 'robots.txt',
      sitemap: {
        ignore: true
      },
      robots: {
        ignore: true
      }
    }
  },
  render: async function (data) {
    const allowedPages = data.collections.all.filter((item) => { return (item.data.robots && !item.data.robots.ignore && item.data.robots.allow); }).map((item) => { return item.url; });
    const disallowedPages = data.collections.all.filter((item) => { return (item.data.robots && !item.data.robots.ignore && !item.data.robots.allow); }).map((item) => { return item.url; });
    const robots = {
      policy: [{
        userAgent: "*",
        allow: allowedPages,
        disallow: disallowedPages
      }],
      sitemap: new URL("/sitemap.xml", data.config.site.url.base).toString(),
      host: data.config.site.url.base
    };
    return await robotstxt(robots);
  }
}
