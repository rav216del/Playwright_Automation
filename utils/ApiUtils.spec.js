class ApiUtils{
    constructor(apiContext,loginPayLoad){
        this.apiContext=apiContext;
        this.loginPayLoad=loginPayLoad;

    }


async gettoken(){
const loginResponse= await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
    {
        data:this.loginPayLoad,
    })
    console.log(await loginResponse.status())
    
    const jsonLoginResponse= await loginResponse.json()
    console.log(jsonLoginResponse)
    const token=await jsonLoginResponse.token
    console.log(token)
     return token;
}

async createOrder(orderPayLoad){
    let response ={}
    response.token=await this.gettoken();
    const orderResponse= await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
    {
        data:orderPayLoad,
        headers:{
            "Authorization" :response.token,
            "Content-Type" :"application/json",
            "Host":"rahulshettyacademy.com"
        },
    })
    //console.log(await orderResponse.status())
    const jsonOrderResponse = await orderResponse.json()
    console.log(jsonOrderResponse)
   const  orderID=await jsonOrderResponse.orders[0]
    console.log(orderID)
    response.orderID=await orderID;
    return response;



}


}
module.exports={ApiUtils}