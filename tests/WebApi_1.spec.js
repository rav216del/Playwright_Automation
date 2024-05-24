const {test,expect,request}= require('@playwright/test');

const loginPayLoad = {userEmail: "anshika@gmail.com", userPassword: "Iamking@000"};
const orderPayLoad = {orders: [{country: "India", productOrderedId: "6262e990e26b7e1a10e89bfa"}]};
let token;
let orderID;
test.beforeAll(async()=>{
    const apiContext= await request.newContext()
    const loginResponse= await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
    {
        data:loginPayLoad,
    })
    console.log(await loginResponse.status())
    await expect( loginResponse.ok()).toBeTruthy();
    const jsonLoginResponse= await loginResponse.json()
    console.log(jsonLoginResponse)
    token=await jsonLoginResponse.token
    const userId=await jsonLoginResponse.userid
    console.log(token)
    console.log(userId)
    ///////////////////////////////////
    const orderResponse= await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
    {
        data:orderPayLoad,
        headers:{
            "Authorization" :token,
            "Content-Type" :"application/json",
            "Host":"rahulshettyacademy.com"
        },
    })
    console.log(await orderResponse.status())
    const jsonOrderResponse = await orderResponse.json()
    console.log(jsonOrderResponse)
    orderID=await jsonOrderResponse.orders[0]
    console.log(orderID)


})


test('my first browser playwright test case', async ({page})=>{
//chrome - Plugin/cookies 
// const context  = await browser.newContext();
// const page     = await context.newPage();
await page.addInitScript(value=>
    {
    window.localStorage.setItem('token',value);
},
token);
await page.goto("https://rahulshettyacademy.com/client");


// orderID=await page.locator("label[class='ng-star-inserted']").textContent()
// console.log(orderID)
//await expect(orderID).toHaveText(" | 65068e2a7244490f95b131fb | ")
await page.locator("button[routerlink*='myorders']").click()
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