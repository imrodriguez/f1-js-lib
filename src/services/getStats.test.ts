import { getDrivers } from "./getDrivers";
import { getStats } from "./getStats";

test("get stats", async () => {
  const drivers = await getDrivers();
  const stats = await getStats(drivers[0].link);
  expect(stats.length).toBeGreaterThan(1);
});
