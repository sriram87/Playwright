import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.pos.com.my/send/ratecalculator');

  await page.waitForTimeout(3000);
  
  await page.evaluate(()=>{
    window.scrollBy(0,100);
  });

  const fromPostcode= await page.locator('//input[@formcontrolname="postcodeFrom"]').fill("35600");


  const toPostcode= await page.locator('//input[@formcontrolname="postcodeTo"]').fill("70594");

  const weight= await page.locator('//input[@placeholder="eg. 0.1kg"]').fill("15");


  const calculate= await page.locator("//a[normalize-space()='Calculate']").click();

  await page.evaluate(()=>{
    window.scrollBy(0,100);
  });

  const bookingAmount= await page.locator("//h3[normalize-space()='RM 41.32']")
  expect(await page.getByRole('heading', { name: 'RM 41.32' })).toHaveText('RM 41.32')


});