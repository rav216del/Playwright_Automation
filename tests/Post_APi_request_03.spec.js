// Load playwright module
const { test, expect } = require('@playwright/test');
import {faker} from '@faker-js/faker'
const {DateTime} = require('luxon')
// write a test
test('Create Post API  request using dynamic request body', async ({ request }) => {
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

  const postAPIResponseBody = await postAPIResponse.json()
  console.log(postAPIResponseBody)
  expect(postAPIResponseBody.booking).toHaveProperty("firstname",firstName)
  expect(postAPIResponseBody.booking).toHaveProperty("lastname",lastName)

  // validate nested json API response

  expect(postAPIResponseBody.booking.bookingdates).toHaveProperty("checkin",checkInDate)
  expect(postAPIResponseBody.booking.bookingdates).toHaveProperty("checkout",checkOutDate)

  

});




