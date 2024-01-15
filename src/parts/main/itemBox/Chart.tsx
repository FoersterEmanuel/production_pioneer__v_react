import { useEffect, useRef, useState } from "react";
import configData from "../../../data/config";

const Chart = ({ chartValues, round }: { chartValues: number[]; round: number; }) => {

  const [size, setSize] = useState({ w: 0, h: 0 })

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const padding = configData.chartPadding;
  const numSteps = configData.steps;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;


    const calcPath = () => {
      ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

      setSize({ w: canvas.clientWidth, h: canvas.clientHeight })

      ctx.strokeStyle = '#ffffff70';

      // draw x and y axes
      ctx.beginPath();
      ctx.moveTo(padding, padding);
      ctx.lineTo(padding, size.h - padding);
      ctx.lineTo(size.w - padding, size.h - padding);
      ctx.stroke();

      // draw chart
      ctx.beginPath();

      const currentRound = Math.max(round, 10);

      // calc x helpers
      const stepX = (size.w - padding * 2) / currentRound;

      // calc y helpers
      const minValue = Math.min(...chartValues.slice(0, currentRound));
      const maxValue = Math.max(...chartValues.slice(0, currentRound));
      const distanceValue = maxValue - minValue;
      const stepY = (size.h - padding * 2) / distanceValue;

      ctx.moveTo(padding, size.h - ((chartValues[0] - minValue) * stepY + padding));
      chartValues.slice(0, round+1).forEach((value, index) => {
        const x = (index) * stepX + padding;
        const y = size.h - ((value - minValue) * stepY + padding);
        ctx.lineTo(x, y);
      });

      ctx.stroke();
    };

    calcPath();
    // eslint-disable-next-line
  }, [round, canvasRef.current?.clientWidth]);

  return (
    <>
      <canvas className="item_chart" ref={canvasRef} width={size.w} height={size.h} />
    </>
  );
};

export default Chart;