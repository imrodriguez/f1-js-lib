import { getSchedule } from './getSchedule';

it('Standings of drivers works', async () => {
    const standings = await getSchedule({
        year: 2021
    });

    console.log(standings);
    expect(standings.length).toBeGreaterThan(1);
});