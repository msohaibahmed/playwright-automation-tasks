const { chromium } = require('playwright');

module.exports = async (config) => {
  console.log('Global setup: Running before all tests');
  
  // Launch a shared browser instance
  global.__BROWSER__ = await chromium.launch({
    headless: false, // Set to true if you want to run tests headlessly
  });
};
