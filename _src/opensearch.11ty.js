const xml = require("xml");

module.exports = {
  data: function () {
    return {
      permalink: 'opensearch.xml',
      sitemap: {
        ignore: true
      },
      robots: {
        ignore: true
      }
    }
  },
  render: function (data) {
    const search = [
      {
        OpenSearchDescription: [
          { _attr: { xmlns: "http://a9.com/-/spec/opensearch/1.1/" } },
          { ShortName: data.config.site.shortname },
          { Description: `Use Google to search ${data.config.site.name}` },
          {
            Url:
            {
              _attr: {
                type: "application/rss+xml",
                template: `http://www.google.com/search?q=site:${data.config.site.url.base} {searchTerms}`
              }
            }

          }
        ]
      }
    ];

    return xml(search, { declaration: true });
  }
}


