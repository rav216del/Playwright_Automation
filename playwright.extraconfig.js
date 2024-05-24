// @ts-check
const { defineConfig, devices } = require('@playwright/test');
 
module.exports = defineConfig({
  testDir: './tests',
  retries:2,
  timeout: 100*1000,
  expect:{
    timeout: 10000
  },
  fullyParallel: true,
  
  reporter: 'html',
  projects:[
    {
      name : "safari",
      use: {

        browserName :"webkit",
        headless: false,
        screenshot:'on',
        trace: 'on',
      }
    },
    {
      name : "chrome",
      use: {

        browserName :"chromium",
        headless: false,
        screenshot:'on',
        trace: 'on',
        video:'on',
       // viewport:{width:720,height:720},
       //...devices['iPhone 13 Pro Max'],
       //ignoreHTTPSErrors:true,
       //permissions:['geolocation']

      }
    },
    {
      name : "firefox",
      use: {

        browserName :"firefox",
        headless: false,
        screenshot:'off',
        trace: 'off',
      }
    }
  ]
  
  

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

