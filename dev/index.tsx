import { createDevApp } from '@backstage/dev-utils';
import { analyticsInternalPlugin, AnalyticsInternalPage } from '../src/plugin';

createDevApp()
  .registerPlugin(analyticsInternalPlugin)
  .addPage({
    element: <AnalyticsInternalPage />,
    title: 'Root Page',
    path: '/analytics-internal',
  })
  .render();
