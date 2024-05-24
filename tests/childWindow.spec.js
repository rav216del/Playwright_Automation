const {test,expect}= require('@playwright/test');


test('my first browser playwright test case', async ({browser})=>{
//chrome - Plugin/cookies 
const context  = await browser.newContext();
const page     = await context.newPage();
await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
const userName= page.locator("#username")
const blinkText= page.locator("a[target='_blank']");
const [pageOne]= await Promise.all(
    [
        context.waitForEvent('page'),
        blinkText.click(),
    ]
)
const text =await pageOne.locator(".red").textContent()
console.log(text)
const desiredText=  text.split("@")[1].split(" ")[0].trim()
//console.log(desiredText)
await page.locator("#username").fill(desiredText)
//await page.pause()

console.log(await page.locator("#username").textContent())

}
)