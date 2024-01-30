import { useEffect, useState } from 'react';

import './frame.css';

interface FrameProps {
  children: React.ReactNode;
  onClick?: () => void;
  onMouseOver?: () => void;
  onMouseLeave?: () => void;
  disabled?: boolean;
  flat?: boolean;
  fullwidth?: boolean;
  small?: boolean;
  smallH?: boolean;
  smallW?: boolean;
}

const Frame = ({
  children,
  onClick,
  onMouseOver,
  onMouseLeave,
  disabled, fullwidth, flat, small, smallH, smallW
}: FrameProps) => {

  const [classesAddOn, setClassesAddOn] = useState("");
  const [onClickEvent, setOnClickEvent] = useState<undefined | (() => void)>(undefined);
  const [onMouseOverEvent, setOnMouseOverEvent] = useState<undefined | (() => void)>(undefined);
  const [onMouseLeaveEvent, setOnMouseLeaveEvent] = useState<undefined | (() => void)>(undefined);

  useEffect(() => {
    setClassesAddOn(() => {
      let newClassesAddOn = "";
      if (!!disabled) newClassesAddOn += " disabled";
      if (!!flat) newClassesAddOn += " flat";
      if (!!fullwidth) newClassesAddOn += " fullwidth";
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
    setOnMouseOverEvent(() => {
      if (!!onMouseOver && !disabled)
        return onMouseOver;
      return undefined;
    })
    setOnMouseLeaveEvent(() => {
      if (!!onMouseLeave && !disabled)
        return onMouseLeave;
      return undefined;
    })
  }, [disabled, flat, fullwidth, onClick, onMouseOver,onMouseLeave, small, smallH, smallW]);

  return (
    <div className={`frame_outer${classesAddOn}`} onClick={onClickEvent} onMouseOver={onMouseOverEvent} onMouseLeave={onMouseLeaveEvent}>
      <div className="frame_inner">
        {children}
      </div>
    </div>
  );
};

export default Frame;