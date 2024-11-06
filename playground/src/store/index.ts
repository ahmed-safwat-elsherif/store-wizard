import { initStore } from "store-wizard";

export type Store = {
  count: number;
};

const { createStoreHook } = initStore<Store>({ count: 0 });

export default createStoreHook;
