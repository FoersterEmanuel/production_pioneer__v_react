import { ReactNode, useEffect, useState } from "react";

import Frame from "./generic/Frame";

import "./popupButton.css";

interface PopupButtonProps {
  children: ReactNode;
  title: string;
  left?: boolean;
  right?: boolean;
  center?: boolean;
};

const PopupButton = ({ children, title, left, right, center }: PopupButtonProps) => {

  const [showPopup, setShowPopup] = useState(false);
  const [direction, setDirection] = useState<"left" | "center" | "right">("left");

  const handleOnMouseOverEvent = () => {
    setShowPopup(true)
  };
  const handleOnMouseLeaveEvent = () => {
    setShowPopup(false)
  };

  useEffect(() => {
    if ((!!left && !!right) || !!center)
      setDirection("center");
    else if (!!right)
      setDirection("right");
    else
      setDirection("left");
  }, [left, right, center]);

  return (
    <div className="popup_container">
      <Frame onMouseOver={handleOnMouseOverEvent} onMouseLeave={handleOnMouseLeaveEvent} small>{title}</Frame>
      {
        showPopup &&
        <section className={`popup_content ${direction}`} onMouseOver={handleOnMouseOverEvent} onMouseLeave={handleOnMouseLeaveEvent}>
          <Frame small>
            {children}
          </Frame>
        </section>
      }
    </div>
  );
}

export default PopupButton;