const site = require("./config/site");
const meta = require("./config/meta");
const url = require("url");

module.exports = {
    cannonicalUrl: (data) => {
        return new URL(data.page.url, site.url.base).toString();
    },
    pageTitle: (data) => {
        return `${data.title} ${meta.page.title.seperator} ${site.name}`
    },
    pageDescription: (data) => {
        return data.description;
    },
    pageKeywords: (data) => {
        // meta.page.keywords.count
        return data.keywords.split(',').slice(0, (meta.page.keywords.count || 5)).map((item) => item.trim()).join(',');
    }
}