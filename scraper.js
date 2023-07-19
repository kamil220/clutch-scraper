const { selectors } = require('./selectors');

const scrapePage = async (page) => {
    return await page.evaluate(({ selectors }) => {
        const clearText = (text) => {
            return text.replace(/\\n/g, '').trim();
        };

        const removeUtmParams = (url) => {
            try {
                const urlObj = new URL(url);
                const params = Array.from(urlObj.searchParams.entries())
                    .filter(([key]) => !key.startsWith('utm_'));
                const newSearch = params.map(([key, val]) => `${key}=${val}`).join('&');
                urlObj.search = newSearch;
                return urlObj.toString();
            } catch (error) {
                console.error(`Invalid URL: ${url}`);
                return url;
            }
        };

        const companyList = [];
        const companyElements = document.querySelectorAll(selectors.companyElements);

        for (const companyElement of companyElements) {
            const company = {};
            for (const key in selectors) {
                if (key !== 'companyElements') {
                    const el = companyElement.querySelector(selectors[key].selector);
                    if (el) {
                        if (selectors[key].attribute === 'textContent') {
                            company[key] = clearText(el.textContent);
                        } else {
                            const rawLink = el.getAttribute(selectors[key].attribute);
                            company[key] = rawLink ? removeUtmParams(rawLink) : 'Not Found';
                        }
                    } else {
                        company[key] = 'Not Found';
                    }
                }
            }
            companyList.push(company);
        }

        return companyList;
    }, { selectors });
};

module.exports = { scrapePage };
