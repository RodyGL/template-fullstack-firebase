import type { MakeGenerics } from 'react-location';

export type LocationGenerics = MakeGenerics<Record<string, never>>;

declare module 'react-location' {
  function useMatch<
    TGenerics extends PartialGenerics = LocationGenerics
  >(): RouteMatch<TGenerics>;
}
