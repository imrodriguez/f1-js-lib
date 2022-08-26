import puppeteer from "puppeteer";

type Driver = {
  firstName: string;
  lastName: string;
  team: string;
  photo: string;
  number: string;
  link: string;
};

const getDrivers = async (): Promise<Driver[]> => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://www.formula1.com/en/drivers.html");
  const listDrivers = await page.$$(".listing-item--link");
  const result = await Promise.all(
    listDrivers.map(async (driver: any) => {
      const fullName = await driver.$eval(
        ".listing-item--name",
        (e: Element) => e.textContent
      );

      const firstName = fullName.trim().split("\n")[0].trim();
      const lastName = fullName.trim().split("\n")[1].trim();
      const team = await driver.$eval(
        ".listing-item--team",
        (e: Element) => e.textContent
      );
      const photo = await driver.$eval(".listing-item--photo img", (img: any) =>
        img.getAttribute("data-src")
      );
      const number = await driver.$eval(
        ".listing-item--number img",
        (img: any) => img.getAttribute("data-src")
      );

      const link = await page.$eval(".listing-item--link", (a: any) =>
        a.getAttribute("href")
      );

      return {
        firstName,
        lastName,
        team,
        photo,
        number,
        link,
      };
    })
  );

  await browser.close();
  return result;
};

export { getDrivers };
