const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const { buildURL } = require('./urlBuilder');
const { scrapePage } = require('./scraper');
const { writeToFile } = require('./output');

puppeteer.use(StealthPlugin());

const baseURL = 'https://clutch.co/pl/web-developers';
const params = {
  'client_type': ['field_pp_cs_midmarket', 'field_pp_cs_enterprise']
};

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  let companies = [];
  const url = buildURL(baseURL, params);

  await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });

  const totalPages = await page.$eval('.page-item.last > a', el => el.getAttribute('data-page'));
  let currentPage = 0;

  while (currentPage <= totalPages) {
    params['page'] = currentPage;
    const urlWithPage = buildURL(baseURL, params);

    await page.goto(urlWithPage, { waitUntil: 'networkidle2', timeout: 60000 });

    let newCompanies = await scrapePage(page);
    companies = companies.concat(newCompanies);

    writeToFile('output.json', companies);

    currentPage++;
  }

  await browser.close();
})();
