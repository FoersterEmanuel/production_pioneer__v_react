import { ReactNode, useEffect, useState } from "react";

import Frame from "./generic/Frame";

import "./button.css";

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
  disabled?: boolean;
  smallH?: boolean;
  smallW?: boolean;
  small?: boolean;
}

const Button = ({
  children,
  onClick,
  disabled, small, smallH, smallW
}: ButtonProps) => {

  const [classesAddOn, setClassesAddOn] = useState("");
  const [onClickEvent, setOnClickEvent] = useState<undefined | (() => void)>(undefined);


  useEffect(() => {
    setClassesAddOn(() => {
      let newClassesAddOn = "";
      if (!!disabled) newClassesAddOn += " disabled";
      if (!!small) newClassesAddOn += " smallH smallW";
      if (!!smallH) newClassesAddOn += " smallH";
      if (!!smallW) newClassesAddOn += " smallW";
      if (!!onClick && !disabled) newClassesAddOn += " onClickEvent";
      return newClassesAddOn;
    });
    setOnClickEvent(() => {
      if (!!onClick && !disabled)
        return onClick;
      return undefined;
    })
  }, [disabled, onClick, small, smallH, smallW]);

  return (
    <Frame onClick={onClickEvent} disabled={!!disabled} smallH={!!smallH} smallW={!!smallW} small={!!small}>
      <span className={`button${classesAddOn}`}
        >
          {children}
        </span>
    </Frame>
  );
};

export default Button;