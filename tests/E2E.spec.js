const {test, expect} = require('@playwright/test');


test('E2E', async ({ page }) => {

  await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
  console.log(await page.title());

  const products = page.locator('.card-body');
  const productName = 'ZARA COAT 3';

  await page.locator('#userEmail').fill('yadrajshinde1@gmail.com');
  await page.locator('#userPassword').fill('Yadgodtes@123456');
  await page.locator('#login').click();


  await page.waitForLoadState('networkidle');
  //await page.locator('.card-body b').first().waitFor();
  console.log(await page.locator('.card-body b').allTextContents());
  console.log(await products.count());
  const count = await products.count();

  for (let i = 0; i < count; ++i) {
    if (await products.nth(i).locator('b').textContent() === productName) {
      await products.nth(i).locator('text= Add To Cart').click();
      break;
    }
  }

    await page.locator('[routerlink*="cart"]').click();
    await page.locator('div li').first().waitFor(); //explicit wait 
    const bool = await page.locator('h3:has-text("ZARA COAT 3")').isVisible();
    console.log(bool);
    expect(bool).toBeTruthy();

    await page.locator('text=Checkout').click();
    await page.locator('[placeholder*="Country"]').pressSequentially('ind');
    const dropdown = page.locator('.ta-results');
    await dropdown.waitFor();
    const optionsCount = await dropdown.locator('button').count();

    for (let i = 0; i < optionsCount; ++i) {
      const text = await dropdown.locator('button').nth(i).textContent();
        if (text === ' India') {  
            await dropdown.locator('button').nth(i).click();
            break;
        }
    }

    await page.pause();
  

  
}); 
