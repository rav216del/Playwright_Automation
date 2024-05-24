const { test, expect } = require('@playwright/test');


const { POManager } = require('../pageobject/POManager')
const testDataSet = JSON.parse(JSON.stringify(require('../utils/EcommerceTestData2.json')))
let poManager;
let loginPage;
let dashboardPage;
for(const data of testDataSet){

test(`framework playwright test case ${data.productName}`, async ({page}) => {

    poManager = await new POManager(page);
    loginPage = await poManager.getLoginPage();
    await loginPage.goToUrl();
    await loginPage.validLogin(data.userName, data.password)
    dashboardPage = await poManager.getDashboardPage();
    await dashboardPage.searchProductAndAddToCart(data.productName)
    await dashboardPage.navigateToCart()


    const cartPageAllItem = page.locator("div li")
    const checkoutButton = page.locator("text=Checkout")
    const selectCountryBox = page.locator("input[placeholder='Select Country']")
    const countryDropdown = page.locator("section.ta-results")
    const countryDropdownItem = page.locator("section.ta-results button")


    await cartPageAllItem.first().waitFor()
    //const cartItem = await page.locator("h3:has-text('iphone 13 pro')").isVisible()
   // expect(cartItem).toBeTruthy()
    await checkoutButton.click()
    await selectCountryBox.type("ind", { delay: 100 })
    await countryDropdown.waitFor()
    await countryDropdownItem.first().waitFor()
    console.log(await countryDropdownItem.allTextContents())
    const countCountry = await countryDropdownItem.count()
    for (let i = 0; i < countCountry; i++) {
        if (await countryDropdownItem.nth(i).textContent() === " India") {
            await countryDropdownItem.nth(i).click()
            break;
        }
    }
    await expect(page.locator(".details__user label")).toHaveText(data.userName)
    await page.locator("text=Place Order ").click()
    const textThanks = await page.locator("h1.hero-primary").textContent()
    console.log(textThanks)
    await expect(textThanks).toContain("Thankyou")
    //.toHaveText(" Thankyou for the order. ")
    const orderID = await page.locator("label[class='ng-star-inserted']").textContent()
    console.log(orderID)
    //await expect(orderID).toHaveText(" | 65068e2a7244490f95b131fb | ")
    await page.locator("button[routerlink='/dashboard/myorders']").click()
    await page.locator("table tbody").waitFor()
    const rowOrder = page.locator("table tbody tr")
    const rowCount = await rowOrder.count()
    for (let i = 0; i < rowCount; i++) {
        const rowOrderId = await rowOrder.nth(i).locator("th").textContent()
        if (await orderID.includes(rowOrderId)) {
            await rowOrder.nth(i).locator("button").first().click()
            break;

        }
    }
    const finalDetailOrderId = await page.locator("div[class='col-text -main']").textContent()
    //await expect(orderID).toContain(finalDetailOrderId)
    //await expect(orderID.includes(finalDetailOrderId)).toBeTruthy
    //await page.pause()

}
)
}