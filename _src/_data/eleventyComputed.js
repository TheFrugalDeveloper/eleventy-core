const site = require("./config/site");
const meta = require("./config/meta");
const url = require("url");

module.exports = {
    cannonicalUrl: (data) => {
        return new URL(data.page.url, site.url.base).toString();
    },
    sitemap: {
        priority: (data) => {
            return (data.sitemap && data.sitemap.priority) || 0.5;
        },
        changeFreq: (data) => {
            return (data.sitemap && data.sitemap.changeFreq) || "monthly";
        },
        ignore: (data) => {
            return data.sitemap.ignore || false;
        }
    },
    pageLang: (data) => {
        return data.language || site.language || "en";
    },
    pageTitle: (data) => {
        return `${data.title} ${meta.page.title.seperator} ${site.name}`
    },
    pageDescription: (data) => {
        if (((data.description && data.description.length) || 0) > meta.page.description.length) {
            return `${data.description.slice(0, (meta.page.description.length - 1)).trim()}…`
        } else {
            return data.description;
        }
    },
    pageKeywords: (data) => {
        // meta.page.keywords.count
        return (data.keywords || "").split(',').slice(0, (meta.page.keywords.count || 5)).map((item) => item.trim()).join(',');
    }
}