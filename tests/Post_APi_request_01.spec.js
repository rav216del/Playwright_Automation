// Load playwright module
const { test, expect } = require('@playwright/test');
// write a test
test('Create Post API  request using static request body', async ({ request }) => {
    // create post API request
  const postAPIResponse = await request.post(`/booking`, {
    data:{
        
            "firstname": "Kanchan",
            "lastname": "Pandit",
            "totalprice": 1000,
            "depositpaid": true,
            "bookingdates": {
                "checkin": "2018-01-01",
                "checkout": "2019-01-01"
            },
            "additionalneeds": "super bowls"
        }
    
  })
  // validate status code
  expect (postAPIResponse.ok()).toBeTruthy()
  expect (postAPIResponse.status()).toBe(200)

  // validate json API response

  const postAPIResponseBody = await postAPIResponse.json()
  console.log(postAPIResponseBody)
  expect(postAPIResponseBody.booking).toHaveProperty("firstname","Kanchan")
  expect(postAPIResponseBody.booking).toHaveProperty("lastname","Pandit")

  // validate nested json API response

  expect(postAPIResponseBody.booking.bookingdates).toHaveProperty("checkin","2018-01-01")
  expect(postAPIResponseBody.booking.bookingdates).toHaveProperty("checkout","2019-01-01")

  

});




