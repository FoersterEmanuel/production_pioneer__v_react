
import './scrollBox.css';

interface ScrollBoxProbs {
  children: React.ReactNode;
}

const ScrollBox = ({ children }: ScrollBoxProbs) => {
  return (
    <div className="scrollBox_outer">
      <div className="scrollBox_inner">
        {children}
      </div>
    </div>
  );
};

export default ScrollBox;