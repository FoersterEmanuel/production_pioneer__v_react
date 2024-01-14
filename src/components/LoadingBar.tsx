import Frame from "./generic/Frame";

import "./loadingBar.css";

interface LoadingBarProps {
  value: number;
}

const LoadingBar = ({value}: LoadingBarProps) => {
  return (
    <Frame fullwidth small>
      <div className="loadingBar_beam" style={{ width: `${value * 100}%` }}></div>
    </Frame>
  );
};

export default LoadingBar;