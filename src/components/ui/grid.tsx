// components/ui/grid.tsx

import React from "react";

type RowProps = {
  gutter?: number | [number, number];
  className?: string;
  children: React.ReactNode;
  reverse?: boolean;
};

export const Row = ({
  gutter = 0,
  className = "",
  reverse = false,
  children,
}: RowProps) => {
  const [gutterX, gutterY] = Array.isArray(gutter)
    ? [gutter[0], gutter[1]]
    : [gutter, gutter];

  return (
    <div
      className={`flex flex-wrap ${
        reverse ? "flex-row-reverse" : ""
      } ${className}`}
      style={{
        marginLeft: -(gutterX / 2),
        marginRight: -(gutterX / 2),
        marginTop: -(gutterY / 2),
      }}
    >
      {React.Children.map(children, (child) => {
        if (
          React.isValidElement(child) &&
          typeof child.type === "function" &&
          (child.type as Function).name === "Col"
        ) {
          return React.cloneElement(child as React.ReactElement<any>, {
            gutter,
          });
        }
        return child;
      })}
    </div>
  );
};

type ColProps = {
  span?: number;
  gutter?: number | [number, number];
  className?: string;
  children: React.ReactNode;
  order?: number;
};

export const Col = ({
  span = 12,
  gutter = 0,
  className = "",
  children,
  order,
}: ColProps) => {
  const widthPercent = (span / 12) * 100;
  const [gutterX, gutterY] = Array.isArray(gutter)
    ? [gutter[0], gutter[1]]
    : [gutter, gutter];

  return (
    <div
      className={className}
      style={{
        width: `${widthPercent}%`,
        paddingLeft: gutterX / 2,
        paddingRight: gutterX / 2,
        paddingTop: gutterY / 2,
        paddingBottom: gutterY / 2,
        order, // 👈 apply flex order if given
      }}
    >
      {children}
    </div>
  );
};
