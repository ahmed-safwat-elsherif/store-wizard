# Store Wizard 🧙‍♂️

### Install

      npm i store-wizard

### How to use?

Create a file `createStoreHook.ts` and:

```ts
import { initStore } from "store-wizard";

export type Store = {
  count: number;
  name: string;
};

const { createStoreHook } = initStore<Store>({ count: 0 });

export default createStoreHook;
```

In a React component `TestComponent.tsx` you can do the following:

```tsx
import createStoreHook, { Store } from "./createStoreHook";

const useStore = createStoreHook();

const selectCount = (state: Store) => state.count;

type CountSelector = typeof selectCount;

const TestComponent = () => {
  const [count, setStore] = useStore<CountSelector>(selectCount);

  return (
    <div>
      <div>{count}</div>
      <div>
        <button
          onClick={() =>
            setStore((prevState) => ({ ...prevState, count: count + 1 }))
          }
        >
          [+] Increment
        </button>
      </div>
    </div>
  );
};

export default TestComponent;
```

### Still under construction! ⚒️
