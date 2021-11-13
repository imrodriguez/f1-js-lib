import puppeteer from 'puppeteer';
import { getDate } from '../helpers/getDate';

type Event = {
    round: string,
    country: string,
    title: string,
    dates: {
        start: string,
        end: string
    },
    flag: string
}

interface Props {
    year: number | string
}

const getSchedule = async ({ year = new Date().getFullYear() }: Props): Promise<Event[]> => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`https://www.formula1.com/en/racing/${year}.html`);
    const listEvents = await page.$$('.event-item');
    const result = await Promise.all(listEvents.map(async (event:any) => {
        const round = await event.$eval('.card-title', (e:Element) => e.textContent);
        const country = await event.$eval('.event-place', (e:Element) => e.textContent);
        const title = await event.$eval('.event-description div:last-child', (e:Element) => e.textContent);
        const flag = await event.$eval('.country-flag img', (img:Element) => img.getAttribute('data-src'));

        const dayStart = await event.$eval('.start-date', (e:Element) => e.textContent);
        const dayEnd = await event.$eval('.end-date', (e:Element) => e.textContent);
        const monthString = await event.$eval('.month-wrapper', (e:Element) => e.textContent);

        return {
            round,
            country,
            dates: {
                start: getDate({day: dayStart, month: monthString.includes('-') ? monthString.split('-')[0] : monthString, year: String(year)}),
                end: getDate({day: dayEnd, month: monthString.includes('-') ? monthString.split('-')[1] : monthString, year: String(year)}),
            },
            title,
            flag
        };
    }));

    return result.filter(element => element.round !== 'ESPORTS');
}

export { getSchedule };