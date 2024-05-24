const {test,expect}= require('@playwright/test');
let webContext;

test.beforeAll(async({browser})=>{
    const context  = await browser.newContext();
const page     = await context.newPage();
await page.goto("https://rahulshettyacademy.com/client");
const userName= page.locator("#userEmail")
const password=page.locator("#userPassword")
const loginButton=page.locator("[value='Login']")
await userName.fill("anshika@gmail.com")
await password.fill("Iamking@000")
await loginButton.click()
await context.storageState({path:'state.json'})
webContext =await browser.newContext({storageState:'state.json'})
})


test('my first browser playwright test case', async ()=>{

const page=await webContext.newPage();
await page.goto("https://rahulshettyacademy.com/client");

const product=page.locator("div.card-body")
const productTitle=page.locator("div.card-body b")
const productName='iphone 13 pro'
const cartButton=page.locator("button[routerlink='/dashboard/cart']")
const cartPageAllItem= page.locator("div li")
const checkoutButton= page.locator("text=Checkout")
const selectCountryBox= page.locator("input[placeholder='Select Country']")
const countryDropdown= page.locator("section.ta-results")
const countryDropdownItem=page.locator("section.ta-results button")

await productTitle.first().waitFor()
console.log(await productTitle.allTextContents())
const count=await product.count()
console.log(count)
for(let i=0;i<count;i++){
    if(await product.nth(i).locator('b').textContent()===productName)
    {
       await product.nth(i).locator('text= Add To Cart').click()
       console.log("item add to cart")
       break;

    }
}
await cartButton.click()
await cartPageAllItem.first().waitFor()
const cartItem=await page.locator("h3:has-text('iphone 13 pro')").isVisible()
expect(cartItem).toBeTruthy()
await checkoutButton.click()
await selectCountryBox.type("ind",{delay:100})
await countryDropdown.waitFor()
await countryDropdownItem.first().waitFor()
console.log(await countryDropdownItem.allTextContents())
const countCountry=await countryDropdownItem.count()
for(let i=0;i<countCountry;i++){
    if(await countryDropdownItem.nth(i).textContent()===" India"){
        await countryDropdownItem.nth(i).click()
        break;
    }
}
await expect(page.locator(".details__user label")).toHaveText("anshika@gmail.com")
await page.locator("text=Place Order ").click()
const textThanks=await page.locator("h1.hero-primary").textContent()
console.log(textThanks)
await expect(textThanks).toContain("Thankyou")
//.toHaveText(" Thankyou for the order. ")
const orderID=await page.locator("label[class='ng-star-inserted']").textContent()
console.log(orderID)
//await expect(orderID).toHaveText(" | 65068e2a7244490f95b131fb | ")
await page.locator("button[routerlink='/dashboard/myorders']").click()
await page.locator("table tbody").waitFor()
const rowOrder = page.locator("table tbody tr")
const rowCount =  await rowOrder.count()
for(let i=0;i<rowCount;i++){
    const rowOrderId= await rowOrder.nth(i).locator("th").textContent()
    if(await orderID.includes(rowOrderId)){
        await rowOrder.nth(i).locator("button").first().click()
        break;

    }
}
const finalDetailOrderId=await page.locator("div[class='col-text -main']").textContent()
await expect(orderID).toContain(finalDetailOrderId)
 await expect(orderID.includes(finalDetailOrderId)).toBeTruthy
//await page.pause()

}
)