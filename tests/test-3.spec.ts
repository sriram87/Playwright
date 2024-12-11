import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.pos.com.my/send/ratecalculator');

  await page.waitForTimeout(3000)

  
  const pincode= await page.getByPlaceholder('Postcode').first();
  pincode.scrollIntoViewIfNeeded();

  await page.getByPlaceholder('Postcode').first().fill('35600');
  await page.getByPlaceholder('Select country').fill('India');
  await page.getByText('India - IN').click();
  await page.getByPlaceholder('eg. 0.1kg').click();
  await page.getByPlaceholder('eg. 0.1kg').fill('1');
  await page.getByText('Calculate').click();

  await page.getByText('Service Type International Air Parcel').scrollIntoViewIfNeeded();

  expect(await page.locator("//dd[normalize-space()='International Air Parcel']")).toHaveText('International Air Parcel')

  // await page.locator('div').filter({ hasText: /^Weight \(kg\)Max Weight is 30 kg$/ }).first().click();
  // await page.getByText('Calculate').click();

  // await page.locator('#contentBody div').filter({ hasText: 'Get your domestic or' }).nth(2).click();
  // await page.getByText('Calculate').click();



});
