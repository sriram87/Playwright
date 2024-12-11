import { test, expect } from '@playwright/test';


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
 

