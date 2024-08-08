export default async function scrollNTimes(page, numScrolls, scrollAmount) {
    for (let i = 0; i < numScrolls; i++) {
      await page.evaluate((scrollAmount) => {
        window.scrollBy(0, scrollAmount);
      }, scrollAmount);
      await page.waitForTimeout(2000);
    }
  }