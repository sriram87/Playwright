import { test, expect } from '@playwright/test';


test('Webtable_1', async ({ page }) => {
 await page.goto("https://testautomationpractice.blogspot.com/");
 
  const table= await page.locator("#productTable");

  const columns= await table.locator('thead tr th')
  // console.log("Number of Columns: ",await columns.count());
  expect(await columns.count()).toBe(4);

  const rows= await table.locator('tbody tr');
  // console.log("Number of Rows: ",await rows.count());
  expect(await rows.count()).toBe(5);
  
  // await selectProduct(rows,page,'Laptop')
  // await selectProduct(rows,page,'Smartwatch')



const pages= await page.locator('.pagination li a')
// console.log("Number of Pages: ", await pages.count())
expect(await pages.count()).toBe(4);

for (let p=0; p< await pages.count();p++){
  if(p>0){
    await pages.nth(p).click()
  }
  for ( let i=0; i< await rows.count();i++){
    const row = rows.nth(i);
    const tds = row.locator('td')
  
    for( let j=0; j< await tds.count()-1;j++){
      console.log(await tds.nth(j).textContent())
  
    }}}

await page.waitForTimeout(2000)

});

async function selectProduct(rows, page, name){
  const matchedrow= rows.filter({
    has:page.locator('td'),
    hasText:name
  })
 
 await matchedrow.locator('input').check();
}