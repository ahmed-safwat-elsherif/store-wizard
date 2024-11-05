import React from "react";

const SayHello = ({ children }: React.PropsWithChildren) => {
  return <div>Hello, {children}!</div>;
};

export default SayHello;
