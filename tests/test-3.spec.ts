import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.pos.com.my/send/ratecalculator');

  await page.waitForTimeout(3000)

  /*await page.evaluate(()=>{
    window.scrollTo(0,document.body.scrollHeight);
  }); */
  
let pincode= await page.getByPlaceholder('Postcode').first();
pincode.scrollIntoViewIfNeeded();

 // await page.getByRole('heading', { name: 'Get your domestic or' }).scrollIntoViewIfNeeded();

  // await page.keyboard.down('PageDown')

  await page.getByPlaceholder('Postcode').first().fill('35600');
  await page.getByPlaceholder('Select country').click();
  await page.getByPlaceholder('Select country').clear();
  await page.getByPlaceholder('Select country').fill('India');
  await page.getByText('India - IN').click();
  await page.getByPlaceholder('eg. 0.1kg').click();
  await page.getByPlaceholder('eg. 0.1kg').fill('1');
  await page.getByText('Calculate').click();

  await page.getByText('Service Type International Air Parcel').scrollIntoViewIfNeeded();

  expect(await page.locator("//dd[normalize-space()='International Air Parcel']")).toHaveText('International Air Parcel')



});
