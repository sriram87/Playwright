import { test, expect, chromium, firefox } from '@playwright/test';

test('test', async ({ }) => {
  const browser= await firefox.launch({headless:false, slowMo:1000});
  const context= await browser.newContext();
  const page= await context.newPage();

  await page.goto('https://www.magupdate.co.uk/magazine-subscription/PWOP');

  // await page.waitForTimeout(2000)
  
  const pageOption= 'select#Contact_CountryCode';

  const alloptions= await page.$$(pageOption +'> option');
  for (const e of alloptions){
     const text= await e.textContent();

     if (text === 'Cuba'){

      await page.selectOption(pageOption,{label: text});
      break;
     }



  }


});
