/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
  forbidden: [
    {
      name: 'no-shared-to-upper-layers',
      severity: 'error',
      comment: '`shared` is the foundation and must not depend on FSD layers above it.',
      from: { path: '^apps/web/shared' },
      to: { path: '^apps/web/(entities|features|widgets|views|app)' },
    },
    {
      name: 'no-entities-to-upper-layers',
      severity: 'error',
      comment: '`entities` may depend only on `shared` and local entity code.',
      from: { path: '^apps/web/entities' },
      to: { path: '^apps/web/(features|widgets|views|app)' },
    },
    {
      name: 'no-features-to-upper-layers',
      severity: 'error',
      comment: '`features` must not depend on widgets, views or app routes.',
      from: { path: '^apps/web/features' },
      to: { path: '^apps/web/(widgets|views|app)' },
    },
    {
      name: 'no-widgets-to-upper-layers',
      severity: 'error',
      comment: '`widgets` must not depend on views or app routes.',
      from: { path: '^apps/web/widgets' },
      to: { path: '^apps/web/(views|app)' },
    },
    {
      name: 'no-views-to-app',
      severity: 'error',
      comment: '`views` compose pages but must not depend on Next route files.',
      from: { path: '^apps/web/views' },
      to: { path: '^apps/web/app' },
    },
    {
      name: 'no-circular',
      severity: 'error',
      comment: 'Circular dependencies make FSD boundaries brittle.',
      from: {},
      to: { circular: true },
    },
    {
      name: 'not-to-unresolvable',
      severity: 'error',
      comment: 'Import target cannot be resolved.',
      from: {},
      to: { couldNotResolve: true },
    },
    {
      name: 'not-to-spec',
      severity: 'error',
      comment: 'Production code must not depend on test files.',
      from: {},
      to: {
        path: '[.](?:spec|test)[.](?:js|mjs|cjs|jsx|ts|mts|cts|tsx)$',
      },
    },
  ],
  options: {
    doNotFollow: {
      path: ['node_modules'],
    },
    enhancedResolveOptions: {
      conditionNames: ['import', 'require', 'node', 'default', 'types'],
      exportsFields: ['exports'],
      extensions: ['.js', '.jsx', '.json', '.ts', '.tsx', '.d.ts'],
      mainFields: ['module', 'main', 'types', 'typings'],
    },
    tsConfig: {
      fileName: 'tsconfig.depcruise.json',
    },
    tsPreCompilationDeps: true,
  },
};
