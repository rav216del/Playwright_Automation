const { test, expect, request } = require('@playwright/test');
const { ApiUtils } = require('./utils/ApiUtils.spec')

const loginPayLoad = { userEmail: "anshika@gmail.com", userPassword: "Iamking@000" };
const orderPayLoad = { orders: [{ country: "India", productOrderedId: "6262e990e26b7e1a10e89bfa" }] };
const fakePayLoad = { data: [], message: "No Orders" };
let response;
test.beforeAll(async () => {
    const apiContext = await request.newContext()
    const apiUtils = await new ApiUtils(apiContext, loginPayLoad)
    response = await apiUtils.createOrder(orderPayLoad)
})


test('my first browser playwright test case', async ({ page }) => {

    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    },
        response.token);
    await page.goto("https://rahulshettyacademy.com/client");
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
        async route => {
            const response = await page.request.fetch(route.request())
            let body = await JSON.stringify(fakePayLoad);
            await route.fulfill({
                response,
                body,
            })
        })
    await page.locator("button[routerlink*='myorders']").click()
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*")
    console.log(await page.locator(".mt-4").textContent())



}
)