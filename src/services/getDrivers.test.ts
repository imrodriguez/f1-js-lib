import { getDrivers } from './getDrivers';

test('get drivers', async () => {
    const drivers = await getDrivers();

    expect(drivers.length).toBeGreaterThan(1);
});