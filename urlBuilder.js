const buildURL = (base, params) => {
    const url = new URL(base);
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    return url.toString();
};

module.exports = { buildURL };
