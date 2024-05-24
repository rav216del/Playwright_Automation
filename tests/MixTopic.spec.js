const {test,expect}= require('@playwright/test');


test('my first browser playwright test case', async ({browser})=>{
//chrome - Plugin/cookies 
const context  = await browser.newContext();
const page     = await context.newPage();
await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
///////////////////////navigation 
// await page.goto("https://www.google.co.in/");
// await page.goBack()
// await page.goForward()
//////////////////////////////////////////////// hidden& visible
const hide_ShowBox= page.getByPlaceholder("Hide/Show Example")
const hideButton= page.locator("#hide-textbox")
const showButton= page.locator("#show-textbox")
await showButton.click()
await expect(hide_ShowBox).toBeVisible()
await hideButton.click()
await expect(hide_ShowBox).toBeHidden()
//await page.pause()

/////////////////////////////////////////////////////////////// java popup dialog & mouse hover
await page.locator("#confirmbtn").click()
page.on('dialog',dialog=>dialog.accept())
await page.locator("#mousehover").hover()
///////////////////////////////////////////////////////// iframe
const framePage= await page.frameLocator("#courses-iframe")
await framePage.locator("ul li  a[href='lifetime-access']:visible").click()
const text=await framePage.locator("div.text h2").textContent()
await console.log(text)
const value= await text.split(" ")[1]
console.log(value)
}
)
////////////////////////screenshot
test('my screenshot playwright test case', async ({browser})=>{
    //chrome - Plugin/cookies 
    const context  = await browser.newContext();
    const page     = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
   
    const hide_ShowBox= page.getByPlaceholder("Hide/Show Example")
    const hideButton= page.locator("#hide-textbox")
    const showButton= page.locator("#show-textbox")
    await showButton.click()
    await expect(hide_ShowBox).toBeVisible()
    await hideButton.click()
    await page.screenshot({path:'screenshot.png'})
    await showButton.screenshot({path:'partialscreenshot.png'})
    await expect(hide_ShowBox).toBeHidden()
    //await page.pause()
})

test.only('my visual comparison playwright test case', async ({browser})=>{
    //chrome - Plugin/cookies 
    const context  = await browser.newContext();
    const page     = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    expect(await page.screenshot()).toMatchSnapshot('landingpage.png')
})