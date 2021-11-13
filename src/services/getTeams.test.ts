import { getTeams } from './getTeams';

test('get teams', async () => {
    const teams = await getTeams();
    console.log(teams)

    expect(teams.length).toBeGreaterThan(1);
});