import { useState } from "react";
import createStoreHook, { Store } from "../store";

const useStore = createStoreHook();

const selectCount = (state: Store) => state.count;

type CountSelector = typeof selectCount;

const DisplayCounter = () => {
  const [count] = useStore<CountSelector>(selectCount);

  return <div>Counter: {count}</div>;
};

const IncrementButton = () => {
  const [count, setStore] = useStore<CountSelector>(selectCount);
  console.log({ count });

  return (
    <button
      onClick={() =>
        setStore((prevState) => ({ ...prevState, count: count + 1 }))
      }
    >
      [+] Increment
    </button>
  );
};

const StoreExample = () => {
  const [counters, setCounter] = useState([{ id: 1 }]);
  return (
    <div style={{ display: "flex", gap: "10px" }}>
      {counters.map((counter) => (
        <DisplayCounter key={counter.id} />
      ))}
      <div style={{ width: "2px", backgroundColor: "gray" }} />
      <IncrementButton />
      <div>
        <button
          onClick={() =>
            setCounter((prev) => [
              ...prev,
              { id: prev[prev.length - 1].id + 1 },
            ])
          }
        >
          Add Counter
        </button>
      </div>
    </div>
  );
};

export default StoreExample;
