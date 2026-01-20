import { setupServer } from 'msw/node';
import { visaoGeralHandlers } from './handlers';
import { lazerDashboardHandlers } from './handlers';

export const server = setupServer(
  ...visaoGeralHandlers,
  ...lazerDashboardHandlers
);
