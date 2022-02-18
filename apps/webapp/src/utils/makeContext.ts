import { createContext, useContext } from 'react';

export function makeContextValue<State>(initialState?: State) {
  const stateContext = createContext<State | undefined>(initialState);

  function useStateContext(): State {
    const contextValue = useContext(stateContext);

    if (!contextValue) {
      throw new Error(
        'Context value not found. Wrap your component in a ContextProvider.'
      );
    }

    return contextValue;
  }

  return [stateContext, useStateContext] as const;
}

export function makeContextDispatch<Event>() {
  const dispatchContext = createContext<React.Dispatch<Event> | undefined>(
    undefined
  );

  function useDispatchContext(): React.Dispatch<Event> {
    const contextValue = useContext(dispatchContext);

    if (!contextValue) {
      throw new Error(
        'Context value not found. Wrap your component in a ContextProvider.'
      );
    }

    return contextValue;
  }

  return [dispatchContext, useDispatchContext] as const;
}

export function makeContext<State, Event>(initialState?: State) {
  const contextValue = makeContextValue<State>(initialState);
  const contextDispatch = makeContextDispatch<Event>();

  function getContextHooks() {
    return [contextValue[1](), contextDispatch[1]()] as const;
  }

  return [contextValue, contextDispatch, getContextHooks] as const;
}
