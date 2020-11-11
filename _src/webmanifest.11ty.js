const webman = require("@pwa/manifest");
const meta = require("./_data/config/meta");


module.exports = {
  data: function () {
    return {
      permalink: meta.webmanifest.filename || false,
      sitemap: {
        ignore: true
      },
      robots: {
        ignore: true
      }
    }
  },
  render: async function (data) {
    const manifest = await webman({
      name: data.config.site.name,
      short_name: data.config.site.shortName,
      icons: data.config.meta.icons.webmanifest,
      start_url: data.config.meta.webmanifest.startUrl,
      display: data.config.meta.webmanifest.display,
      background_color: data.config.site.theme.backgroundColor,
      theme_color: data.config.site.theme.color,
    });

    return JSON.stringify(manifest);
  }
}
