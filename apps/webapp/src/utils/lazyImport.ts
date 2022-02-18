import type { ComponentType } from 'react';
import { lazy } from 'react';

export function lazyImport<
  T extends Record<string, unknown>,
  U extends keyof T
>(loader: (namedExport?: string) => Promise<T>) {
  return new Proxy({} as unknown as T, {
    get: (_target, componentName: string) => {
      return lazy(() =>
        loader(componentName).then((x) => ({
          default: x[componentName as U] as never as ComponentType<unknown>,
        }))
      );
    },
  });
}
