import puppeteer from "puppeteer";

export const getStats = async (url: string) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`https://www.formula1.com${url}`);
  const statsTable = await page.$$(".stat-list tr");

  const result = await Promise.all(
    statsTable.map(async (stat: any) => {
      const key = await stat.$eval("th", (e: Element) => e.textContent);

      const value = await stat.$eval("td", (e: Element) => e.textContent);

      return {
        key,
        value,
      };
    })
  );

  await browser.close();
  return result;
};
