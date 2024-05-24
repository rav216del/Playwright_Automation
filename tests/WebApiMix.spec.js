const {test,expect,request}= require('@playwright/test');
const {ApiUtils}=require('./utils/ApiUtils.spec')

const loginPayLoad = {userEmail: "anshika@gmail.com", userPassword: "Iamking@000"};
const orderPayLoad = {orders: [{country: "India", productOrderedId: "6262e990e26b7e1a10e89bfa"}]};
let response;
test.beforeAll(async()=>{
    const apiContext= await request.newContext()
   const apiUtils=await new ApiUtils(apiContext,loginPayLoad)
    response=await apiUtils.createOrder(orderPayLoad)
})


test('my first browser playwright test case', async ({page})=>{

await page.addInitScript(value=>
    {
    window.localStorage.setItem('token',value);
},
response.token);
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
    if(await response.orderID.includes(rowOrderId)){
        await rowOrder.nth(i).locator("button").first().click()
        break;

    }
}
page.pause()
const finalDetailOrderId=await page.locator("div[class='col-text -main']").textContent()
await expect(response.orderID).toContain(finalDetailOrderId)
 await expect(response.orderID.includes(finalDetailOrderId)).toBeTruthy
//await page.pause()

}
)