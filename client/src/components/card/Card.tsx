import React, { PropsWithChildren } from "react";

interface CardProps {
  customClass?: string;
}

const Card = (props: PropsWithChildren<CardProps>) => {
  return (
    <div
      className={`bg-stone-700 shadow-md rounded-xl p-5 ${props.customClass}`}
    >
      {props.children}
    </div>
  );
};

export default Card;
