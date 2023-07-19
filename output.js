const fs = require('fs');
const path = require('path');

const writeToFile = (filename, data) => {
    const filePath = path.join(process.cwd(), filename);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`Data has been written to file successfully.`);
};

module.exports = { writeToFile };
