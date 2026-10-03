const { test, expect, request } = require("@playwright/test");
let token;
let order_id;
test.beforeAll("API validation", async () => {
  const loginPayload = 
{userEmail: "yadrajshinde1@gmail.com", userPassword: "Yadgodtes@123456"};
const orderPayload ={orders:[{country:"Cuba",productOrderedId:"6960eac0c941646b7a8b3e68"}]}
  const ApiContext = await request.newContext();
  const response = await ApiContext.post(
    "https://rahulshettyacademy.com/api/ecom/auth/login",
    {
      data: loginPayload,
    },
  );
  expect(response.ok()).toBeTruthy();
  const responseBody = await response.json();
  token = responseBody.token;
  const userId = responseBody.userId;
  console.log(userId);
  console.log(token);


  const OrderResponse = await ApiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order',
  {
    data: orderPayload,
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json'
    }
  });
  const orderResponseBody = await OrderResponse.json();
  order_id = orderResponseBody.orders[0];
});

test('E2E', async ({ page }) => {


  page.addInitScript((token) => {
    window.localStorage.setItem('token', token);
  }, token);
  
  await page.goto('https://rahulshettyacademy.com/client');
    await page.locator('button[routerlink*="myorders"]').click();
    await page.locator('tbody').waitFor();
    const rows = page.locator('tbody tr');
    for (let i = 0; i < await rows.count(); ++i) {
      const text = await rows.nth(i).locator('th').textContent();
      if (order_id.includes(text)) {
        await rows.nth(i).locator('button').first().click();
        break;
      }
    }

    const orderDetails = await page.locator('.col-text').textContent();
    expect(order_id.includes(orderDetails)).toBeTruthy();

}); 

