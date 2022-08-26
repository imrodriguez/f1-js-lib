import { getDrivers } from "./getDrivers";

test("get drivers", async () => {
  const drivers = await getDrivers();
  console.log(drivers);

  expect(drivers.length).toBeGreaterThan(1);
});
