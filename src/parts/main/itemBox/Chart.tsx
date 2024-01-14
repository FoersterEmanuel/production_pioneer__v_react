import { useEffect, useRef } from "react";
import configData from "../../../data/config";

const Chart = ({ chartValues, round }: { chartValues: number[]; round: number; }) => {
  
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const padding = configData.chartPadding;
  const numSteps = configData.steps;
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    const calcPath = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      ctx.strokeStyle = '#ffffff70';

      // draw x and y axes
      ctx.beginPath();
      ctx.moveTo(padding, padding);
      ctx.lineTo(padding, canvas.height - padding);
      ctx.lineTo(canvas.width - padding, canvas.height - padding);
      ctx.stroke();

      // draw chart
      ctx.beginPath();
      ctx.moveTo(padding, canvas.height - padding);
      
      const stepX = (canvas.width - padding * 2) / (Math.min(Math.max(round, 10), numSteps - 1));
      const minValue = Math.min(...chartValues.slice(0, Math.min(round+1, numSteps)));
      const maxValue = Math.max(...chartValues.slice(0, Math.min(round+1, numSteps)));
      const distanceValue = maxValue - minValue;
      const stepY = 1 / distanceValue * (canvas.height - padding * 2);

      chartValues.slice(0, round+1).forEach((value, index) => {
        const x = index * stepX + padding;
        const y = canvas.height - ((value - minValue) * stepY + padding);
        ctx.lineTo(x, y);
      });
      
      ctx.stroke();
    };
    
    calcPath();
    // eslint-disable-next-line
  },[round]);

  return (
    <>
      <canvas ref={canvasRef} />
    </>
  );
};

export default Chart;