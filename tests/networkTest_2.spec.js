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


//////////////////////////////
await page.route('**/*.{jpg,jpeg,png}',route=>route.abort())
await page.on('request',request=>console.log(request.url()));
await page.on('response',response=>console.log(response.url(),response.status()));
////////////////////////////////////////////
await page.locator("button[routerlink*='myorders']").click()
await page.locator("table tbody").waitFor()
const rowOrder = page.locator("table tbody tr")
const rowCount =  await rowOrder.count()
/////////////////////////////////////
await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
route=>{
    route.continue({url:'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f67654665fb'})
})
///////////////////////////////////////////////
await page.locator('button:has-text("view")').first().click()
////await page.pause()


}
)