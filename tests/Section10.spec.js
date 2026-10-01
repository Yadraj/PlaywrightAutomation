const {test,expect}=require('@playwright/test');

test("Hidden Elements validation", async({page})=>{
    
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();
});

test("Dialog validation", async({page})=>{
    
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await page.locator('#confirmbtn').click();
    page.on('dialog', dialog => dialog.accept());
    await page.locator('#mousehover').hover();
});

test("Frames validation", async({page})=>{

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    const frame =  page.frameLocator('#courses-iframe');
    await frame.locator('li a[href*="lifetime-access"]').first().click();
    const courseTitle = await frame.locator('.text h2').textContent();
    console.log(courseTitle.split(' ')[1]);
});