// Load playwright module
const { test, expect } = require('@playwright/test');
import {faker} from '@faker-js/faker'
const {DateTime} = require('luxon')
const tokenRequestBody = require('../test-data/Token_request_body.json')
const putRequestBody = require('../test-data/Put_Request_Body.json')
// write a test
test('Create GET API  request in playwright', async ({ request }) => {
  const firstName = faker.person.firstName()
  const lastName = faker.person.lastName()
  const totalPrice = faker.number.int(1000)
  const checkInDate = DateTime.now().toFormat('yyyy-MM-dd') 
  const checkOutDate = DateTime.now().plus({day:2}).toFormat('yyyy-MM-dd') 
    // create post API request
  const postAPIResponse = await request.post(`/booking`, {
    data:{
        
            "firstname": firstName,
            "lastname": lastName,
            "totalprice": totalPrice,
            "depositpaid": true,
            "bookingdates": {
                "checkin": checkInDate,
                "checkout": checkOutDate
            },
            "additionalneeds": "super bowls"
        }
    
  })
  // validate status code
  expect (postAPIResponse.ok()).toBeTruthy()
  expect (postAPIResponse.status()).toBe(200)

  // validate json API response

  console.log('***********************POST API CALL*************************************')

  const postAPIResponseBody = await postAPIResponse.json()
  console.log(postAPIResponseBody)
  const bid = postAPIResponseBody.bookingid
  expect(postAPIResponseBody.booking).toHaveProperty("firstname",firstName)
  expect(postAPIResponseBody.booking).toHaveProperty("lastname",lastName)

  // validate nested json API response

  expect(postAPIResponseBody.booking.bookingdates).toHaveProperty("checkin",checkInDate)
  expect(postAPIResponseBody.booking.bookingdates).toHaveProperty("checkout",checkOutDate)

  // get API request

  console.log('***********************GET API CALL*************************************')

  const getAPIResponse = await  request.get(`/booking/${bid}`)
  console.log(await getAPIResponse.json())

   // validate status code
   expect (getAPIResponse.ok()).toBeTruthy()
   expect (getAPIResponse.status()).toBe(200)

   // generate token
   const tokenResponse = await request.post(`/auth`,{
    data:tokenRequestBody
   })

   const tokenAPIResponseBody = await tokenResponse.json()
   const token = tokenAPIResponseBody.token
   console.log("token no is  : " + token) 

   // Put API call
  
   console.log('***********************PUT API CALL*************************************')
   const putResponse = await request.put(`/booking/${bid}`, {
    data:putRequestBody,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Cookie': `token=${token}`
    }} )

   const putresponseBody =  await putResponse.json()  
   
   console.log(putresponseBody)

    // validate status code
    expect (putResponse.ok()).toBeTruthy()
    expect (putResponse.status()).toBe(200)


});




