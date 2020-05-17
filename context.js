module.exports = {
  $axios: require("axios"),
  $throw: (msg) => {
    throw new Error(msg);
  },
  $log: (msg) => {
    console.log(msg);
  },
  $cheerio: require("cheerio"),
  $createImage: () => {
    return Date.now().toString(36);
  },
};
