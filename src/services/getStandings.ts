import puppeteer from 'puppeteer';

type StandingDrivers = {
    position: string,
    driver: string,
    nationality: string,
    team: string,
    points: string
}

type StandingTeams = {
    position: string,
    team: string,
    points: string
}

interface Props {
    year?: number | string;
    type: 'drivers' | 'teams';
}
const getStandings = async ({ year = new Date().getFullYear(), type }: Props): Promise<StandingDrivers[] | StandingTeams[]> => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const file = type === 'drivers' ? 'drivers' : 'team';
    await page.goto(`https://www.formula1.com/en/results.html/${year}/${file}.html`);

    const data = await page.$$eval('table tr', trs => trs.map((tr: any) => {
        return tr.innerText;
    }));

    data.shift();

    const result = await Promise.all(data.map(row => {
        const stringDivided = row.split('\t');

        if (type === 'drivers') {
            const position = stringDivided[0];
            const name = stringDivided[1];
            const nationality = stringDivided[2];
            const team = stringDivided[3];
            const points = stringDivided[4];

            return {
                position,
                name,
                nationality,
                team,
                points
            };
        } else {
            const position = stringDivided[0];
            const team = stringDivided[1];
            const points = stringDivided[2];

            return {
                position,
                team,
                points
            };
        }

    }));

    await browser.close();
    return result;
}

export { getStandings };