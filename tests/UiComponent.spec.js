const {test,expect}= require('@playwright/test');

test('my first page playwright test case', async ({page})=>{
    
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy")
    const userName= page.locator("#username");
const password= page.locator("#password");
const signINButton= page.locator("#signInBtn");
await userName.fill("rahulshettyacademy")
await password.fill("learning")
const radioButton= page.locator("label[class='customradio']");
const okButton = page.locator("#okayBtn")
const dropDown = page.locator("select[class='form-control']");
const checkBox = page.locator("input[type='checkbox']");
const blinkText= page.locator("a[target='_blank']");
await radioButton.last().click();
console.log(await radioButton.last().isChecked());
await expect( radioButton.last()).toBeChecked()
await okButton.click()
await dropDown.selectOption("consult")
await checkBox.click() 
console.log(await checkBox.isChecked())
 expect( await checkBox.isChecked()).toBeTruthy()
 await checkBox.uncheck()
 console.log(await checkBox.isChecked())
 expect( await checkBox.isChecked()).toBeFalsy()
 console.log(await blinkText.textContent())
 await expect(blinkText).toHaveAttribute('class','blinkingText')
//await page.pause()



    })