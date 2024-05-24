const {test,expect}= require('@playwright/test');


test('my first browser playwright test case', async ({browser})=>{
//chrome - Plugin/cookies 
const context  = await browser.newContext();
const page     = await context.newPage();
await page.goto("https://rahulshettyacademy.com/angularpractice/");
await page.getByLabel("Check me out if you Love IceCreams!").click()
await page.getByLabel("Employed").click()
await page.getByLabel("Gender").selectOption("Female")
await page.getByPlaceholder("Password").fill("abc")
await page.getByRole("button",{name:'Submit'}).click()
console.log(await page.getByText("Success!").textContent())
await page.pause()
await page.getByRole("link",{name:'Shop'}).click()
await page.locator("app-card").filter({hasText:'Nokia Edge'}).getByRole("button").click()



}
)