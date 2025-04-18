import { test, expect} from '@playwright/test'

test.use(
  {
    actionTimeout:10000,
    headless:false,
    baseURL:"https://jqueryui.com/"
  }
)

test.describe('Test_Demo', ()=>{
  test('DatePicker_1', async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");
     
    const year = "2025"
    const month= "March"
    const date= "08"
   
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
    const dates= await page.$$("//a[@class='ui-state-default']")
   
    for( const dt of dates){
   
     if(await dt.textContent()==date){
       await dt.click();
       break;
   
     }
    }
   
  //  const dates= await page.locator(`//a[@class='ui-state-default'][text()='${date}']`)
  //  dates.click();
   
   await page.waitForTimeout(2000);
   
   
   });


   test.only('DatePicker_2', async({ page })=>{
    await page.goto("https://www.globalsqa.com/demo-site/datepicker/");
    const frame1= page.frameLocator(".demo-frame.lazyloaded")
    await frame1.locator("#datepicker").click();

    const date= "08"
    const month= "April"
    const year= "2025"

    while(true){

      const currentYear= await frame1.locator(".ui-datepicker-year").textContent()
      const currentMonth= await frame1.locator(".ui-datepicker-month").textContent()

      if (currentYear== year && currentMonth== month){
        break;
      }

      await frame1.locator("[title='Prev']").click()

    }

    // await expect(frame1.locator("#txtDate")).toHaveValue("04/10/2025")
    // await page.locator("#txtDate").fill('04/10/2025');
    // await expect(page.locator("#datepicker")).toHaveValue("04/08/2025")
    // await expect(page.locator("#txtDate")).toHaveValue("04/10/2025")

    await frame1.locator(`text="${date}"`).click

    await page.waitForTimeout(2000);
    await page.close();
   });


   test('Slider_demo @sanity', async ({ page})=>{

    await page.goto("/slider/")
     const frame=  page.frameLocator(".demo-frame")

     const slide = frame.locator("span.ui-slider-handle")
     await slide.focus();

     for (let i=0;i<20;i++)
     {

      await page.keyboard.press('ArrowRight')
      

     }

     await page.waitForTimeout(2000)


   })


})


