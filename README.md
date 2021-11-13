# F1 information node library

[![Build and test status](https://github.com/imrodriguez/f1-js-lib/workflows/Lint%20and%20test/badge.svg)](https://github.com/imrodriguez/f1-js-lib/actions?query=workflow%3A%22Build+and+test%22)

A javascript project to get the information about drivers, teams and standings of formula 1 🏎

* [TypeScript 4](https://www.typescriptlang.org/)
* Linting with [typescript-eslint](https://github.com/typescript-eslint/typescript-eslint) ([tslint](https://palantir.github.io/tslint/) is deprecated)
* Testing with [Jest](https://jestjs.io/docs/getting-started) (and [ts-jest](https://www.npmjs.com/package/ts-jest))
* Continuous integration ([GitHub Actions](https://docs.github.com/en/actions)


## Installation

```bash
# Install the package
yarn install
#or
npm install
...
```
## Example

```javascript
import { getDrivers } from 'f1-library';

async () => {
  const drivers = await getDrivers;
}()
```
## Methods

### getDrivers()
Return a Promise with the drivers of F1.

### getTeams()
Return a Promise with the teams of F1.

### getStandings({ year, mode }))
Return a Promise with the standings of the year and mode ('drivers' or 'teams') of F1.

### getSchedule({ year })
Return a Promise with the schedule of a season of F1.