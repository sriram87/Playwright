import { test, expect} from '@playwright/test'

test('DatePicker_1', async ({ page }) => {
 await page.goto("https://testautomationpractice.blogspot.com/");
  
 const year = "2023"
 const month= "April"
 const date= "15"

 await page.click('#datepicker')

 while(true)
  {

    const currentYear= await page.locator('.ui-datepicker-year').textContent()
    const currentMonth= await page.locator('.ui-datepicker-month').textContent()
    if(currentYear == year && currentMonth == month){
      break;
    }

    await page.locator("[title='Prev']").click()

 }


// Method 1
/* const dates= await page.$$("//a[@class='ui-state-default']")

 for( const dt of dates){

  if(await dt.textContent()==date){
    await dt.click();
    break;

  }
 }*/

const dates= await page.locator(`//a[@class='ui-state-default'][text()='${date}']`)
dates.click();

await page.waitForTimeout(2000);


});

