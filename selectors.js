const selectors = {
    companyElements: 'ul.directory-list > li[data-position]',
    Clutch: { selector: 'a.directory_profile', attribute: 'href' },
    Company: { selector: 'h3 > .company_title.directory_profile', attribute: 'textContent' },
    Website: { selector: '.website-link__item', attribute: 'href' },
    Location: { selector: 'span.locality', attribute: 'textContent' },
    'Hourly Rate': { selector: 'div.list-item[data-content="<i>Avg. hourly rate</i>"] > span', attribute: 'textContent' },
    'Min Project Size': { selector: 'div.list-item[data-content="<i>Min. project size</i>"] > span', attribute: 'textContent' },
    'Employee Size': { selector: 'div.list-item[data-content="<i>Employees</i>"] > span', attribute: 'textContent' }
};

module.exports = { selectors };
