import { test, expect, chromium } from '@playwright/test';
import * as fs from 'fs';

const rawData= fs.readFileSync('./testdata.json', 'utf-8')
console.log(rawData);
const testdata= JSON.parse(rawData);
console.log(testdata);

test('has title', async ({ page }) => {
 await page.goto("https://testautomationpractice.blogspot.com/");
 
//  Enabling dialog window handler
 page.on('dialog', async (dialog)=>{
  expect(dialog.type()).toContain('prompt');
  expect(dialog.message()).toContain("Please enter your name:")
  expect(dialog.defaultValue()).toContain("Harry Potter")
  await dialog.accept('Sriram');
 })
 await page.waitForTimeout(3000);
 await page.click("#promptBtn");
 await expect(page.locator("//p[@id='demo']")).toHaveText('Hello Sriram! How are you today?');

 
});


test.only('Frames_Demo', async ({ page }) => {
  await page.goto("https://ui.vision/demo/webtest/frames/");

  const allframes= await page.frames();
  console.log("No of Frames: ", allframes.length)

//  approach 1
/*
const frame1= await page.frame({url:'https://ui.vision/demo/webtest/frames/frame_1.html'})
await frame1?.fill("[name='mytext1']",'Sriram');*/

// approach2
const frame2= await page.frameLocator("frame[src='frame_3.html']").locator("//input[@name='mytext3']").pressSequentially('Sriram');

await page.waitForTimeout(3000);
  
 });


 test("Window Tab", async({ page:Page})=>{

  const browser= await chromium.launch({headless:false})
  const context= await browser.newContext()
  const page= await context.newPage()

  await page.goto("https://demoqa.com/")
  await page.getByText("Alerts, Frame & Windows").click();
  await page.getByText("Browser Windows").click();

  const [newWindow]= await Promise.all([
    page.waitForEvent('popup'),
    await page.locator('#windowButton').click()
  ])

  await newWindow.waitForLoadState('load');
  console.log('The new Tab is: ', newWindow.url());
  await page.waitForTimeout(2000);
  await page.close();  
 });
 


test('Login into SauceDemo Application ', async({ page})=>{

  await page.goto(testdata.url);

  await page.fill('#user-name', testdata.username);
  await page.fill('#password', testdata.password);

  await page.click('#login-button');

  await expect (page.locator('.app_logo')).toContainText('Swag Labs');

  await page.waitForTimeout(2000)

  const products = await page.locator('.inventory_item');
  const count = await products.count();
  console.log(count);

  for (let i=0;i<count;i++){
    const product = products.nth(i);
    const title= await product.locator('.inventory_item_name ').textContent();
    console.log(`The title of  ${i+1} is : ${title}`)

    // expect(title).not.toBeNull();

    // const description= await product.locator('.inventory_item_desc').textContent();
    // console.log(`The description of  ${i+1} is : ${description}`)
    // expect(description).not.toBeNull();

    // const price= await product.locator('.inventory_item_price').textContent();
    // console.log(`The price of  ${i+1} is : ${price}`)
    // expect(price).not.toBeNull();

    if(title?.trim() === 'Sauce Labs Fleece Jacket')
    {
      await product.locator("button:has-text('Add To Cart')").click();
      console.log(`product ${title} is added to cart`)

      const updatedbuttontext = await product.locator('button').textContent();
      expect(updatedbuttontext?.trim()).toBe('Remove')
      await page.waitForTimeout(2000)
      return;
    }

  }

  // throw new Error("Product not found");
  await page.click('#react-burger-menu-btn');

  await page.getByText('Logout').click();

  await page.close();

})



test('Login into Sauce Demo @sanity', async ({ page})=>{

  await page.goto('https://www.saucedemo.com/')

  await page.fill('#user-name','standard_user')

  await page.fill('#password', 'secret_sauce')

  await page.click('#login-button')

  await expect(page.locator(".app_logo")).toContainText('Swag Labs');

  await page.waitForTimeout(2000);
  
  const productName= await page.locator('.inventory_item_name').nth(2).innerText();
  const productDescription = await page.locator('.inventory_item_desc').nth(2).innerText();
  const productItem = await page.locator('.inventory_item_price').nth(2).innerText();

  await page.locator("#add-to-cart-sauce-labs-bolt-t-shirt").click();
  await page.locator("#shopping_cart_container").click();
  await page.waitForLoadState('domcontentloaded');

  const checkouttitle= await page.locator('.inventory_item_name').innerText();
  const checkoutDesc= await page.locator('.inventory_item_desc').innerText();
  const checkoutItem = await page.locator('.inventory_item_price').innerText(); 
  const checkoutQuantity= await page.locator(".cart_quantity").innerText();

  expect(checkouttitle).toBe(productName);
  expect(checkoutDesc).toBe(productDescription);
  expect(checkoutItem).toBe(productItem);
  expect(checkoutQuantity).toBe("1");

  await page.close();




})
