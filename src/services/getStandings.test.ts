import { getStandings } from './getStandings';

it('Standings of drivers works', async () => {
    const standings = await getStandings({
        year: 2021,
        type: 'drivers'
    });
    expect(standings.length).toBeGreaterThan(1);
});

it('Standings of teams works', async () => {
    const standings = await getStandings({
        year: 2021,
        type: 'teams'
    });
    expect(standings.length).toBeGreaterThan(1);
});

it('Standings works passing a previous year', async () => {
    const standings = await getStandings({
        year: 2019,
        type: 'teams'
    });
    expect(standings.length).toBeGreaterThan(1);
});

it('Standings works without passing year', async () => {
    const standings = await getStandings({
        type: 'teams'
    });
    expect(standings.length).toBeGreaterThan(1);
});
