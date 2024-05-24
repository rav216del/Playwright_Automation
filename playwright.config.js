// @ts-check
const { defineConfig, devices } = require('@playwright/test');
 
module.exports = defineConfig({
  testDir: './tests',
  timeout: 100*1000,
  expect:{
    timeout: 10000
  },
  fullyParallel: true,
  
  reporter: 'html',
  
  use: {

    browserName :"chromium",
    headless: false,
    screenshot:'on',
    trace: 'on',
  },

  /* Configure projects for major browsers */
  // projects: [
  //   {
  //     name: 'chromium',
  //     use: { ...devices['Desktop Chrome'] },
  //   },

  //   {
  //     name: 'firefox',
  //     use: { ...devices['Desktop Firefox'] },
  //   },

  //   {
  //     name: 'webkit',
  //     use: { ...devices['Desktop Safari'] },
  //   },

  // ],

  
});

