// // Load playwright module
// const { test, expect } = require('@playwright/test');
// import { stringFormat } from '../utils/Common';
// const bookingAPIRequestBody = require('../test-data/Post_dynamic_request_body.json')
// // write a test
// test('Create Post API  request using dynamic json File', async ({ request }) => {
//   const dynamicrequestBody = stringFormat(JSON.stringify(bookingAPIRequestBody), "Kanchan", "Pandit", "Special")  
//     // create post API request
//   const postAPIResponse = await request.post(`/booking`, {
//     data:JSON.parse(dynamicrequestBody)
    
//   })
//   // validate status code
//   expect (postAPIResponse.ok()).toBeTruthy()
//   expect (postAPIResponse.status()).toBe(200)

//   // validate json API response

//   const postAPIResponseBody = await postAPIResponse.json()
//   console.log(postAPIResponseBody)
//   expect(postAPIResponseBody.booking).toHaveProperty("firstname","Kanchan")
//   expect(postAPIResponseBody.booking).toHaveProperty("lastname","Pandit")

//   // validate nested json API response

//   expect(postAPIResponseBody.booking.bookingdates).toHaveProperty("checkin","2018-01-01")
//   expect(postAPIResponseBody.booking.bookingdates).toHaveProperty("checkout","2019-01-01")

  

// });




