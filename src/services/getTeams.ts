import puppeteer from 'puppeteer';

type Team = {
    name: string,
    car: string,
    logo: string
}

const getTeams = async ():Promise<Team[]> => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.formula1.com/en/teams.html');
    const listTeams = await page.$$('.listing-item-wrapper');
    const result = await Promise.all(listTeams.map(async (driver:any) => {
        const name = await driver.$eval('.listing-info .f1-color--black', (e:Element) => e.textContent);
        const car = await driver.$eval('.listing-image img', (img:Element) => img.getAttribute('data-src'));
        const logo = await driver.$eval('.listing-info .logo img', (img:Element) => img.getAttribute('data-src'));

        return {
            name,
            car,
            logo
        };
    }));

    await browser.close();
    return result;
};

export { getTeams };