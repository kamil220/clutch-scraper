const { URL, URLSearchParams } = require('url');

const removeUtmParams = (url) => {
  const parsedUrl = new URL(url);
  const params = new URLSearchParams(parsedUrl.search);
  const keysToDelete = [];

  for (const key of params.keys()) {
    if (key.startsWith('utm_')) {
      keysToDelete.push(key);
    }
  }

  keysToDelete.forEach(key => params.delete(key));

  parsedUrl.search = params;

  return parsedUrl.toString();
};

module.exports = { removeUtmParams };
