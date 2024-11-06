import { useCallback, useEffect, useState } from "react";
import Observable from "./Observable";

export type SetterParam<State> = State | ((prevState: State) => State);

export type UseStoreReturn<IState, ISelector extends (state: IState) => any> = [
  ReturnType<ISelector>,
  (param: SetterParam<IState>) => void
];

type PlainObject = Record<string, any>;

type UseStore<IState> = <ISelector extends (state: IState) => any>(
  selector: ISelector
) => UseStoreReturn<IState, ISelector>;

type InitStoreReturn<IState extends PlainObject> = {
  createStoreHook: () => UseStore<IState>;
  getState: () => IState;
};

const initStore = <IState extends PlainObject>(
  initialState: IState
): InitStoreReturn<IState> => {
  const observable = new Observable<IState>();
  let store = { ...initialState };
  return {
    createStoreHook: () => (selector) => {
      const [state, setState] = useState<IState>(store);

      useEffect(() => {
        observable.subscribe(setState);
        return () => observable.unsubscribe(setState);
      }, [selector]);

      const setter = useCallback(
        (value: SetterParam<IState>) => {
          const newState = value instanceof Function ? value(state) : value;
          observable.notify(newState);
          store = { ...newState };
        },
        [state]
      );

      const selectedState = selector ? selector(state) : state;

      return [selectedState, setter];
    },
    getState: () => ({ ...store }),
  };
};

export default initStore;
