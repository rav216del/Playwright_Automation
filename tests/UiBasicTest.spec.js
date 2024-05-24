const {test,expect}= require('@playwright/test');

//test.describe.configure({mode:'parallel'})
test('my first browser playwright test case', async ({browser})=>{
//chrome - Plugin/cookies 
const context  = await browser.newContext();
const page     = await context.newPage();
await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
console.log(await page.title());
const userName= page.locator("#username");
const password= page.locator("#password");
const signINButton= page.locator("#signInBtn");
await userName.type("Ravi")
await password.type("123")
await signINButton.click()
console.log(await page.locator("div[style='display: block;']").textContent());
await expect(page.locator("div[style='display: block;']")).toContainText("Incorrect username/password.")
await userName.fill("");
await userName.fill("rahulshettyacademy")
await password.fill("")
await password.fill("learning")
await signINButton.click()
 //await page.locator(".card-body a").first().waitFor();
await page.waitForLoadState('networkidle');
 //console.log(await page.locator(".card-body a").first().textContent());
 console.log(await page.locator(".card-body a").allTextContents());

})

test('my first page playwright test case', async ({page})=>{
    
    await page.goto("https://google.com");
    console.log(await page.title());
    await expect(page).toHaveTitle("Google")
    })