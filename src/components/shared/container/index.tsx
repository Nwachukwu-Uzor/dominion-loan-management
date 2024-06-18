import React from "react";

export const Container = ({ children }: { children?: React.ReactNode }) => {
  return (
    <article className="flex items-center justify-center w-full">
      <div className="w-[95%] lg:w-[98%] max-w-[1400px]">{children}</div>
    </article>
  );
};
