# Analytics Module: Internal Metric

Welcome to the Internal Metric Analytics Plugin for Backstage!
This plugin provides a fast and efficient way to collect internal Backstage metrics by sending data directly to an API hosted within your own instance.

## Installation


### Install the plugin

```bash
yarn --cwd packages/app add @rnogueira/analytics-module-internal
```

### Open the `packages/app/src/apis.ts` file and import the required dependencies

```ts
import {
  analyticsApiRef,
  configApiRef,
  identityApiRef,
} from '@backstage/core-plugin-api';
import { InternalMetric } from '@rnogueira/plugin-analytics-module-internal';
```

### Next, add the following code to `packages/app/src/apis.ts` to create the Internal Metric Analytics API

```ts
  createApiFactory({
    api: analyticsApiRef,
    deps: { configApi: configApiRef, identityApi: identityApiRef },
    factory: ({ configApi, identityApi }) =>
      InternalMetric.fromConfig(configApi, {
        identityApi,
      }),
  }),
```